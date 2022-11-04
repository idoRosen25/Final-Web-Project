const userService = require("../services/user");

function isLoggedIn(req, res, next) {
  req.session.username ? next() : res.redirect("/");
}

function isAdmin(req, res, next) {
  req.session.username && req.session.role === "admin"
    ? next()
    : res.json({ code: 403, message: "Admins Only" });
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await userService.login(email, password);

    if (user) {
      req.session.username = email;
      req.session.role = user.role;
      res.json({ status: "success", code: 200, user });
    } else {
      res.json({ status: "error", code: 401, message: "No User Found" });
    }
  } catch (error) {
    res.json({ status: "error", code: error.code, message: error.message });
  }
}

async function register(req, res) {
  const { email, password, firstName, lastName, gender, age, role } = req.body;

  try {
    const register = await userService.registerUser(
      email,
      password,
      firstName,
      lastName,
      gender,
      age,
      role
    );
    if (register) {
      req.session.username = email;
      res.redirect("/");
    } else {
      throw Error();
    }
  } catch (error) {
    res.json({
      status: "error",
      code: error.code,
      error: error.message,
    });
  }
}

async function getUser(req, res) {
  const username = req.session.username;
  if (username) {
    const user = await userService.getUser(username);
    res.json({ status: "success", code: 200, user });
  } else {
    res.redirect("/user/register");
  }
}

async function updateUser(req, res) {
  const username = req.session.username;
  const { password, firstName, lastName, gender, age } = req.body;
  if (username) {
    const user = await userService.updateUser(
      username,
      password,
      firstName,
      lastName,
      gender,
      age
    );
    if (user) {
      res.json({ status: "success", code: 200, user });
    }
  }
  res.json({
    status: "error",
    code: 400,
    message: "Couldn't update user info",
  });
}
module.exports = { login, register, isLoggedIn, isAdmin, getUser, updateUser };
