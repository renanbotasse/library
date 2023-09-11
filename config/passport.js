const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// Import the User model
const User = require("../models/user");
// This function will be imported in usersController.js for POST login and logout.
// 'passport' will be passed from app.js.
module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      // Does the email match?
      User.findOne({ email: email }).then((user) => {
        if (!user) {
          return done(null, false, { message: "Unregistered email" });
        }
        // Do the password and email match?
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Incorrect password" });
          }
        });
      });
    })
  );
  // Method for serializing the 'user'
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  // Method for deserializing the 'user'
  passport.deserializeUser(function (id, done) {
	User.findById(id)
	  .then((user) => {
		if (!user) {
		  return done(null, false);
		}
		done(null, user);
	  })
	  .catch((err) => {
		done(err, null);
	  });
  });
};
