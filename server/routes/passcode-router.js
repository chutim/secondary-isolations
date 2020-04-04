const express = require("express");

const PasscodeControl = require("../controllers/passcode-control");

const router = express.Router();

router.post("/", PasscodeControl.logIn);
router.get("/", PasscodeControl.checkLoggedIn);

module.exports = router;
