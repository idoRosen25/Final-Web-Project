const client = require("../models/db");

async function getWishlist(email) {
  await client.connect();

  const items = await client
    .db("storeDB")
    .collection("wishlist")
    .find({ email })
    .toArray();
  console.log("items in wishlist: ", items);

  if (items.length) {
    const wishlist = await client
      .db("storeDB")
      .collection("products")
      .find({ id: { $in: items[0].products } })
      .toArray();
    return items;
  }
}

module.exports = { getWishlist };
