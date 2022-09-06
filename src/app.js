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
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", view_path);

const runDB = async () => {
  try {
    await client.connect();
    const collection = await client
      .db(dbName)
      .collection("products")
      .find({})
      .toArray();
    console.log("collections: ", collection);
  } catch (err) {
    console.log("error in db connect: ", err);
  } finally {
    await client.close();
  }
};

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(5200, async () => {
  await runDB();
  console.log("server running on port:5200");
});
