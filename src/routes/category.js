const express = require("express");
const router = express.Router();
const { isAdmin } = require("../controllers/user");
const categoryController = require("../controllers/category");
const { getCategories } = require("../services/category");

router.get("/", categoryController.getCategories);

router.post("/add", categoryController.addCategory);

router.get("/add/:title", categoryController.addCategoryPage);

router.get("/remove", async (req, res) => {
  res.render("removeCategory", { categories: await getCategories() });
});

router.put("/update/:id", categoryController.updateCategory);

router.post("/remove", categoryController.removeCategory);

module.exports = router;
