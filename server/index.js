const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("./passport");

const db = require("./db");
const router = require("./routes");

const app = express();
const apiPort = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "the best secret",
    store: new MongoStore({ mongooseConnection: db }),
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log("req.session", req.session);
  return next();
});

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use("/api", router);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
