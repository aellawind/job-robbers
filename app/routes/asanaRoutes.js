var request         = require('request');
var Authentication  = require('./authentication.js');
var User            = require('../models/User.js');

var asanaURL        = 'https://app.asana.com/api/1.0';
var options         = {};

module.exports = function (app) {

  /* === FETCH SPECIFIC USER & PROJECT ID === */
  app.get('/users', function (req, res) {
    User.findOne({ _id: req.user._id }, function (err, user) {

      options.method  = 'GET';
      options.url     = asanaURL + '/users/' + user._id
      options.headers = {
        'Authorization' : 'Bearer ' + user.asana.token
      };

      console.log(options);
      request(options, function (err, response, body) {
        console.log(body);
        res.send(body);
      });
    });
  });

  /* === FETCH ALL TASKS ==== */
  app.get('/user/:userId/projects/:projectId/tasks', function (req, res) {
    User.findOne({ _id: req.params.userId }, function (err, user) {
      if (err) { throw err; }

      options.method  = 'GET';
      options.url     = asanaURL + '/user/' + user._id + '/projects/' + req.params.projectId + '/tasks'
      options.headers = {
        'Authorization' : 'Bearer ' + user.asana.token
      };

      request(options, function (err, response, body) {
        res.send(body);
      });
    });
  });
};