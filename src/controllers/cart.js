const cartService = require("../services/cart");

async function getCart(req, res) {
  res.render("cart", {
    items: await cartService.getCart(req.session.username),
  });
}
async function clearCart(req, res) {
  try {
    await cartService.clearCart(req.session.username);
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
  const product = await cartService.addProductToCart(
    req.session.username,
    req.body
  );
  try {
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
    const product = await cartService.removeProductFromCart(
      req.session.username,
      req.body
    );
    if (product.acknowledged) {
      res.json({ status: "success", code: 200 });
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
