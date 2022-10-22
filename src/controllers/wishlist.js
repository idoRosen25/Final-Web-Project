const wishlistService = require("../services/wishlist");

async function getWishlist(email) {
  const items = await wishlistService.getWishlist(email);

  return items?.length ? items : [];
}
module.exports = { getWishlist };
