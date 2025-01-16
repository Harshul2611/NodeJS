const fs = require("fs");
const os = require("os");

const write = fs.writeFileSync(
  "./write.txt",
  "These will create a file in current directory synchronously and add these data and it return something"
);

//Asynchronous cannot return something, but it takes callback function with error and result

fs.writeFile(
  "./async_write.txt",
  "Asynchronously writing data into file",
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  }
);

fs.readFile("./contacts.txt", "utf-8", (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
});

const read = fs.readFileSync("./data.txt", "utf-8");
console.log(read);

fs.appendFileSync("./contacts.txt", " Anthony: +91 5432109876");

console.log(os.cpus().length);
