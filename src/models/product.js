const mongoose = require("mongoose");

const Product = mongoose.Schema({
  title: String,
  category: String,
  price: Number,
  image: String,
});

module.exports = mongoose.model("Product", Product);
