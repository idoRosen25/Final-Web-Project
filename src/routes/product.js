const express = require("express");
const router = express.Router();
const { isAdmin } = require("../controllers/user");
const productController = require("../controllers/product");

router.get("/", productController.getProductsByCategory);

router.get("/add/:id", isAdmin, productController.getProductById);

router.post("/add", productController.addProduct);
// remove product
// update product

module.exports = router;
