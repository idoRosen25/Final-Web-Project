const mongoose = require("mongoose");

const Cart = mongoose.Schema({
  email: String,
  products: [{ id: String, quantity: Number }],
});

module.exports = mongoose.model("Cart", Cart);
