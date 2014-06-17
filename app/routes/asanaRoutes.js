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

     /* ==== EXPECTED REQ.BODY TO GO WITH POST REQUEST TO /USER/UPDATE ==== 
      *
      *  req.body = {
      *    taskId  : current task to be moved
      *    header  : header it transferred to { name: headerName, id: id }
      *    from    : header it came from { name: fromName : id: id }
      *  }  
      */

      /* ==== DECLARE OPTIONS FOR REQUEST ==== */
      var options = {};
      options.method  = 'POST';
      options.url     = asanaURL + '/tasks/' + req.body.taskId + '/addProject';
      options.headers = { 'Authorization' : 'Bearer ' + user.asana.token }

      /* ==== IF GRAVEYARD, NO NEED TO ITERATE ==== */
      if (req.body.header.name === 'Graveyard') {
        options.form = {
          'project'     : user.projectId,
          'insert_after': user.progress[0].id
        };
        
        request(options, function (err, httpResponse, body) {
          // do stuff body = { 'data' : {} } on success
        });
      } else {
        /* ==== GRAB INDEX OF FROM & TO ==== */
        var from      = null;
        var to        = null;
        var progress  = user.progress;
        
        for (var i = 0 ; i < progress.length ; i++) {
          if (!from || !to) {
            if (progress[i][name] === req.body.from.name) { from = i; }
            if (progress[i][name] === req.body.header.name) { to = i; }          
          } else {
            break;
          }
        }

        /* ==== INSERT AFTER EACH PROGRESS FOR ACCURATE SYSSTORY ==== */
        for (var i = from+1 ; i <= to ; i++) {
          options.form = {
            'project'      : user.projectId,
            'insert_after' : user.progress[i].id
          };

          request(options, function (err, httpResponse, body) {
            // do stuff body = { 'data' : {} } on success
          });
        } 
      }
    });
  });
};