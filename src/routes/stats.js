const express = require("express");
const router = express.Router();
const statController = require("../controllers/stats");


router.post("/range", statController.getByRange);


router.get("/", async (req, res) => {
    console.log("in stats page");
    res.render("statistics");
  });
module.exports = router;
