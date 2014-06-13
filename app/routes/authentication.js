var AsanaStrategy = require('passport-asana').OAuth2Strategy;
var config        = require('../../config/asanaKeys.js'); 

var Authentication = function (app, passport) {
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
      process.nextTick(function () {
        !req.user ? updateUser(profile, token, done) : linkUser(profile, token, done);
      });
  }));
};


module.exports = Authentication;