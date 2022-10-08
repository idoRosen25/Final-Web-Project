const mongoose = require("mongoose");

const User = mongoose.Schema({
  id: String,
  username: String,
  role: "user" | "admin",
});

module.exports = mongoose.model("User", User);