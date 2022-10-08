const loginService = require("../services/login");
function isLoggedIn(req, res, next) {
  req.session.username ? next() : res.redirect("/");
}

async function login(req, res) {
  console.log("in login from controller: ", req);
  const { email, password } = req.body;
  console.log("test login", email, password);

  const user = loginService.login(email, password);

  if (user.length) {
    req.session.username = email;
    res.render("/");
  } else {
    res.code = 401;
    res.message = "No User Found";
    res.render("/login=error");
  }
}

module.exports = { login };
