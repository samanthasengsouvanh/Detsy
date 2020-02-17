const path = require("path");
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

// ROUTES

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/index.html"));
  });
  app.get("/add-product", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/add-product.html"));
  });
  app.get("/messaging", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/messaging.html"));
  });
  app.get("/product-page", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/product-page.html"));
  });
  app.get("/sign-up", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/sign-up.html"));
  });
  app.get("/user-page/:id", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/user-page.html"));
  });
  app.get("/search", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/search.html"));
  });
  app.get("/log-in", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/log-in.html"));
  });
};
