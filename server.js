const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Handlebars = require("handlebars");
const passport = require("passport");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 5000;

const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

//handlebar helpers
const { formatDate,stripTags,truncate, editIcon } = require("./helper/handlebar");

//template setup
app.engine(
  "handlebars",
  exphbs({
    helpers: {
      formatDate,
      stripTags,
      truncate,
      editIcon
    },
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set("view engine", "handlebars");

const keys = require("./config/keys");

mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

app.use(express.static("public"));
//body parser setup

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//method overirde
app.use(methodOverride("_method"));

//cookie parser
app.use(cookieParser());

//session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

//flash
app.use(flash());

//passport
require("./config/passport")(passport);

//passport-session
app.use(passport.initialize());
app.use(passport.session());

//global variable
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

const Auth = require("./routes/Auth");
const Content = require("./routes/Content");
const Profile = require("./routes/Profile");
app.use("/", Auth, Content, Profile);

app.listen(port, (req, res) => {
  console.log(`Project is running on ${port}`);
});
