const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("This is home page");
});

app.get("/about", (req, res) => {
  res.send(`This is about page and my name is ${req.query.name}`);
});

app.listen(3002);
