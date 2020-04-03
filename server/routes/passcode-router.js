const express = require("express");

const PasscodeControl = require("../controllers/passcode-control");

const router = express.Router();

router.post("/", PasscodeControl.getPasscode);

module.exports = router;
