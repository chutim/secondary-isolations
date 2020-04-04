const Passcode = require("../models/passcode-model");
const LocalStrategy = require("passport-local").Strategy;

const strategy = new LocalStrategy(
  {
    usernameField: "username" // not necessary, DEFAULT
  },
  function(username, password, done) {
    console.log("localStrategy: Incoming body:", username, password);
    Passcode.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        console.log("localStrategy: Failed to find user.");
        return done(null, false, { message: "Incorrect username" });
      }
      if (!user.checkPassword(password)) {
        console.log("localStrategy: Failed password check.");
        return done(null, false, { message: "Incorrect password" });
      }
      console.log("localStrategy: Found user in db.");
      return done(null, user);
    });
  }
);

module.exports = strategy;
