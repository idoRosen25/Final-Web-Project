const productService = require("../services/product");

async function getProductsByCategory(req, res) {
  const items = await productService.getProductsByCategory(req.body.category);
  return items;
}

async function addProduct(req, res) {
  try {
    const item = await productService.addProduct(req.body);
    if (item) {
      res.render("index");
    } else {
      throw { code: 400, message: "Couldn't add product" };
    }
  } catch (error) {
    res.json({ status: "error", code: error.code, error: error.message });
  }
}
module.exports = { getProductsByCategory, addProduct };
