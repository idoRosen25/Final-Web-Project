const cartService = require("../services/cart");

async function getCart(req, res) {
  const items = await cartService.getCart(req.session.username);
  console.log("cart items: ", items);
  res.render("cart", {
    items,
  });
}
async function clearCart(req, res) {
  try {
    await cartService.clearCart(req.session.username);
    res.json({
      status: "success",
      code: 200,
      message: "Cart cleared successfully",
    });
  } catch (error) {
    res.json({ status: "error", code: error.code, error: error.message });
  }
}
async function checkoutCart(req, res) {
  try {
    await cartService.checkoutCart(req.session.username);

    res.render("index");
  } catch (error) {
    res.json({ status: "error", code: error.code, error: error.message });
  }
}

async function addProductToCart(req, res) {
  try {
    const product = await cartService.addProductToCart(
      req.session.username,
      req.body
    );
    if (product) {
      res.json({ status: "success", code: 200, product });
    } else {
      res.json({
        status: "error",
        code: 400,
        error: "Couldn't add product to cart",
      });
    }
  } catch (err) {
    res.json({ status: "error", code: err.code, error: err.message });
  }
}

async function removeProductFromCart(req, res) {
  try {
    const cart = await cartService.removeProductFromCart(
      req.session.username,
      req.body
    );

    if (cart) {
      res.json({ status: "success", code: 200, cart });
    } else {
      res.json({
        status: "error",
        code: 400,
        error: "Couldn't remove product from cart",
      });
    }
  } catch (err) {
    res.json({ status: "error", code: err.code, error: err.message });
  }
}
module.exports = {
  getCart,
  clearCart,
  checkoutCart,
  addProductToCart,
  removeProductFromCart,
};
