const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../controllers/login");
const cartController = require("../controllers/cart");

router.get("/", isLoggedIn, (req, res) => {
  const { email } = req.body;
  res.render("cart", {
    items: cartController.getCartItems(email),
  });
});
router.post("/checkout", isLoggedIn, cartController.checkoutCart);

module.exports = router;
