const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer((req, res) => {
  const log = `${Date()}: ${req.method} ${req.url} New Request Recieved\n`;
  const myUrl = url.parse(req.url, true);
  console.log(myUrl);

  fs.appendFile("logs.txt", log, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
  if (myUrl.pathname === "/") {
    const username = myUrl.query.username;
    res.write(`${username} is a good boy`);
    res.end("Server Created");
  }
  if (myUrl.pathname === "/home") {
    res.end("This is Home page");
  }
});

server.listen(3001, () => {
  console.log("Server is Created");
});
