const productModel = require("../models/product");
const { ObjectId } = require("mongodb");

async function getProductsByCategory(category = "general") {
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
      throw new Error();
    }
  } else {
    throw { code: 400, message: "Product already exists" };
  }
}

async function getProductById(id) {
  return await productModel.findById(ObjectId(id));
}

async function updateProduct({ productId, title, category, price, image }) {
  try {
    const item = await productModel.findOneAndUpdate(
      { _id: ObjectId(productId) },
      {
        $set: {
          title: title.toLowerCase(),
          category: category.toLowerCase(),
          price: parseFloat(price),
          image,
        },
      }
    );

    if (item) {
      return item;
    } else {
      throw new Error();
    }
  } catch (error) {
    return null;
  }
}

async function removeProduct(productId) {
  try {
    const remove = await productModel.findOneAndDelete({
      _id: ObjectId(productId),
    });

    return remove;
  } catch (error) {
    throw new Error();
  }
}

async function getAllProducts() {
  return await productModel.find();
}

async function getSortedProducts({ startsWith, isDecsending, sortType }) {
  try {
    const sort = isDecsending === "false" ? 1 : -1;
    const query = !!startsWith.charAt(0).match("[a-zA-Z]")
      ? { title: new RegExp(`^${startsWith}`, "i") }
      : {};

    const sortField = sortType === "price" ? "price" : "title";

    const sorted = await productModel.find(query).sort({ [sortField]: sort });

    return sorted;
  } catch (error) {
    throw new Error({ code: 400, message: "Error sorting products" });
  }
}

module.exports = {
  getProductsByCategory,
  addProduct,
  getProductById,
  updateProduct,
  removeProduct,
  getAllProducts,
  getSortedProducts,
};
