var request         = require('request');
var Authentication  = require('./authentication.js');
var User            = require('../models/User.js');
var utils           = require('../utils/utils.js');

var asanaURL        = 'https://app.asana.com/api/1.0';


module.exports = function (app) {

  /* === FETCH SPECIFIC USER & GRAB TASKS === */
  app.get('/users', function (req, res) {
    User.findOne({ _id: req.user._id }, function (err, user) {
      var options     = {};
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
              if (!user.progress.length) { utils.saveProgress(JSON.parse(tasks).data, user); }
              res.send(JSON.parse(tasks).data);
            });
          }
        });        
      });
    });
  });


  /* === UPDATE TASK TO MOVE TO NEW HEADER === */
  app.post('/user/update', function (req, res) {
    User.findOne({ _id: req.user._id }, function (err, user) {
      if (err) { throw err; }

      // req.body = {
      //   taskId  : current task to be moved
      //   header  : header it transferred to { name: headerName, id: id }
      //   from    : header it came from { name: fromName : id: id }
      // }

      var options = {};
      options.method  = 'POST';
      options.url     = asanaURL + '/tasks/' + req.body.taskId + '/addProject';
      options.headers = { 'Authorization' : 'Bearer ' + user.asana.token }

      var options = {
        method      : 'POST',
        url         : 'https://app.asana.com/api/1.0/tasks/' + req.body.taskId + '/addProject',
        form        : {
          'project'       : user.projectId, // this is the id of the project
          'insert_after'  : req.body.headerId // id of the header/section
        },
        headers     : { 'Authorization' : 'Bearer ' + user.asana.token }
      };

      // .indexOf WILL NOT WORK IT IS AN ARRAY OF OBJECTS
      var from = user.progress.indexOf(req.body.from.name);
      var to   = user.progress.indexOf(req.body.header.name);

      for (var i = from+1 ; i <= to ; i++) {
        options.form = {
          'project'      : user.projectId,
          'insert_after' : user.progress[i].id
        }

        request(options, function (err, httpResponse, body) {
          // do stuff body = { 'data' : {} } on success
        });
      }
    });
  });
};