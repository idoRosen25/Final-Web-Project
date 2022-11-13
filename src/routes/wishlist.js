const express = require("express");
const { isLoggedIn } = require("../controllers/user");
const router = express.Router();
const wishlistController = require("../controllers/wishlist");

router.get("/", isLoggedIn, wishlistController.getWishlist);

router.post("/add", isLoggedIn, wishlistController.addItemToList);

router.post("/remove", isLoggedIn, wishlistController.removeItemFromList);

router.delete("/clear", isLoggedIn, wishlistController.clearWishlist);

module.exports = router;
