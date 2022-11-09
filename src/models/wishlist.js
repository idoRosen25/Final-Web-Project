const mongoose = require("mongoose");

const Wishlist = mongoose.Schema({
  user: String,
  itemIds: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    },
  ],
});

module.exports = mongoose.model("Wishlist", Wishlist);
