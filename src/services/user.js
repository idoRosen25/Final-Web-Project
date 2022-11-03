const User = require("../models/user");
const client = require("../models/db");
const hashService = require("./hash");

async function login(email, password) {
  await client.connect();

  if (!email.match(/\S+@\S+\.\S+/)) {
    throw { status: "error", code: 401, message: "Invalid Email Address" };
  }
  const user = await client.db("storeDB").collection("users").findOne({
    email,
  });
  if (user) {
    const compare = await hashService.compareHash(password, user.password);
    if (compare) {
      return user;
    }
  }
  return null;
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

  if (!(await login(email, password))) {
    const hashedPass = await hashService.genHash(password);

    const newUser = new User({
      email,
      password: hashedPass,
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
  } else {
    throw { code: 401, message: "Username already exists" };
  }
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
