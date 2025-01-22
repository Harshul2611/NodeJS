const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { connectToDb } = require("./config.js");
const { logReqRes } = require("./middlewares");

const userRouter = require("./routes/user.js");
const PORT = 3030;
dotenv.config();

connectToDb("mongodb://127.0.0.1:27017/my-app");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logReqRes("logs.txt"));

app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
