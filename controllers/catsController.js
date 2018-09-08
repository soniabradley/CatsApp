// Functions that will do the routing for the app

var express = require("express");
var router = express.Router();

// Import the model (cats.js) to use its database functions
var cat = require("../models/cats.js");

// Routes and logic within routes required.
router.get("/", function(req, res) {
  cat.all(function(data) {
    var hbsObject = {
      cats: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/", function(req, res) {
  cat.create([
    "name", "sleepy"
  ], [
    req.body.name, req.body.sleepy
  ], function() {
    res.redirect("/");
  });
});

router.put("/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  cat.update({
    sleepy: req.body.sleepy
  }, condition, function() {
    res.redirect("/");
  });
});
// added delete function, also adjusted index.handlebars
router.delete("/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  cat.delete(condition,function(){
    res.redirect('/');
  })
});

// Export routes for server.js to use.
module.exports = router;