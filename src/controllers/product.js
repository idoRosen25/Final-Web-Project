const productService = require("../services/product");

async function getProductsByCategory(req, res) {
  const items = await productService.getProductsByCategory(req.body.category);
  return items;
}

async function addProduct(req, res) {
  const item = await productService.addProduct(req.body);
  res.render("index");
}
module.exports = { getProductsByCategory, addProduct };
