const productService = require("../services/product");
const categoryService = require("../services/category");

async function getProductsByCategory(req, res) {
  const items = await productService.getProductsByCategory(req.body);
  return items;
}

async function addProduct(req, res) {
  try {
    const item = await productService.addProduct(req.body);
    if (item) {
      res.json({
        status: "success",
        message: "product added successfully",
        code: 200,
        item,
      });
    } else {
      throw { code: 400, message: "Couldn't add product" };
    }
  } catch (error) {
    res.json({ status: "error", code: error.code, error: error.message });
  }
}
async function addProductPage(req, res) {
  res.render("addProduct");
}

async function getProductById(req, res) {
  const { id } = req.params;
  try {
    if (id === "new") throw new Error();
    const item = await productService.getProductById(id);
    if (item) {
      res.render("addProduct", {
        item,
        categories: await categoryService.getCategories(),
      });
    } else {
      throw new Error();
    }
  } catch (error) {
    res.render("addProduct", {
      item: null,
      categories: await categoryService.getCategories(),
    });
  }
}
module.exports = {
  getProductsByCategory,
  addProduct,
  addProductPage,
  getProductById,
};
