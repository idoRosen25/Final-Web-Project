const { ObjectId } = require("mongodb");
const wishlistModel = require("../models/wishlist");

async function getWishlist(email) {
  if (!email) return false;

  const wishlist = await wishlistModel
    .findOne({ user: email })
    .populate("itemIds.item");

  if (wishlist) return wishlist?.itemIds?.filter((item) => !!item.item);
  else return [];
}

async function addItemToList(email, itemId) {
  try {
    if (!email || !itemId) {
      throw new Error();
    }
    const wishlist = await wishlistModel.findOne({ user: email });
    if (wishlist.itemIds.find((item) => item.item.toString() == itemId))
      return { codE: 400, message: "product already in wishlist" };
    return await wishlistModel.updateOne(
      { user: email },
      { $push: { itemIds: { item: itemId } } },
      { upsert: true }
    );
  } catch (error) {
    console.error("error in add to wishlist: ", error);
    return { codE: 400, message: "couldnt add item to wishlist" };
  }
}

async function removeItemFromList(email, itemId) {
  try {
    if (!email || !itemId) {
      throw new Error();
    }
    await wishlistModel.updateOne(
      { user: email },
      { $pull: { itemIds: { item: itemId } } }
    );
    return true;
  } catch (error) {
    console.error("error in remove from wishlist: ", error);
    return false;
  }
}

async function clearWishlist(email) {
  try {
    if (!email) {
      throw new Error();
    }
    await wishlistModel.deleteOne({ user: email });
    return true;
  } catch (error) {
    return false;
  }
}
module.exports = {
  getWishlist,
  addItemToList,
  removeItemFromList,
  clearWishlist,
};
