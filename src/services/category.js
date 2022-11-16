const categoryModel = require("../models/category");
const { ObjectId } = require("mongodb");
const productModel = require("../models/product");

async function getCategories(title) {
  return title
    ? await categoryModel.findOne({ title: title.toLowerCase() })
    : await categoryModel.find({}).sort({ title: -1 });
}

async function addCategory({ title }) {
  if (!title) return false;
  if (await categoryModel.findOne({ title: title.toLowerCase() })) return false;
  try {
    return await new categoryModel({ title: title.toLowerCase() }).save();
  } catch (error) {
    return error;
  }
}

async function removeCategory({ category }) {
  try {
    if (!category)
      throw { status: "error", code: 400, message: "id is required" };
    const categoryItem = await categoryModel.findOne({
      _id: ObjectId(category),
    });
    if (!categoryItem || categoryItem.title === "general")
      throw { status: "error", code: 400, message: "category not found" };

    await productModel.updateMany(
      { category: categoryItem.title },
      { $set: { category: "general" } }
    );
    return await categoryItem.delete();
  } catch (error) {
    console.error("error on remove category: ", error);
    return false;
  }
}

async function updateCategory(id, { title }) {
  if (!title) return false;
  if (!id) return await addCategory({ title });

  try {
    return await categoryModel.findOneAndUpdate(
      { _id: ObjectId(id) },
      { title: title.toLowerCase() },
      { new: true }
    );
  } catch (error) {
    return false;
  }
}

module.exports = { getCategories, addCategory, removeCategory, updateCategory };
