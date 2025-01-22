const userSchema = require("../models/user.js");

const handleGetAllUsers = async (req, res) => {
  const allUsers = await userSchema.find({});
  return res.json(allUsers);
};

const handleGetUserById = async (req, res) => {
  const user = await userSchema.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  return res.json(user);
};

const handleUpdateUserById = async (req, res) => {
  await userSchema.findByIdAndUpdate(req.params.id, { lastName: "Changed" });
  return res.json({ status: "Success" });
};

const handleDeleteUserById = async (req, res) => {
  await userSchema.findByIdAndDelete(req.params.id);
  return res.json({ status: "Success" });
};

const handleCreateNewUser = async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(404).json({ error: "All fields are required" });
  }

  const result = await userSchema.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  return res.status(201).json({ msg: "User Created", id: result._id });
};

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};
