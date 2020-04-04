var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;
var db = require("../models");

passport.use(
  "local-signup",
  new LocalStrategy(function(email, password, done) {
    db.User.findOne({ where: { email: email } }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, false, { message: "Email is already in use" });
      }
      db.User.create({
        name: name,
        email: email,
        password: password
      });
    });
  })
);

passport.use(
  "local-signin",
  new LocalStrategy(
    {
      usernameField: "email"
    },
    function(email, password, done) {
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
