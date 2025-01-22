const mongoose = require("mongoose");

const connectToDb = async (url) => {
  return mongoose
    .connect(url)
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { connectToDb };
