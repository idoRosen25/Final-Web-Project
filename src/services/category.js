const Category = require("../models/category");
const { ObjectId } = require("mongodb");

async function getCategories(title) {
  const items = await Category.find(
    title ? { title: title.toLowerCase() } : {}
  );
  return items;
}

async function addCategory({ title }) {
  if (!title) return false;
  await client.connect();
  const item = await client
    .db("storeDB")
    .collection("categories")
    .find({ title: title.toLowerCase() })
    .toArray();

  if (!item.length) {
    try {
      return await client
        .db("storeDB")
        .collection("categories")
        .insertOne(
          new Category({
            title: title.toLowerCase(),
          })
        );
    } catch (error) {
      console.error("error on add product");
      return error;
    }
  }
  return "category already exists";
}

async function removeCategory({ id }) {
  if (!id) return false;
  await client.connect();
  const item = await client
    .db("storeDB")
    .collection("categories")
    .find({ _id: ObjectId(id) })
    .toArray();

  if (item.length) {
    try {
      return await client
        .db("storeDB")
        .collection("categories")
        .deleteOne({ _id: ObjectId(id) });
    } catch (error) {
      console.error("error on remove category");
      return error;
    }
  }
  return "category not found";
}

module.exports = { getCategories, addCategory, removeCategory };
