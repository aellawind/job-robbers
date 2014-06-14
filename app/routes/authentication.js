var AsanaStrategy = require('passport-asana').Strategy;
var config        = require('../../config/asanaKeys.js');
var authUtils     = require('../utils/authUtils.js');
var request       = require('request');

var User = require('../models/User.js');

var Authentication = function (app, passport) {

  /* === PASSPORT CONFIGS === */
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  passport.use(new AsanaStrategy({
    clientID          : config.asanaAuth.clientID,
    clientSecret      : config.asanaAuth.clientSecret,
    callbackURL       : config.asanaAuth.callbackURL,
    passReqToCallBack : true
  }, function (req, token, refreshToken, profile, done) {
      process.nextTick(function () {
        !req.user ? authUtils.updateUser(profile, refreshToken.access_token, done) : authUtils.linkUser(profile, refreshToken.access_token, done);
      });
  }));

  // ======================================================
  // =====================ROUTES===========================
  // ======================================================

  app.get('/auth/asana', 
    passport.authenticate('Asana'));

  // app.get('/auth/asana', function (req, res) {
  //   res.redirect(config.asanaAuth.login);
  // })


  app.get('/auth/asana/callback',
    passport.authenticate('Asana', { failureRedirect: '/login' }),
    function (req, res) {
      console.log('Successfully logged in. Redirecting user.');
      // res.redirect('/student/' + req.user._id);
      res.redirect('/');
    }
  );

  app.get('/unlink/asana', function(req, res) {
    User.findOne({ _id: req.user._id }, function (err, user) {
      user.asana.token = undefined;
      user.save(function(err) {
        console.log(user, ' has been successfully logged out.');
        res.send(200);
      });
    })
    req.logout();
  });

};

Authentication.check = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
};

module.exports = Authentication;