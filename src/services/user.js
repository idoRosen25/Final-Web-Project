const userModel = require("../models/user");
const hashService = require("./hash");

async function login(email, password) {
  if (!email.match(/\S+@\S+\.\S+/)) {
    throw { status: "error", code: 401, message: "Invalid Email Address" };
  }

  const user = await userModel.findOne({ email });

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
  lastName = "unkown",
  gender,
  age,
  isAdmin = false
) {
  if (parseInt(age) < 0)
    throw {
      code: 400,
      message: "Couldn't register user. Please try again later",
    };

  if (!(await login(email, password))) {
    const hashedPass = await hashService.genHash(password);

    if (!password || !firstName || !gender || !age)
      throw {
        code: 400,
        message: "Couldn't register user. Please try again later",
      };

    const newUser = new userModel({
      email,
      password: hashedPass,
      firstName,
      lastName,
      gender,
      age: parseInt(age),
      isAdmin,
    });

    console.log("new user from model: ", newUser);
    try {
      console.log("trying to add nerw user");
      return newUser.save();
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
  return userModel.findOne({ email });
}

async function updateUser(
  email,
  password,
  firstName,
  lastName,
  gender,
  age,
  isRoleAdmin
) {
  const currentUser = await userModel.findOne({ email: "ido@gmail.com" });
  if (currentUser) {
    const hashPass = password
      ? await hashService.genHash(password)
      : currentUser.password;
    const user = await userModel.updateOne(
      { email: currentUser.email },
      {
        password: hashPass,
        firstName: firstName || currentUser.firstName,
        lastName: lastName || currentUser.lastName,
        gender: gender || currentUser.gender,
        age: age ? parseInt(age) : currentUser.age,
        isRoleAdmin,
      }
    );
    console.log("updated user: ", user);
    return user;
  }
  return null;
}
module.exports = { login, registerUser, getUser, updateUser };
