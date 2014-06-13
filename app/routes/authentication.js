var AsanaStrategy = require('passport-asana').Strategy;
var config        = require('../../config/asanaKeys.js'); 

var User = require('../models/User.js');
var Authentication = function (app, passport) {

  /* === PASSPORT CONFIGS === */
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (err, user) {
    User.findById(id, function (err, user) {
      done(null, user.id);
    });
  });

  passport.use(new AsanaStrategy({
    clientID          : config.asanaAuth.clientID,
    clientSecret      : config.asanaAuth.clientSecret,
    callbackURL       : config.asanaAuth.callbackURL,
    passReqToCallBack : true
  }, function (req, token, refreshToken, profile, done) {
      User.findOrCreate({ userId: profile.id }, function (err, user) {
        return done(err, user);
      });
      // process.nextTick(function () {
      //   !req.user ? updateUser(profile, token, done) : linkUser(profile, token, done);
      // });
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
      res.redirect('/');
    }
  );

};


module.exports = Authentication;