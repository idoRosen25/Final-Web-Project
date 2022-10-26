const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../controllers/user");

router.get("/", isLoggedIn, (req, res) => {
  console.log("user is loggedIn");
  res.redirect("/");
});

module.exports = router;
