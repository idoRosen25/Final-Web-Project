const express = require("express");
const router = express.Router();
const { isAdmin } = require("../controllers/login");

const categoryController = require("../controllers/category");

router.get("/", categoryController.getCategories);
router.post("/add", isAdmin, categoryController.addCategory);
router.post("/remove", isAdmin, categoryController.removeCategory);

module.exports = router;
