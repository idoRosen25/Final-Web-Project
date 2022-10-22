const client = require("../models/db");

async function getCartItems(email) {
  await client.connect();
  const cartItems = await client
    .db("storeDB")
    .collection("cart")
    .find({ userId: email })
    .toArray();

  return cartItems;
}

async function checkoutCart(email) {
  await client.connect();
  try {
    await client.db("storeDB").collection("cart").deleteMany({ userId: email });
    return true;
  } catch (err) {
    console.log("checkout failed");
    return false;
  }
}

module.exports = { getCartItems, checkoutCart };
