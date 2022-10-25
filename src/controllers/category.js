const categoryService = require("../services/category");

async function getCategories(req, res) {
  const items = await categoryService.getCategories(req.body);
  if (items.length) {
    res.json({ code: 200, items });
  } else {
    res.json({ code: 400, items });
  }
}

async function addCategory(req, res) {
  const item = await categoryService.addCategory(req.body);
  console.log(item.acknowledged);

  if (item.acknowledged) {
    res.json({ code: 200, item });
  } else {
    res.json({ code: 400, error: item });
  }
  //   res.render("index");
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
