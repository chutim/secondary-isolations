const express = require("express");
const router = express.Router();

//routes for kit manipulation
const KitControl = require("../controllers/kit-control");

router.post("/kit", KitControl.createKit);
router.put("/kit/:id", KitControl.updateKit);
router.delete("/kit/:id", KitControl.deleteKit);
router.get("/kits", KitControl.getAllKits);
router.get("/kits/:id", KitControl.getKitByID);

//routes for logging in
const PasscodeControl = require("../controllers/passcode-control");

router.post("/login", PasscodeControl.logIn);
// router.put("/login", PasscodeControl.updatePasscode);
router.get("/login", PasscodeControl.checkLoginStatus);
router.post("/logout", PasscodeControl.logOut);

module.exports = router;
