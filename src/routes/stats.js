const express = require("express");
const router = express.Router();
const statController = require("../controllers/stats");

router.post("/range", statController.getByRange);

module.exports = router;
