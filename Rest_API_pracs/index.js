const express = require("express");
const app = express();

const fs = require("fs");
const userData = require("./MOCK_DATA-2.json");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/users", (req, res) => {
  res.set({ "X-name": "Harshul" });
  res.status(200).json(userData);
});

app.post("/api/users", (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.city
  ) {
    res.status(400).json("Please fill all details");
  }
  userData.push({
    ...body,
    id: userData.length + 1,
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
    city: body.city,
  });
  fs.writeFile("MOCK_DATA-2.json", JSON.stringify(userData), (err, result) => {
    res.status(201).json({ status: "Pending" });
  });
});

app.listen(3009, () => {
  console.log("Server is listening at port number 3009");
});
