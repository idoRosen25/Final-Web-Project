async function getByCategory(req, res) {
  const items = await productService.getByCategory(req.body.category);
  return items;
}

async function addProduct(req, res) {
  const item = await productService.addProduct(req.body);
  res.render("index");
}
module.exports = { getByCategory, addProduct };
