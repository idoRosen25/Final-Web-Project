const User = require("../models/user");
const client = require("../models/db");

async function login(email, password) {
  await client.connect();
  const user = await client
    .db("storeDB")
    .collection("users")
    .find({ _id: email, password })
    .toArray();

  return user;
}

async function registerUser(email, password, firstName, lastName, username) {
  const newUser = new User(email, password, firstName, lastName, username);
  console.log("new user: ", newUser);

  await client.connect();
  try {
    await client.db("storeDB").collection("users").insertOne(newUser);
  } catch (error) {
    console.error("error on register");
  }
}
module.exports = { login, registerUser };
