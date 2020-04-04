const express = require("express");

const KitControl = require("../controllers/kit-control");

const router = express.Router();

router.post("/kit", KitControl.createKit); //in use
router.put("/kit/:id", KitControl.updateKit); //in use
router.delete("/kit/:id", KitControl.deleteKit); //in use
router.get("/kit/:species", KitControl.getKitsBySpecies);
router.get("/kits", KitControl.getAllKits); //in use

const PasscodeControl = require("../controllers/passcode-control");
const passport = require("../passport");

router.post("/login", PasscodeControl.logIn);
// router.post("/login", [
//   function(req, res, next) {
//     console.log("routes/user.js, login, req.body: ");
//     console.log(req.body);
//     next();
//   },

//   passport.authenticate("local"),
//   (req, res) => {
//     console.log("logged in", req.user);
//     var userInfo = {
//       username: req.user.username
//     };
//     res.send(userInfo);
//   }
// ]);
router.get("/loggedIn", PasscodeControl.checkLoggedIn);

module.exports = router;
