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

async function registerUser(email, password, firstName, lastName, username) {
  console.log(
    "register user: ",
    email,
    password,
    firstName,
    lastName,
    username
  );
}
module.exports = { login, registerUser };
