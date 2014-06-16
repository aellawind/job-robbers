var request = require('request');
var Promise = require('bluebird');
var Authentication = require('./authentication.js');

var User = require('../models/User.js');


module.exports = function (app) {

  app.get('/users', function (req, res) {
    User.findOne({ _id: req.user._id }, function (err, user) {

      var options = {
        method  : 'GET',
        url     : 'https://app.asana.com/api/1.0/users/' + user._id + '?/Authorization=' + user.asana.token
      };

      request(options, function (err, resp, body) {
        console.log(options);
        console.log(body);
      });
    });
  });

};