const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const Passcode = new Schema(
  {
    code: String
  },
  { timestamps: true }
);

Passcode.methods = {
  checkPassword: function(inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  },
  hashPassword: plainTextPassword => {
    return bcrypt.hashSync(plainTextPassword, 10);
  }
};

Passcode.pre("save", next => {
  if (!this.password) {
    console.log("No passcode provided.");
    next();
  } else {
    console.log("Hashing passcode...");
    this.password = this.hashPassword(this.password);
    next();
  }
});

//note that the first argument here has to match the name of the collection
module.exports = mongoose.model("passcode", Passcode);
