const express = require("express");
const router = express.Router();
const passport = require("passport");
const { ensureGuest } = require("../helper/authHelper");

router.get("/", ensureGuest,(req, res) => {
  res.render("unAuthenticated/login", {
    layout: 'login'
  });
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ['profile', 'email'] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  function (req, res) {
    // Successful authentication, redirect home.
    req.flash('success_msg', `Welcome to StoryBook..!!`);
    res.redirect("/newsfeed");
   
  }
);

router.get("/logout", (req,res) =>{
  req.logout();
  req.flash("success_msg", "LoggedOut Successfully, see you later..!!")
  res.redirect("/"); 
})

module.exports = router;
