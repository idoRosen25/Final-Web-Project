const mongoose = require("mongoose");

const User = mongoose.Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  gender: String,
  age: Number,
  role: String,
});

module.exports = mongoose.model("User", User);
