var request         = require('request');
var Authentication  = require('./authentication.js');
var User            = require('../models/User.js');
var asanaUtils       = require('../utils/asanaUtils.js')

var asanaURL        = 'https://app.asana.com/api/1.0';
var options         = {};

module.exports = function (app) {

  /* === FETCH SPECIFIC USER & GRAB TASKS === */
  app.get('/users', function (req, res) {
    User.findOne({ _id: req.user._id }, function (err, user) {

      options.method  = 'GET';
      options.url     = asanaURL + '/workspaces/1213745087037/projects'
      options.headers = {
        'Authorization' : 'Bearer ' + user.asana.token
      };

      request(options, function (err, response, body) {
        return asanaUtils.fetchProject(err, response, body, options, user);
      });

      // request(options, function (err, response, body) {
      //   body = JSON.parse(body);
      //   body.data.forEach(function (project) {
      //     if (project.name === 'Amira Anuar') {
      //       // do step 2 of gif stuff to say you're fetching data
      //       console.log(project, project.id);
      //       options.url = asanaURL + '/projects/' + project.id + '/tasks';
      //       request(options, function (err, response, body) {
      //         console.log(JSON.parse(body));
      //       });
      //     }
      //   });        
      // });
    });
  });

};