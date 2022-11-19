const express = require("express");
const router = express.Router();
const statController = require("../controllers/stats");
const { isAdmin } = require("../controllers/user");

router.get("/range/:range", isAdmin, statController.getOrdersByRange);
router.get("/top-category", isAdmin, statController.getTopCategories);
router.get("/top-users", isAdmin, statController.getTopUsers);

router.get("/", isAdmin, async (req, res) => {
  res.render("statsPage");
});
module.exports = router;
