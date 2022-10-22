const mongoose = require("mongoose");

const Product = mongoose.Schema({
  id: String,
  title: String,
  category: String,
  price: Number,
});

module.exports = mongoose.model("Product", Product);
