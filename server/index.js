const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("./passport");

const db = require("./db");
const kitRouter = require("./routes/kit-router");
const passcodeRouter = require("./routes/passcode-router");

const app = express();
const apiPort = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "the best secret",
    // store: sessionStore,
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
// app.get("/", (req, res, next) => {
//   console.log("assigning req.session.username");
//   req.session.username = "bobby";
//   res.end();
// });

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use("/api", kitRouter);
app.use("/login", passcodeRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
