const express = require("express");
const router = express.Router();
const { isAdmin, isLoggedIn } = require("../controllers/user");
const orderController = require("../controllers/order");

router.get("/statistics", isAdmin, async (req, res) => {
  console.log("in stats page");
  res.redirect("/");
});
//get orders for user
router.get("/", isLoggedIn, orderController.getOrdersByUserId);

//get orders for admin (statistics)
router.get("/", isAdmin, orderController.getOrdersStatistics);

//get order by id
router.get("/:id", isLoggedIn, orderController.getOrdersById);

module.exports = router;
