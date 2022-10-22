const express = require("express");
const bp = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");

const { DB_USERNAME, DB_PASSWORD } = dotenv.config().parsed;
const view_path = __dirname + "/views";
const mongoUrl = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@storecluster.c1sij6s.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(mongoUrl);
const dbName = "storeDB";

const app = express();

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
  res.locals.username = req.session?.username ? req.session?.username : null;
  // res.locals.username = req.session.username ? req.session.username : null;

  next();
});

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/login", require("./routes/login"));
app.use("/cart", require("./routes/cart"));
app.use("/wishlist", require("./routes/wishlist"));
app.use("/product", require("./routes/product"));
app.use("/error", (req, res) => {
  res.redirect("/");
});
app.use("*", (req, res) => {
  res.redirect("/error?code=404");
});

app.listen(5200, async () => {
  console.log("server running on port:5200");
});
