const bcrypt = require("bcryptjs");
const passport = require("passport");

//Model User
const User = require("../models/user");

// POSTlogin
exports.POSTlogin = function (req, res, next) {
  passport.authenticate("local", {
    successRedirect: "/library/home",
    failureRedirect: "/users/login",
  })(req, res, next);
};

// logout
exports.logout = function (req, res) {
	req.logout(function(err) {
	  if (err) {
		// Handle any errors that occur during logout
		console.error(err);
	  }
	  req.flash("success", "You are logged out");
	  res.redirect("/users/login");
	});
  };

exports.GETdashboard = function (req, res) {
  res.render("dashboard");
};

// Render the login page
exports.GETlogin = function (req, res) {
  res.render("login");
};

// Render the registration page
exports.GETregister = function (req, res) {
  res.render("register");
};

// Handle registration form validation and user creation
exports.POSTregister = function (req, res) {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  // Check if all fields are filled
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please enter all fields" });
  }

  // Check if passwords match
  if (password != password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  // Check password length
  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }

  // If there are errors, render the registration page with errors
  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    // Check if the user already exists
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: "Email already exists" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });

        // Encrypt the password and save the new user
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                // Flash success message and redirect to login page
                req.flash("success", "You are now registered!");
                res.redirect("/users/login");
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
};