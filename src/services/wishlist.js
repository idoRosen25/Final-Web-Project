const { ObjectId } = require("mongodb");
const client = require("../models/db");

async function getWishlist(email) {
  await client.connect();

  if (!email) return false;

  const items = await client
    .db("storeDB")
    .collection("wishlists")
    .findOne({ user: email });

  if (items) {
    const wishlist = await client
      .db("storeDB")
      .collection("products")
      .find({ _id: { $in: items.itemIds.map((id) => ObjectId(id)) } })
      .toArray();

    return wishlist;
  }
}

async function addItemToList(email, itemId) {
  await client.connect();
  try {
    if (!email || !itemId) {
      throw new Error();
    }
    await client
      .db("storeDB")
      .collection("wishlists")
      .updateOne(
        { user: email },
        { $push: { itemIds: itemId } },
        { upsert: true }
      );
    return true;
  } catch (error) {
    console.log("error in add to wishlist: ", error);
    return false;
  }
}
async function removeItemFromList(email, itemId) {
  await client.connect();

  try {
    if (!email || !itemId) {
      throw new Error();
    }
    await client
      .db("storeDB")
      .collection("wishlists")
      .updateOne({ user: email }, { $pull: { itemIds: itemId } });
    return true;
  } catch (error) {
    console.log("error in remove from wishlist: ", error);
    return false;
  }
}

async function clearWishlist(email) {
  await client.connect();
  try {
    if (!email) {
      throw new Error();
    }
    await client
      .db("storeDB")
      .collection("wishlists")
      .deleteOne({ user: email });
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
