const Passcode = require("../models/passcode-model");

getPasscode = async (req, res) => {
  await Passcode.find({}, (err, passcode) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!passcode) {
      return res
        .status(404)
        .json({ success: false, error: `Passcode not found` });
    }
    return res.status(200).json({ success: true, data: passcode });
  }).catch(err => console.log(err));
};

module.exports = {
  getPasscode
};
