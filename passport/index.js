const passport = require("passport");
const LocalStrategy = require("./localStrategy");
const Passcode = require("../models/passcode-model");

// called on login, saves the id to session req.session.passport.user = {id:'..'}
passport.serializeUser((user, done) => {
  console.log("Serializing:", user);
  done(null, { _id: user._id });
});

// user object attaches to the request as req.user
passport.deserializeUser((id, done) => {
  console.log("Deserializing...");
  Passcode.findOne({ _id: id }, "username", (err, user) => {
    console.log(user);
    done(null, user);
  });
});

//  Use Strategies
passport.use(LocalStrategy);

module.exports = passport;
