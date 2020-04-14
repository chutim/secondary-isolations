const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

//THINGS TO DO

const Passcode = new Schema({
  username: String,
  password: String,
});

Passcode.methods = {
  checkPassword: function (inputPassword) {
    // return bcrypt.compareSync(inputPassword, this.password);
    return inputPassword === this.password;
  },
  hashPassword: (plainTextPassword) => {
    return bcrypt.hashSync(plainTextPassword, 10);
  },
};

Passcode.pre("save", (next) => {
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
//NOTE that the collection needs to be plural... i think mongoose pluralizes the collection name here. so it's looking for a collection called 'passcodes'. previously my collection was just called 'passcode' and it would not be able to find anything with axios.
module.exports = mongoose.model("passcodes", Passcode);
