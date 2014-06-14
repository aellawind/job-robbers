var AsanaStrategy = require('passport-asana').Strategy;
var config        = require('../../config/asanaKeys.js');
var authUtils     = require('../utils/authUtils.js'); 

var User = require('../models/User.js');

var Authentication = function (app, passport) {

  /* === PASSPORT CONFIGS === */
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(null, user);
    });
  });

  passport.use(new AsanaStrategy({
    clientID          : config.asanaAuth.clientID,
    clientSecret      : config.asanaAuth.clientSecret,
    callbackURL       : config.asanaAuth.callbackURL,
    passReqToCallBack : true
  }, function (req, token, refreshToken, profile, done) {
      process.nextTick(function () {
        !req.user ? authUtils.updateUser(profile, token, done) : authUtils.linkUser(profile, token, done);
      });
  }));

  // ======================================================
  // =====================ROUTES===========================
  // ======================================================

  app.get('/auth/asana', 
    passport.authenticate('Asana'));

  app.get('/auth/asana/callback',
    passport.authenticate('Asana', { failureRedirect: '/login' }),
    function (req, res) {
      console.log('Successfully logged in. Redirecting user.');
      res.redirect('/student/' + req.user._id);
    }
  );

  app.get('/unlink/asana/:id', function(req, res) {
    User.findOne({ _id: req.params.id }, function (err, user) {
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