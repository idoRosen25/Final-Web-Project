const productService = require("../services/product");

async function getProductsByCategory(req, res) {
  const items = await productService.getProductsByCategory(req.body);
  return items;
}

async function addProduct(req, res) {
  try {
    const item = await productService.addProduct(req.body);
    if (item) {
      res.redirect('index')
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
module.exports = { getProductsByCategory, addProduct, addProductPage };
