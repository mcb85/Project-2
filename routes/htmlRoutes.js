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
    console.log(currentUser);
    //res.render("blog", currentUser.id);
    res.render("blog", { user: currentUser });
  });

  app.get("/post", function(req, res) {
    res.render("post");
  });

  app.get("/resources", function(req, res) {
    res.render("resources");
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
