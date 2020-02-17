// api-routes.js - this file offers a set of routes for displaying and saving data to the db

// used for parsing form data
var formidable = require("formidable");

// Requiring our models
var db = require("../models");
var path = require("path");

// Routes
module.exports = function(app) {
  /**************************** 
  // get all products
  ***************************/

  app.get("/api/products/all", function(req, res) {
    db.Product.findAll().then(function(dbProducts) {
      res.json(dbProducts);
    });
  });
  /**************************** 
  // get all users
  ***************************/

  app.get("/api/users/all", function(req, res) {
    db.User.findAll().then(function(dbUsers) {
      res.json(dbUsers);
    });
  });
  /**************************** 
// get products by category
  ***************************/
  app.get("/api/category/:category", function(req, res) {
    db.Product.findAll({
      where: {
        category: req.params.category
      }
    }).then(function(results) {
      res.json(results);
    });
  });
  /**************************** 
  // Add a New Products
  ***************************/
  app.post("/api/add-product", function(req, res) {
    // Setup formidable
    // Instantiate a new formidable form for processing.
    var form = new formidable.IncomingForm();
    // Parse the form request
    // form.parse analyzes the incoming stream data, picking apart the different fields and files .
    form.parse(req, function(err, fields, files) {
      // Add Product to DB
      db.Product.create({
        productName: fields.productName,
        username: fields.username,
        category: fields.category,
        description: fields.description,
        price: fields.price,
        quantity: fields.quantity,
        imageURL: fields.imageURL
      }).then(function(dbProduct) {
        res.redirect("/product-page/" + dbProduct.id);
      });
    });
    /* this is where the renaming happens */
    form.on("fileBegin", function(name, file) {
      //rename the incoming file to the file's name
      file.path =
        path.basename(path.dirname("../")) +
        "/public/uploads/products/" +
        file.name;
    });

    form.on("end", function() {
      console.log("File Uploaded succesfully");
    });
  });
  /**************************** 
  // PUT route for updating products
  ****************************/
  app.put("/editProducts/:id", function(req, res) {
    if (req.isAuthenticated()) {
      db.Product.update(
        {
          productName: req.body.edited_product_name,
          price: req.body.edited_price,
          category: req.body.edited_category,
          description: req.body.edited_description
        },
        {
          where: {
            Id: req.params.id
          }
        }
      ).then(function(results) {
        console.log(req.params.id);
        res.redirect("/editProducts/" + req.params.id);
      });
    }
  });
  /**************************** 
 Updates product image 
 ****************************/

  app.put("/product-image", function(req, res) {
    console.log(req.body.id);
    // Setup formidable
    var form = new formidable.IncomingForm();

    // Parse the form request
    form.parse(req, function(err, fields, files) {
      // Add profile image to DB
      db.Product.update(
        {
          imageURL: files.edited_imageURL.name
        },
        {
          where: {
            id: fields.id
          }
        }
      ).then(function(dbUser) {
        res.redirect("/editProducts/" + fields.id);
      });
    });

    form.on("fileBegin", function(name, file) {
      file.path =
        path.basename(path.dirname("../")) +
        "/public/uploads/products/" +
        file.name;
    });

    form.on("end", function() {
      console.log("File Uploaded succefully");
    });
  });
  /**************************** 
// PUT route for deleting products
***************************/
  app.delete("/api/products/:id", function(req, res) {
    db.Product.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(results) {
      res.json(results);
    });
  });
  /**************************** 
 // PUT route for deleting products from the specific user 
***************************/
  app.delete("/products/delete/:id", function(req, res) {
    db.Product.destroy({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(results) {
      res.redirect("/edit-profile");
    });
  });
  /**************************** 
// Put route to login 
***************************/
  app.get("/api/login", function(req, res) {
    db.User.findOne({
      where: {
        $and: [
          { userName: req.params.userName }, // AND ( userName=userName )
          { password: req.params.password } // AND ( password=password )
        ]
      }
    })
      .then(function(results) {
        res.json(results);
      })
      .catch(function(err) {
        res.json("");
      });
  });
  /**************************** 
  // Add a profile image 
***************************/
  app.put("/profile-image", function(req, res) {
    // Setup formidable
    var form = new formidable.IncomingForm();

    // Parse the form request
    form.parse(req, function(err, fields, files) {
      // Add profile image to DB
      db.User.update(
        {
          profileImage: files.profile_image.name
        },
        {
          where: {
            id: fields.id
          }
        }
      ).then(function(dbUser) {
        res.redirect("/store/" + req.user.userName);
      });
    });

    form.on("fileBegin", function(name, file) {
      // path.basename() methods returns the last portion of the path
      file.path =
        path.basename(path.dirname("../")) +
        "/public/uploads/users/" +
        file.name;
    });

    form.on("end", function() {
      console.log("File Uploaded Succefully");
    });
  });
};
