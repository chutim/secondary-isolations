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
const apiPort = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(
  session({
    secret: "the best secret",
    store: new MongoStore({ mongooseConnection: db }),
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use("/api", router);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
