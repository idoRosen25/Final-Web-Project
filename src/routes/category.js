const express = require("express");
const router = express.Router();
const { isAdmin } = require("../controllers/user");

const categoryController = require("../controllers/category");

router.get("/:title", categoryController.getCategories);

router.get("/", categoryController.getCategories);

router.post("/add", isAdmin, categoryController.addCategory);

router.post("/remove", isAdmin, categoryController.removeCategory);

module.exports = router;
