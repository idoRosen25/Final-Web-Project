const categoryService = require("../services/category");

async function getCategories(req, res) {
  const categories = await categoryService.getCategories();

  if (categories) {
    res.json({ status: "success", code: 200, categories });
  } else {
    res.redirect("/error?code=400");
  }
}

async function addCategory(req, res) {
  const item = await categoryService.addCategory(req.body);

  if (!item.code) {
    res.json({ code: 200, item });
  } else {
    res.json({ code: 400, error: item });
  }
}

async function removeCategory(req, res) {
  const item = await categoryService.removeCategory(req.body);

  if (!item.code) {
    res.json({ code: 200, item });
  } else {
    res.json({ code: 400, error: item });
  }
}

module.exports = { getCategories, addCategory, removeCategory };
