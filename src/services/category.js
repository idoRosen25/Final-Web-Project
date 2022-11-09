const categoryModel = require("../models/category");
const { ObjectId } = require("mongodb");
const { getProductsByCategory } = require("./product");

async function getCategories(title) {
  if (title) {
    return await getProductsByCategory({ category: title });
  } else {
    return await categoryModel.find({});
  }
}

async function addCategory({ title, image = "" }) {
  if (!title) return false;

  try {
    return await new Category({
      title: title.toLowerCase(),
      image,
    }).save();
  } catch (error) {
    return error;
  }
}

async function removeCategory({ id }) {
  try {
    if (!id) throw { status: "error", code: 400, message: "id is required" };

    return await categoryModel.deleteOne({ _id: ObjectId(id) });
  } catch (error) {
    console.error("error on remove category");
    return { ...error };
  }
}

module.exports = { getCategories, addCategory, removeCategory };
