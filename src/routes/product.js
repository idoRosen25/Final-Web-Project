const express = require("express");
const router = express.Router();
const { isAdmin } = require("../controllers/user");
const productController = require("../controllers/product");

router.get("/add/:id", isAdmin, productController.getProductById);

router.get("/:category", productController.getProductsByCategory);

router.post("/add", isAdmin, productController.addProduct);

router.put("/update/:productId", isAdmin, productController.updateProduct);

router.delete("/remove/:productId", isAdmin, productController.removeProduct);

module.exports = router;
