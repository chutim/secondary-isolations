const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Kit = new Schema(
  {
    id: String,
    name: String,
    species: String,
    type: String,
    constants: [[String, String]]
  },
  { timestamps: true }
);

module.exports = mongoose.model("kits", Kit);
