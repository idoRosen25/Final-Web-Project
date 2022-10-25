const express = require("express");
const router = express.Router();
const { isAdmin } = require("../controllers/login");

const productController = require("../controllers/product");

router.post("/add", productController.addProduct);

module.exports = router;
