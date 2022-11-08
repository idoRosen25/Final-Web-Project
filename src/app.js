const express = require("express");
const bp = require("body-parser");
const morgan = require("morgan");
const view_path = __dirname + "/views";
const app = express();
var mongoose = require("mongoose");

const { DB_USERNAME, DB_PASSWORD, GOOGLE_KEY } =
  require("dotenv").config().parsed;

app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
app.use(morgan("dev"));
app.use("/public", express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.set("views", view_path);

const session = require("express-session");

app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: false,
  })
);

app.use(function (req, res, next) {
  // res.locals.username = req.session?.username ? req.session?.username : null;
  res.locals.username = req.session.username ? req.session.username : null;

  next();
});

app.get("/about", (req, res) => {
  res.render("about", {
    googleKey: GOOGLE_KEY,
  });
});

app.use("/user", require("./routes/user"));
app.use("/cart", require("./routes/cart"));
app.use("/wishlist", require("./routes/wishlist"));
app.use("/product", require("./routes/product"));
app.use("/category", require("./routes/category"));
app.use("/order", require("./routes/order"));
app.use("/error", (req, res) => {
  res.redirect("/");
});

app.get("/", (req, res) => {
  res.render("index");
});

app.use("*", (req, res) => {
  res.redirect("/error?code=404");
});

app.listen(5200, async () => {
  console.log("server running on port:5200");
  mongoose
    .connect(
      `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@storecluster.c1sij6s.mongodb.net`,
      {
        dbName: "storeDB",
      }
    )
    .then(() => {
      console.log("connected to db using mongoose");
    })
    .catch((err) => {
      console.log("couldnt connect to db from mongoose");
    });
});
