require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
// eslint-disable-next-line no-unused-vars
var session = require("express-session");
var db = require("./models");
var passport = require("./config/passport");
var app = express();
var PORT = process.env.PORT || 3000;

// Middleware

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

/*app.use(
  session({ secret: "dont-say-a-word", resave: true, saveUninitialized: true })
);*/
//app.use(passport.initialize());
/*app.use(
  passport.session({
    secret: "dont-say-a-word",
    resave: true,
    saveUninitialized: true
  })
);*/

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
app.use(passport.initialize());
app.use(passport.session());

module.exports = app;
