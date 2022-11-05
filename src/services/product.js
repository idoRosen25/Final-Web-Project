const client = require("../models/db");
const Product = require("../models/product");
const { ObjectId } = require("mongodb");

async function getProductsByCategory({category}) {
  await client.connect();
  const items = await client
    .db("storeDB")
    .collection("products")
    .find({ category: category.toLowerCase() })
    .toArray();
  return items;
}

async function addProduct({ title, category, price, image }) {
  console.log({title ,category ,price ,image})
  await client.connect();
  const item = await client
    .db("storeDB")
    .collection("products")
    .findOne({ title: title.toLowerCase(), category: category.toLowerCase() });

  if (parseFloat(price) <= 0) {
    throw { code: 400, message: "Price must be greater than 0" };
  }
  if (!item) {
    try {
      const product = new Product({
        title: title.toLowerCase(),
        category: category.toLowerCase(),
        price: parseFloat(price),
        image,
      });
      return await client
        .db("storeDB")
        .collection("products")
        .insertOne(product);
    } catch (error) {
      throw error;
    }
  } else {
    throw { code: 400, message: "Product already exists" };
  }
}

async function getProductById(id) {
  await client.connect();
  return await client
    .db("storeDB")
    .collection("products")
    .findOne({ _id: ObjectId(id) });
}
module.exports = { getProductsByCategory, addProduct, getProductById };
