const express = require("express");
const router = express.Router();
const { isAdmin } = require("../controllers/user");
const categoryController = require("../controllers/category");
const { getCategories } = require("../services/category");

router.get("/", categoryController.getCategories);

router.post("/add", isAdmin, categoryController.addCategory);

router.get("/add/:title", isAdmin, categoryController.addCategoryPage);

router.get("/remove", isAdmin, async (req, res) => {
  res.render("removeCategory", { categories: await getCategories() });
});

router.put("/update/:id", isAdmin, categoryController.updateCategory);

router.post("/remove", isAdmin, categoryController.removeCategory);

module.exports = router;
