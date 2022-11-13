const wishlistService = require("../services/wishlist");

async function getWishlist(req, res) {
  const items = await wishlistService.getWishlist(req.session.username);
  if (items) {
    res.render("wishlist", { items });
  } else {
    res.json({ code: 400, success: false, message: "Couldn't get wishlist" });
  }
}

async function addItemToList(req, res) {
  const { itemId } = req.body;

  const addItem = await wishlistService.addItemToList(
    req.session.username,
    itemId
  );
  if (addItem) {
    res.json({ code: 200, success: true, message: "Item added to wishlist" });
  } else {
    res.json({
      code: 400,
      success: false,
      message: "Item not added to wishlist",
    });
  }
}

async function removeItemFromList(req, res) {
  {
    const { itemId } = req.body;
    const removeItem = await wishlistService.removeItemFromList(
      req.session.username,
      itemId
    );

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
  }
}

async function clearWishlist(req, res) {
  const clearWishlist = await wishlistService.clearWishlist(
    req.session.username
  );
  if (clearWishlist) {
    res.json({ code: 200, success: true, message: "Wishlist cleared" });
  } else {
    res.json({ code: 400, success: false, message: "Wishlist not cleared" });
  }
}

module.exports = {
  getWishlist,
  addItemToList,
  removeItemFromList,
  clearWishlist,
};
