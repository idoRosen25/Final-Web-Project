const express = require("express");
const router = express.Router();
const { isAdmin } = require("../controllers/user");

const productController = require("../controllers/product");
router.get("/", productController.getProductByCategory);
router.post("/add", isAdmin, productController.addProduct);

module.exports = router;
