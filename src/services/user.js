const User = require("../models/user");
const client = require("../models/db");

async function login(email, password) {
  await client.connect();
  const user = await client
    .db("storeDB")
    .collection("users")
    .findOne({ email, password });

  return user;
}

async function registerUser(
  email,
  password,
  firstName,
  lastName,
  gender,
  age,
  role = "user"
) {
  if (!login(email, password)) {
    const newUser = new User({
      email,
      password,
      firstName,
      lastName,
      gender,
      age: parseInt(age),
      role,
    });
    console.log("new user: ", newUser);

    try {
      await client.connect();
      await client.db("storeDB").collection("users").insertOne(newUser);
    } catch (error) {
      console.error("error on register");
      throw {
        code: 400,
        message: "Couldn't register user. Please try again later",
      };
    }
  }
  throw { code: 401, message: "Username already exists" };
}
module.exports = { login, registerUser };
