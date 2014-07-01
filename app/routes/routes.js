var request         = require('request');

var Authentication  = require('./authentication.js');
var User            = require('../models/User.js');
var utils           = require('../utils/utils.js');
var asanaAPI        = require('../utils/asanaApiRoutes.js');


module.exports = function (app) {

  /* ==== FETCH SPECIFIC USER & GRAB TASKS ==== */
  app.get('/users', Authentication.check, function (req, res) {
    User.findOne({ _id: req.user._id }, function (err, user) {
      var options     = {};
      options.method  = 'GET';
      options.url     = asanaAPI['projects']();
      options.headers = {
        'Authorization' : 'Bearer ' + user.asana.token
      };

      request(options, function (err, response, projects) {
        projects = JSON.parse(projects).data;
        projects.forEach(function (project) {
          /* ==== PULL CURRENT USER OUT OF HR WORKSPACE ==== */
          if (project.name === user.asana.name) {  
            user.projectId = project.id;
            user.save();
            options.url = asanaAPI['user'](project.id);

            request(options, function (err, response, tasks) {
              if (!user.progress.length) { utils.saveProgress(JSON.parse(tasks).data, user); }
              res.send(JSON.parse(tasks).data);
            });
          }
        });        
      });
    });
  });

  /* ==== UPDATE TASK TO MOVE TO NEW HEADER ==== */
  app.post('/user/update', Authentication.check, function (req, res) {
    User.findOne({ _id: req.user._id }, function (err, user) {
      if (err) { throw err; }

      var data = req.body;

      var options = {};
      options.method  = 'POST';
      options.url     = asanaAPI['addTask'](data.company.id);
      options.headers = { 'Authorization' : 'Bearer ' + user.asana.token }

      /* ==== IF GRAVEYARD, SEND TO GRAVEYARD ==== */
      if (data.dest.name === 'Graveyard') {
        options.form = {
          'project'     : user.projectId,
          'insert_after': user.progress[0].id
        };

        request(options, function (err, httpResponse, body) {
          if (err) { res.send(404); }

          /* ==== SET '$$' AS SECRET CODE FOR JOBCOP PARSER TO INTERPRET AS A SYSTEM MOVEMENT ==== */
          /* ==== Asana API currently does not support system comments when changes are made via their API ==== */
          var text = '$$moved ' + data.company.name + ' from ' + data.origin.name + ' to ' + data.dest.name;
         
          var options2 = {};
          options2.method  = 'POST';
          options2.url     = asanaAPI['fetchOrAddComments'](data.company.id);
          options2.headers = { 'Authorization' : 'Bearer ' + user.asana.token };
          options2.form    = { 'text' : text };

          request(options2, function (err, httpResponse, body) {
            err ? res.send(404) : res.send(200);
          });

        });
      } else {

        /* ==== GRAB INDEX OF FROM & TO RELATIVE TO USER.PROGRESS SCHEMA ==== */
        /* ==== utils/utils.js lines 14-32 ==== */
        var from      = null;
        var to        = null;
        var progress  = user.progress;
        
        for (var i = 0 ; i < progress.length ; i++) {
          if (!from || !to) {
            if (progress[i]['name'] === data.origin.name) { from = i; }
            if (progress[i]['name'] === data.dest.name) { to = i; }
          } else {
            break;
          }
        }

        /* ==== INSERT AFTER EACH PROGRESS FOR ACCURATE SYSSTORY ==== */
        var moveTask = function (index, to) {
          options.form = {
            'project'      : user.projectId,
            'insert_after' : user.progress[index].id
          };

          request(options, function (err, httpResponse, body) {
            if (err) { res.send(err); }
              console.log('##########################################');
              console.log('Currently at: ', user.progress[index].name);
                
            if (index !== to) {
              var text = '$$moved from ' + user.progress[index].name + ' to ' + user.progress[index+1].name;
    
              var options2 = {};
              options2.method  = 'POST';
              options2.url     = asanaAPI['fetchOrAddComments'](data.company.id);
              options2.headers = { 'Authorization' : 'Bearer ' + user.asana.token };
              options2.form    = { 'text' : text };

              request(options2, function (err, httpResponse, body) {
                if (err) { res.send(404); }
                moveTask(index+=1, to);
              });   
            } else {
              res.send(200);
            }
          });
        }
        moveTask(from, to);
      }
    });
  });

  /* ==== FETCH TASK COMMENTS FOR MODAL ==== */
  app.get('/tasks/:taskId/stories', Authentication.check, function (req, res) {
    User.findOne({ _id: req.user._id }, function (err, user) {
      if (err) { throw err; }
      
      var options = {};
      options.method  = 'GET';
      options.url     = asanaAPI['fetchOrAddComments'](req.params.taskId);
      options.headers = { 'Authorization' : 'Bearer ' + user.asana.token };

      request(options, function (err, httpResponse, body) {
        res.send(JSON.parse(body).data);
      });
    });
  });

  /* ==== ADD NEW COMMENT TO TASK ==== */
  app.post('/tasks/:taskId/stories', Authentication.check, function (req, res) {
    User.findOne({ _id: req.user._id }, function (err, user) {
      var options     = {};
      options.method  = 'POST';
      options.url     = asanaAPI['fetchOrAddComments'](req.params.taskId);
      options.headers = { 'Authorization' : 'Bearer ' + user.asana.token };
      options.form    = { 'text' : req.body.comment };

      request(options, function (err, httpResponse, body) {
        err ? res.send(404) : res.send(200);
      });
    });
  });

  /* ==== COMPLETE TASK ==== */
  app.put('/tasks/:taskId', Authentication.check, function (req, res) {
    User.findOne({ _id: req.user._id }, function (err, user) {
      if (err) { res.send(404); }

      var options     = {};
      options.method  = 'PUT';
      options.url     = asanaAPI['completeTask'](req.params.taskId);
      options.headers = { 'Authorization' : 'Bearer ' + user.asana.token };
      options.form    = { 'completed' : 'true' };

      request(options, function (err, httpResponse, body) {
        err ? res.send(404) : res.send(200);
      });
    });
  });

  app.get('*', function (req, res) {
    res.redirect('/');
  })
};