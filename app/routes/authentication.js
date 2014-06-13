var AsanaStrategy = require('passport-asana').Strategy;
var config        = require('../../config/asanaKeys.js'); 

var User = require('../models/User.js');

var createUser = function (profile, token, done) {
  console.log('Creating new user for ', profile.displayName);

  var newUser = new User();
  newUser._id         = profile.id;
  newUser.asana.token = token;
  newUser.asana.name  = profile.displayName;
  newUser.asana.email = profile.emails[0].value.toLowerCase() || '';

  console.log(newUser, ' saved.');

  newUser.save();
  return done(null, newUser);
};

var updateUser = function (profile, token, done) {
  User.findOne({ 'asana.email' : profile.emails[0].value.toLowerCase() }, function(err, user) {
    if (err) { return done(err); }

    if (user) {
      // if there is a user id already but no token (user was linked at one point and then removed)
      if (!user.asana.token) {
          user._id         = profile.id;
          user.asana.token = token;
          user.asana.name  = profile.displayName;
          user.asana.email = profile.emails[0].value.toLowerCase() || ''; // pull the first email

          user.save();
          return done(null, user);
      } else {
        console.log(user.asana.name, ' is already logged in.');
        return done(null, user);          
      }
    } else {
      createUser(profile, token, done);
    }
  });
};

var linkUser = function (profile, token, done) {
   // user already exists and is logged in, we have to link accounts
  var user = req.user; // pull the user out of the session
  user.asana.token = token;
  user.asana.name  = profile.displayName;
  user.asana.email = profileEmail || ''; // pull the first email

  user.save(function(err) {
    if (err)
        throw err;
    return done(null, user);
  });   
};


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
        console.log(profile, 'profile');
        !req.user ? updateUser(profile, token, done) : linkUser(profile, token, done);
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
      res.redirect('/');
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


module.exports = Authentication;