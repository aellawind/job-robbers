var request         = require('request');
var Authentication  = require('./authentication.js');
var User            = require('../models/User.js');

var asanaURL        = 'https://app.asana.com/api/1.0';
var options         = {};

var request         = require('request');
var Promise         = require('bluebird');
var Authentication  = require('./authentication.js');

var User = require('../models/User.js');

module.exports = function (app) {

  /* === FETCH SPECIFIC USER & GRAB TASKS === */
  app.get('/users', function (req, res) {
    User.findOne({ _id: req.user._id }, function (err, user) {

      options.method  = 'GET';
      options.url     = asanaURL + '/workspaces/1213745087037/projects'
      options.headers = {
        'Authorization' : 'Bearer ' + user.asana.token
      };

      request(options, function (err, response, projects) {
        projects = JSON.parse(projects).data;
        
        projects.forEach(function (project) {
          if (project.name === 'Amira Anuar') { // replace user.asana.name
            
            user.projectId = project.id;
            user.save();

            options.url = asanaURL + '/projects/' + project.id + '/tasks';
            request(options, function (err, response, tasks) {
              res.send(JSON.parse(tasks).data);
            });
          }
        });        
      });
    });
  });


};