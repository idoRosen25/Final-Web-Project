const mongoose = require("mongoose");

const Order = mongoose.Schema({
  email: String,
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
    },
  ],
  totalPrice: Number,
  date: Date,
});

module.exports = mongoose.model("Order", Order);
