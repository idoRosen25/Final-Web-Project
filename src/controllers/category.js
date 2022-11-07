const categoryService = require("../services/category");

async function getCategories(req, res) {
  const title = req.body.title || req.params.title;
  const items = await categoryService.getCategories(title);
  if (items.length) {
    res.render("shop", { items });
  } else {
    res.json({ code: 400, items });
  }
}

async function addCategory(req, res) {
  const item = await categoryService.addCategory(req.body);

  if (item.acknowledged) {
    res.json({ code: 200, item });
  } else {
    res.json({ code: 400, error: item });
  }
}

async function removeCategory(req, res) {
  const item = await categoryService.removeCategory(req.body);

  if (item.acknowledged) {
    res.json({ code: 200, item });
  } else {
    res.json({ code: 400, error: item });
  }
}

module.exports = { getCategories, addCategory, removeCategory };
