var request         = require('request');
var Authentication  = require('./authentication.js');
var User            = require('../models/User.js');

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

      request(options, function (err, response, projects) {
        projects = JSON.parse(projects).data;
        projects.forEach(function (project) {
          if (project.name === 'Amira Anuar') { // replace user.asana.name
            options.url = asanaURL + '/projects/' + project.id + '/tasks';
            request(options, function (err, response, tasks) {
              console.log(JSON.parse(tasks).data);
              res.send(JSON.parse(tasks).data);
            });

            // CODE TO MOVE TASKS AROUND
            var task = {
              id: '13138328574644' //this is the task id you want to move
            };
            var moveoptions = {};
            moveoptions.url = asanaURL + '/tasks/' + task.id + '/addProject';
            moveoptions.method = 'POST';
            moveoptions.form = {
              'project': '12864528848743', // this is the id of the project
              'insert_after': '12996935464425' // this is the id of the header/section
            }
            moveoptions.headers = {
              'Authorization' : 'Bearer ' + user.asana.token
            };
            request(moveoptions, function(err,response,c) {
              console.log('err',err,'response',c); //you will get an empty response that looks like {"data":{}}
            });
          }
        });        
      });
    });
  });

};