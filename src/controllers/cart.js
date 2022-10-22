const cartService = require("../services/cart");

async function getCartItems(email) {
  const items = await cartService.getCartItems(email);
  return items;
}

async function checkoutCart(req, res) {
  const result = await cartService.checkoutCart(req.body.email);
  console.log("resulr: ", result);
  res.render("index");
}
module.exports = { getCartItems, checkoutCart };
