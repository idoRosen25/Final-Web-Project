const mongoose = require("mongoose");

const Cart = mongoose.Schema({
  userId: String,
  products: [{ id: String, quantity: Number }],
  isPaid: Boolean,
  checkoutDate: Date | null,
});

module.exports = mongoose.model("Cart", Cart);
