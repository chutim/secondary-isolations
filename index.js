const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("./passport");

const db = require("./db");
const router = require("./routes");

const app = express();
app.disable("x-powered-by");
const PORT = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, "client", "build")));

console.log("Environment:", process.env.NODE_ENV);
const origin =
  process.env.NODE_ENV.trim() === "development"
    ? "http://localhost:3000"
    : "https://secondary-isolations.herokuapp.com";
app.use(
  cors({
    credentials: true,
    origin,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "the bestest secret of all secrets",
    name: "sessionID",
    store: new MongoStore({ mongooseConnection: db }),
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use("/api", router);

// sends index.html
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build/index.html"));
});

// error handling endware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
