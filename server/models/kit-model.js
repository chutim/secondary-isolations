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

//note that the first argument here has to match the name of the collection
module.exports = mongoose.model("kits", Kit);
