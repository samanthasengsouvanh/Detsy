// Requiring bcrypt for password hashing. Using the bcryptjs version as
//the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require("bcryptjs");
//
// Creating our User model
//Set it as export because we will need it required on the server
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 32]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 45]
      }
    },
    shopName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3]
      }
    },
    shopDescription: {
      type: DataTypes.STRING
    },
    shopImage: {
      type: DataTypes.STRING
    }
  });

  User.associate = function(models) {
    // Associating a user with product
    // When a user is deleted, also delete any associated product(s)
    // simply adds ON DELETE CASCADE rule to your database which specifies
    // that the child data gets deleted when the parent data is deleted
    User.hasMany(models.Product, {
      onDelete: "cascade"
    });
  };
  // Creating a custom method for our User model.
  //This will check if an unhashed password entered by the
  //user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password

  User.beforeCreate(user => {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  return User;
};
