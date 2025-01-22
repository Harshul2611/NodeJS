const fs = require("fs");

function logReqRes(filename) {
  return (req, res, next) => {
    fs.appendFile(
      "logs.txt",
      `\n ${Date.now()} : ${req.method} ${req.path}`,
      (err, result) => {
        next();
      }
    );
  };
}

module.exports = { logReqRes };
