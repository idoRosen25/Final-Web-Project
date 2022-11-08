const productModel = require("../models/product");
const { ObjectId } = require("mongodb");

async function getProductsByCategory({ category = "fruit" }) {
  const items = await productModel.find({ category: category.toLowerCase() });
  return items;
}

async function addProduct({ title, category = "general", price, image = "" }) {
  if (!title || !price)
    throw { code: 400, message: "Product Must have title and price" };

  const item = await productModel.findOne({
    title: title.toLowerCase(),
    category: category.toLowerCase(),
  });

  if (parseFloat(price) <= 0) {
    throw { code: 400, message: "Price must be greater than 0" };
  }
  if (!item) {
    try {
      return new productModel({
        title: title.toLowerCase(),
        category: category.toLowerCase(),
        price: parseFloat(price),
        image,
      }).save();
    } catch (error) {
      return error;
    }
  } else {
    return { code: 400, message: "Product already exists" };
  }
}

async function getProductById(id) {
  return await productModel.findById(ObjectId(id));
}
module.exports = { getProductsByCategory, addProduct, getProductById };
