const passport = require("../passport");
const Passcode = require("../models/passcode-model");

//NOTE that the callbacks for a route need to be in an array
logIn = [
  async (req, res, next) => {
    console.log("logIn req.body:", req.body);
    next();
  },
  //this will utilize localStrategy, which checks the incoming body against the credentials in the db
  //this also invokes req.login()
  passport.authenticate("local"),
  (req, res, next) => {
    console.log("Logged in:", req.user);
    var userInfo = {
      username: req.user.username
    };
    res.send(userInfo);
  }
];

logOut = async (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.sendStatus(200);
};

module.exports = {
  logIn,
  logOut
};
