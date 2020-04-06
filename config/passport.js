var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;
var db = require("../models");

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true
    },
    function(req, email, password, done) {
      console.log("hello");
      db.User.findOne({ where: { email: email } }).then(function(err, user) {
        if (err) {
          console.log("error");
          return done(err);
        }
        if (user) {
          console.log("already a user");
          return done(null, false, { message: "Email is already in use" });
        }
        db.User.create({
          name: req.body.name,
          email: email,
          password: password
        }).then(function(dbUser) {
          return done(null, dbUser);
        });
      });
    }
  )
);

passport.use(
  "local-signin",
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true
    },
    function(req, email, password, done) {
      // console.log(req);
      db.User.findOne({ where: { email: email } }).then(function(user) {
        if (!user) {
          return done(null, false, {
            message: "Incorrect username or password"
          });
        }
        if (!user.verifyPassword(password)) {
          return done(null, false, {
            message: "Incorrect username or password"
          });
        }
        return done(null, user);
      });
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(err, user);
});

module.exports = passport;
