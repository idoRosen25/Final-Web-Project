const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../controllers/user");
const cartController = require("../controllers/cart");

router.get("/", cartController.getCart);

router.delete("/", isLoggedIn, cartController.clearCart);

router.post("/add", isLoggedIn, cartController.addProductToCart);

router.put("/update-quantity", cartController.updateProductQuantity);

router.delete("/remove", isLoggedIn, cartController.removeProductFromCart);

module.exports = router;
