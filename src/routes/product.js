const express = require("express");
const router = express.Router();
const { isAdmin } = require("../controllers/login");

const productController = require("../controllers/product");
router.get("/", productController.getByCategory);
router.post("/add", isAdmin, productController.addProduct);

module.exports = router;
