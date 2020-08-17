// const mongoose = require("mongoose");
var GoogleStrategy = require('passport-google-oauth20').Strategy;
// const passport = require("passport");
const mongoose = require("mongoose");

const keys = require("./keys"); 

const User = require("../models/UserModel");



module.exports = function(passport) {
    passport.use(new GoogleStrategy({
        clientID: keys.GOOGLE_CLIENT_ID,
        clientSecret: keys.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback"
      },
      function(accessToken, refreshToken, profile, done) {
        const newUser = {
          googleId : profile.id,
          displayName : profile.displayName,
          firstName : profile.name.givenName,
          lastName : profile.name.familyName,
          email : profile.emails[0].value,
          image : profile.photos[0].value
        }
        User.findOne({ googleId : profile.id })
        .then((user) => {
          if(user){
           done(null, user)
          }else{
            new User(newUser)
            .save()
            .then((user) => {
              done(null, user)
            })
          }
        })
      }
    ));
    passport.serializeUser(function (user, done) {
      done(null, user.id);
    });
  
    passport.deserializeUser(function (id, done) {
      User.findById(id, function (err, user) {
        done(err, user);
      });
    });
}