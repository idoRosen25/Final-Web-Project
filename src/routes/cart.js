const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../controllers/user");

// get cart by user ID
// clear cart by user ID
// checkout cart by user ID
// add product to cart by user ID

router.get("/", isLoggedIn, (req, res) => {
  console.log("user is loggedIn");
  res.redirect("/");
});

module.exports = router;
