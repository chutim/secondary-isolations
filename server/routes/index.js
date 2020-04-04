const express = require("express");
const router = express.Router();

//routes for kit manipulation
const KitControl = require("../controllers/kit-control");

router.post("/kit", KitControl.createKit); //in use
router.put("/kit/:id", KitControl.updateKit); //in use
router.delete("/kit/:id", KitControl.deleteKit); //in use
router.get("/kits", KitControl.getAllKits); //in use

//routes for logging in
const PasscodeControl = require("../controllers/passcode-control");

router.post("/login", PasscodeControl.logIn);
router.post("/logout", PasscodeControl.logOut);

module.exports = router;
