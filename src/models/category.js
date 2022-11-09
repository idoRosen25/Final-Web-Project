const mongoose = require("mongoose");

const Category = mongoose.Schema({
  title: String,
  image: String,
});

module.exports = mongoose.model("Category", Category);
