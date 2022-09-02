const express = require("express");
const bp = require("body-parser");
const morgan = require("morgan");
const open = require("open");
const { MongoClient } = require("mongodb");

const view_path = __dirname + "/views";
const mongoUrl = "mongodb://localhost:5200";

const client = new MongoClient(mongoUrl);
const dbName = "myProject";

const app = express();

app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.set("view engine", "hbs");
app.set("views", view_path);

app.get("/", (req, res) => {
  res.render("index");
});
app.listen(5200, async () => {
  // await open("http://localhost:5200", {
  //   app: "chrome",
  // });

  console.log("server running on port:5200");
});
