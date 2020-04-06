var db = require("../models");

const passport = require("../config/passport");

module.exports = function (app) {
  app.use(passport.initialize());
  // get all users
  app.get("/api/blog/", function (req, res) {
    db.Post.findAll({}).then(function (dbPost) {
      res.json(dbPost);
    });
  });
  //get one user
  app.get("/api/users/:user/", function (req, res) {
    db.User.findAll({
      where: {
        id: req.params.user
      }
    }).then(function (dbUser) {
      res.json(dbUser);
    });
  });
  // register route
  app.post("/api/blog", function (req, res) {
    db.Post.create({
      title: req.body.title,
      body: req.body.body
    }).then(function (dbCreatePost) {
      res.json(dbCreatePost);
    });
  });
  app.post(
    "/login",
    passport.authenticate("local-signin", {
      successRedirect: "/blog",
      failureRedirect: "/"
    })
  );
  app.post(
    "/signup",
    passport.authenticate(
      "local-signup",
      function (res) {
        console.log(res);
      }, {
        successRedirect: "/blog",
        failureRedirect: "/"
      }
    )
  );
  // )
  app.get("/api/events", function (req, res) {
    db.Events.findAll({}).then(function (dbEvents) {
      res.json(dbEvents);
    });
  });

  app.post("/api/events", function (req, res) {
    db.Events.create({
      name: req.body.name,
      date: req.body.date,
      description: req.body.descrition,
      location: req.body.location
    }).then(function (dbEvents) {
      res.json(dbEvents)
    });
  })
};