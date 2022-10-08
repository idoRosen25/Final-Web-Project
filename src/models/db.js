const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");

const { DB_USERNAME, DB_PASSWORD } = dotenv.config().parsed;
const mongoUrl = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@storecluster.c1sij6s.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(mongoUrl);

module.exports = client;
