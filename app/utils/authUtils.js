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


var authUtils = {};

authUtils.updateUser = function (profile, token, done) {
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

authUtils.linkUser = function (profile, token, done) {
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

module.exports = authUtils;