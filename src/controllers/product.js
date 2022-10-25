const productService = require("../services/product");

async function getProductByCategory(req, res) {
  const items = await productService.getProductByCategory(req.body.category);
  return items;
}

async function addProduct(req, res) {
  const item = await productService.addProduct(req.body);
  res.render("index");
}
module.exports = { getProductByCategory, addProduct };
