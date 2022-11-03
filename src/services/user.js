const User = require("../models/user");
const client = require("../models/db");

async function login(email, password) {
  await client.connect();

  if (
    !email.match(
      '/^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/'
    )
  ) {
    throw { status: "error", code: 401, message: "Invalid Email Address" };
  }
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
  if (parseInt(age) < 0)
    throw {
      code: 400,
      message: "Couldn't register user. Please try again later",
    };
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

    try {
      await client.connect();
      return await client.db("storeDB").collection("users").insertOne(newUser);
    } catch (error) {
      throw {
        code: 400,
        message: "Couldn't register user. Please try again later",
      };
    }
  }
  throw { code: 401, message: "Username already exists" };
}

async function getUser(email) {
  await client.connect();
  const user = await client
    .db("storeDB")
    .collection("users")
    .findOne({ email });

  return user;
}

async function updateUser(email, password, firstName, lastName, gender, age) {
  await client.connect();
  const currentUser = await getUser(email);
  if (currentUser) {
    const user = await client
      .db("storeDB")
      .collection("users")
      .updateOne(
        { email },
        {
          $set: {
            password: password || currentUser.password,
            firstName: firstName || currentUser.firstName,
            lastName: lastName || currentUser.lastName,
            gender: gender || currentUser.gender,
            age: age || currentUser.age,
          },
        }
      );
    return user;
  }
  return null;
}
module.exports = { login, registerUser, getUser, updateUser };
