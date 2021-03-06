const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

//note that the URL has to match the database name
mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb://127.0.0.1:27017/secondary-isolation-kits",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .catch(e => {
    console.error("Connection error", e.message);
  });

const db = mongoose.connection;

module.exports = db;
