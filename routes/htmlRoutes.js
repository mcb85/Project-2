var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/events", function(req, res) {
    res.render("events-calendar");
  });

  app.get("/blog", function(req, res) {
    var currentUser = {
      id: 1
    };
    //console.log(req);
    //res.render("blog", { user: req.user });
    res.render("blog", { user: currentUser });
  });

  app.get("/post", function(req, res) {
    res.render("post");
  });

  app.get("/resources", function(req, res) {
    res.render("resources");
  });

  // Load example page and pass in an example by id
  app.get("/posts/:id", function(req, res) {
    db.Post.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      console.log("Post ");
      console.log(dbPost);
      res.render("post", {
        post: dbPost.dataValues
      });
    });
  });

  app.delete("/posts/:id", function(req, res) {
    db.Post.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      console.log("post deleted");
      res.render("post", {
        post: dbPost.dataValues
      });
    });
  });
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
