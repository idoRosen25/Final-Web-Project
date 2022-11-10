const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../controllers/user");
const cartController = require("../controllers/cart");

router.get("/", isLoggedIn, cartController.getCart);

router.delete("/", isLoggedIn, cartController.clearCart);

router.post("/add", isLoggedIn, cartController.addProductToCart);

router.delete("/remove", isLoggedIn, cartController.removeProductFromCart);

module.exports = router;
