const { uniqueId } = require("lodash");
const client = require("../models/db");
const Product = require("../models/product");

async function getByCategory(category) {
  await client.connect();
  const items = await client
    .db("storeDB")
    .collection("products")
    .find({ category })
    .toArray();
  return items;
}

async function addProduct({ title, category, price }) {
  await client.connect();
  const item = await client
    .db("storeDB")
    .collection("products")
    .find({ title: title.toLowerCase(), category })
    .toArray();

  if (!item.length) {
    const product = new Product("random", title.toLowerCase(), category, price);

    try {
      await client.db("storeDB").collection("products").insertOne(product);
    } catch (error) {
      console.error("error on add product");
    }
  }
}
module.exports = { getByCategory, addProduct };
