const mongoose = require("mongoose");

const Order = mongoose.Schema({
  email: String,
  products: Array,
  totalPrice: Number,
  date: Date,
});

module.exports = mongoose.model("Order", Order);
