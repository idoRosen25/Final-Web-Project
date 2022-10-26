const express = require("express");
const { isLoggedIn } = require("../controllers/user");
const router = express.Router();
const wishlistController = require("../controllers/wishlist");

router.get("/", isLoggedIn, async (req, res) => {
  res.render("wishlist", { items: await wishlistController.getWishlist(req) });
});

router.post("/add", isLoggedIn, (req, res) => {
  const addItem = wishlistController.addItemToList(req);
  if (addItem) {
    res.json({ code: 200, success: true, message: "Item added to wishlist" });
  } else {
    res.json({
      code: 400,
      success: false,
      message: "Item not added to wishlist",
    });
  }
});

router.post("/remove", isLoggedIn, (req, res) => {
  const removeItem = wishlistController.removeItemFromList(req);
  if (removeItem) {
    res.json({
      code: 200,
      success: true,
      message: "Item removed from wishlist",
    });
  } else {
    res.json({
      code: 400,
      success: false,
      message: "Item not removed from wishlist",
    });
  }
});

router.delete("/clear", isLoggedIn, (req, res) => {
  const clearWishlist = wishlistController.clearWishlist(req);
  if (clearWishlist) {
    res.json({ code: 200, success: true, message: "Wishlist cleared" });
  } else {
    res.json({ code: 400, success: false, message: "Wishlist not cleared" });
  }
});

module.exports = router;
