const User = require("../models/user");
const client = require("../models/db");

async function login(email, password) {
  await client.connect();
  const user = await client
    .db("StoreDB")
    .collection("users")
    .find({ email, password })
    .toArray();

  console.log("user from db: ", user);
}
module.exports = { login };
