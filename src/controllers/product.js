const productService = require("../services/product");
const categoryService = require("../services/category");

async function getProductsByCategory(req, res) {
  const items = await productService.getProductsByCategory(req.body);
  if (items) {
    res.json({ status: "success", code: 200, items });
  } else {
    res.json({
      status: "error",
      code: 400,
      message: "No items found ",
    });
  }
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

async function getProductById(req, res) {
  const { id } = req.params;

  if (id === "new") {
    res.render("addProduct", {
      item: null,
      categories: await categoryService.getCategories(),
    });
  } else {
    try {
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
      res.redirect("/product/add/new");
    }
  }
}
module.exports = {
  getProductsByCategory,
  addProduct,
  getProductById,
};
