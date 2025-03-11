const User = require("../models/user.js");


module.exports.rendersignupform =  (req, res) => {
    res.render("users/signup.ejs");
  }


module.exports. signUp  =async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const registeruser = await User.register(newUser, password);
      console.log(registeruser);
      req.login(registeruser, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("sucess", "Welcome to Wanderlust");
        res.redirect("/listing");
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  }


  module.exports.renderloginform =  (req, res) => {
    res.render("users/login.ejs");
  }

  module.exports.login  =  async (req, res) => {
    req.flash("sucess", "Welcome back to Wanderlust");
    let redirecturl = res.locals.redirectUrl || "/listing"
    res.redirect(redirecturl);
  }


  module.exports.loguot =  (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.flash("sucess", "You are longed out");
      res.redirect("/listing");
    });
  }