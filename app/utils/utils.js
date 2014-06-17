var User = require('../models/User.js');

var createUser = function (profile, token, done) {
  var newUser = new User();
  newUser._id         = profile.id;
  newUser.asana.token = token;
  newUser.asana.name  = profile.displayName;
  newUser.asana.email = profile.emails[0].value.toLowerCase() || '';

  newUser.save();
  return done(null, newUser);
};

var organizeProgress = function (project, user) {
  console.log('Organizing user progress...');
  User.findOne({ _id: user._id }, function (err, user) {
    user.progress.push(
      { 'Graveyard'                                           : project['Graveyard']},
      { 'Leads'                                               : project['Leads']},
      { 'Applied'                                             : project['Applied']},
      { 'Screen Conversation Scheduled'                       : project['Screen Conversation Scheduled']},
      { 'Post Screen Conversation'                            : project['Post Screen Conversation']},
      { 'Pre-Onsite Tech Screen (phone/take home) Scheduled'  : project['Pre-Onsite Tech Screen (phone/take home) Scheduled']},
      { 'Post Tech Screen (Phone/take home)'                  : project['Post Tech Screen (Phone/take home)']},
      { 'On-Site Scheduled'                                   : project['On-Site Scheduled']},
      { 'Post On-Site'                                        : project['Post On-Site']},
      { 'Offers'                                              : project['Offers'] }
    );
    console.log('User progress organized & saved!');
    user.save();
  });
};

var utils = {};

utils.saveProgress = function (tasks, user) {
  console.log('Saving user progress...');
  User.findOne({ _id: user._id }, function (err, user) {
    var progress = {};
    tasks.forEach(function (task) {
      if (task.name.indexOf(':') !== -1) {
        progress[task.name.slice(0, -1)] = task.id
      }
    });
    organizeProgress(progress, user);
  });
};


utils.updateUser = function (profile, token, done) {
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

          console.log(user);
          return done(null, user);
      } else {
        user.asana.token = token;
        user.save();
        return done(null, user);          
      }
    } else {
      createUser(profile, token, done);
    }
  });
};

utils.linkUser = function (profile, token, done) {
 // user already exists and is logged in, we have to link accounts
  req.user.asana.token = token;
  console.log('User exists. Saving new token...', req.user.asana.token);
  user.save(function(err) {
    if (err) { throw err; }
    return done(null, user);
  });

};

module.exports = utils;