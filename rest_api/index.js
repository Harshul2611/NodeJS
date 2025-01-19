const express = require("express");
const app = express();
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const PORT = 3003;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  fs.appendFile(
    "logs.txt",
    `\n${Date()}: ${req.method} ${req.path} `,
    (err, result) => {
      next();
    }
  );
});

app.get("/users", (req, res) => {
  const html = `
    <ul>
    ${users
      .map(
        (user) => `
        <li>${user.first_name}</li>
        <li>${user.email}</li>
        `
      )
      .join("")}
    </ul>
    `;

  res.send(html);
});

app.get("/api/users", (req, res) => {
  res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    res.json(user);
  })
  .patch((req, res) => {
    const userIndex = users.findIndex(
      (user) => user.id === Number(req.params.id)
    );
    const update = { ...users[userIndex], ...req.body };
    users[userIndex] = update;

    res.json({ status: "pending" });
  })
  .delete((req, res) => {
    const userIndex = users.findIndex(
      (user) => user.id === Number(req.params.id)
    );
    const deletedUser = users.splice(userIndex, 1)[0];
    res.json({ status: "pending" });
  });

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({
    ...body,
    id: users.length + 1,
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
    Job_title: body.Job_title,
  });
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {});
  res.json({ status: "pending" });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port number ${PORT}`);
});
