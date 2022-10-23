const wishlistService = require("../services/wishlist");

async function getWishlist(req) {
  return await wishlistService.getWishlist(req.session.username);
}

async function addItemToList(req) {
  const { itemId } = req.body;
  return await wishlistService.addItemToList(req.session.username, itemId);
}
async function removeItemFromList(req) {
  const { itemId } = req.body;
  console.log("in remove item: ", itemId);
  return await wishlistService.removeItemFromList(req.session.username, itemId);
}

async function clearWishlist(req) {
  return await wishlistService.clearWishlist(req.session.username);
}

module.exports = {
  getWishlist,
  addItemToList,
  removeItemFromList,
  clearWishlist,
};
