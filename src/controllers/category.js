const categoryService = require("../services/category");

async function getCategories(req, res) {
  const categories = await categoryService.getCategories();

  if (categories) {
    res.json({ status: "success", code: 200, categories });
  } else {
    res.redirect("/error?code=400");
  }
}
async function addCategoryPage(req, res) {
  const { title } = req.params;

  if (!title || title === "new") {
    res.render("addCategory", { category: null });
  } else {
    res.render("addCategory", {
      category: await categoryService.getCategories(title),
    });
  }
}

async function updateCategory(req, res) {
  const { id } = req.params;

  if (!id) await categoryService.addCategory({ title: req.body.title });

  const item = await categoryService.updateCategory(id, req.body);

  if (item) {
    res.redirect("/");
  } else {
    res.json({ code: 400, error: item });
  }
}

async function addCategory(req, res) {
  const item = await categoryService.addCategory(req.body);
  if (!item.code) {
    res.redirect("/");
  } else {
    res.render("/error?code=400");
  }
}

async function removeCategory(req, res) {
  const item = await categoryService.removeCategory(req.body);
  if (!item.code) {
    res.render("removeCategory", {
      categories: await categoryService.getCategories(),
    });
  } else {
    return;
  }
}

module.exports = {
  getCategories,
  addCategory,
  removeCategory,
  addCategoryPage,
  updateCategory,
};
