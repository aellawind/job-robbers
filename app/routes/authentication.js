var request         = require('request');
var AsanaStrategy   = require('passport-asana').Strategy;

var config          = require('../../config/asanaKeys.js');
var asana           = require('../utils/asanaApiRoutes.js');
var utils           = require('../utils/utils.js');

var User            = require('../models/User.js');

var Authentication  = function (app, passport) {

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
  }, function (req, code, token, profile, done) {
      process.nextTick(function () {
        !req.user ? utils.updateUser(profile, token.access_token, done) : utils.linkUser(profile, token.access_token, done);
      });
  }));

  // ======================================================
  // =====================ROUTES===========================
  // ======================================================

  app.get('/auth/asana', 
    passport.authenticate('Asana'));

  app.get('/auth/asana/callback',
    passport.authenticate('Asana', { failureRedirect: '/#/404' }),
    function (req, res) {
      var isHackReactorStudent = false;
      var options     = {};
      options.method  = 'GET';
      options.url     = asana.me();
      options.headers = { 'Authorization' : 'Bearer ' + req.user.asana.token };

      request(options, function (err, httpResponse, user) {
        user = JSON.parse(user).data;
        // iterate through user workspaces && match with hack reactor workspace
        // to identify that current user is a hack reactor student
        // some is basically forEach but breaks loop when return value is true        
        user.workspaces.some(function (workspace) {
          if (workspace.id === asana.workspaceId) {
            isHackReactorStudent = true;
            return true;
          }
        })
        // without if/else you'll receive 'header has been sent' error
        // properly redirects user && if iompostor, logout user && redirect to 404
        if (isHackReactorStudent) { res.redirect('/#/home'); }
          else {
            req.user.asana.token = undefined;
            req.user.save(function (err, user) {
              req.logout();
              res.redirect('/#/404');       
            });            
          }
      });
    }
  );

  app.get('/unlink/asana', Authentication.check, function(req, res) {
    User.findOne({ _id: req.user._id }, function (err, user) {
      user.asana.token = undefined;
      user.save(function(err) {
        console.log(user, ' has been successfully logged out.');
        req.logout(); 
        res.redirect('/');
      });
    })
  });

};

Authentication.check = function (req, res, next) {
  req.isAuthenticated ? next() : res.redirect('/login');
};

module.exports = Authentication;