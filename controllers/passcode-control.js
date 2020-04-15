const passport = require("../passport");
const Passcode = require("../models/passcode-model");

//NOTE that the callbacks for a route need to be in an array
logIn = [
  async (req, res, next) => {
    console.log("logIn incoming body:", req.body);
    next();
  },
  //this will utilize localStrategy, which checks the incoming body against the credentials in the db
  //this also invokes req.login()
  passport.authenticate("local"),
  (req, res, next) => {
    var userInfo = {
      username: req.user.username,
    };
    res.send(userInfo);
  },
];

// updatePasscode = async (req, res, next) => {
//   const newPasscode = req.body.newPasscode;

//   if (!newPasscode) {
//     return res.status(400).json({
//       success: false,
//       error: "You must provide a passcode to update.",
//     });
//   }

//   Passcode.findOne({ username: req.body.username }, (err, user) => {
//     if (err) {
//       return res.status(404).json({
//         err,
//         message: "User not found!",
//       });
//     }
//     user.password = newPasscode;
//     user
//       .save()
//       .then(() => {
//         return res.status(200).json({
//           success: true,
//           message: "Passcode updated!",
//         });
//       })
//       .catch((error) => {
//         return res.status(404).json({
//           error,
//           message: "Passcode not updated.",
//         });
//       });
//   });
// };

checkLoginStatus = (req, res, next) => {
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
};

logOut = async (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.sendStatus(200);
};

module.exports = {
  logIn,
  // updatePasscode,
  checkLoginStatus,
  logOut,
};
