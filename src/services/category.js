const categoryModel = require("../models/category");
const { ObjectId } = require("mongodb");

async function getCategories() {
  return await categoryModel.find({}).sort({ title: -1 });
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
