const mongoose = require("mongoose");

const Cart = mongoose.Schema({
  email: String,
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
    },
  ],
});

module.exports = mongoose.model("Cart", Cart);
