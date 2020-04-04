const passport = require("../passport");
const Passcode = require("../models/passcode-model");

//NOTE that the callbacks for a route need to be in an array
logIn = [
  async (req, res, next) => {
    console.log("logIn post route");
    console.log(req.body);
    next();
  },
  passport.authenticate("local"),
  (req, res, next) => {
    console.log("logged in", req.user);
    var userInfo = {
      username: req.user.username
    };
    res.send(userInfo);
  }
];

checkLoggedIn = (req, res, next) => {
  console.log("checkLoggedIn get route", req.user);
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
};

module.exports = {
  logIn,
  checkLoggedIn
};
