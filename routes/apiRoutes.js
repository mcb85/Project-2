var db = require("../models");
// const express = require("express");
// const bodyParser = require('body-parser');
// eslint-disable-next-line no-unused-vars
// const jwt = require("jsonwebtoken");
// import passport and passport-jwt modules
const passport = require("../config/passport");
// const passportJWT = require("passport-jwt");
// ExtractJwt to help extract the token
// let ExtractJwt = passportJWT.ExtractJwt;
// // JwtStrategy which is the strategy for the authentication
// let JwtStrategy = passportJWT.Strategy;
// let jwtOptions = {};
// jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// jwtOptions.secretOrKey = "wowow";
// // eslint-disable-next-line no-unused-vars
// const createUser = async ({ name, password }) => {
//   return await db.User.create({ name, password });
// };
// // eslint-disable-next-line no-unused-vars
// const getAllUsers = async () => {
//   return await db.User.findAll();
// };
// const getUser = async obj => {
//   return await db.User.findOne({
//     where: obj
//   });
// };

// // eslint-disable-next-line camelcase
// let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
//   console.log("payload received", jwt_payload);
//   // eslint-disable-next-line camelcase
//   let user = getUser({ id: jwt_payload.id });
//   if (user) {
//     next(null, user);
//   } else {
//     next(null, false);
//   }
// });
// use the strategy
// passport.use(strategy);

module.exports = function(app) {
  app.use(passport.initialize());
  // get all users
  app.get("/api/blog/", function(req, res) {
    db.Post.findAll({}).then(function(dbPost) {
      res.json(dbPost);
    });
  });
  //get one user
  app.get("/api/users/:user/", function(req, res) {
    db.User.findAll({
      where: {
        id: req.params.user
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });
  // register route
  app.post("/api/blog", function(req, res) {
    db.Post.create({
      title: req.body.title,
      body: req.body.body
    }).then(function(dbCreatePost) {
      res.json(dbCreatePost);
    });
  });

  /* app.post("/login", passport.authenticate("local"), function(req, res) {
    res.redirect("/blog/");
  });*/
  /* app.post("/signup", passport.authenticate("local"), function(req, res) {
    console.log(res);
    res.redirect("/blog");
  });*/

  app.post("/api/posts", function(req, res) {
    console.log(req.body);
    db.Post.create({
      UserId: req.body.UserId,
      id: req.body.id,
      title: req.body.title,
      body: req.body.body
    }).then(function(dbCreatePost) {
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
    passport.authenticate("local-signup", {
      successRedirect: "/blog",
      failureRedirect: "/"
    })
  );

  app.get("/api/events", function(req, res) {
    db.Events.findAll({}).then(function(dbEvents) {
      res.json(dbEvents);
    });
  });

  app.get("/api/posts", function(req, res) {
    db.Post.findAll({}).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  app.get("/api/users/:user/posts", function(req, res) {
    db.Post.findAll({
      where: {
        UserId: req.params.user
      }
    }).then(function(dbPosts) {
      res.json(dbPosts);
    });
  });

  app.delete("api/posts/:id", function (req, res) {
    db.Post.destroy({ where: { id: req.params.id } }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
};
