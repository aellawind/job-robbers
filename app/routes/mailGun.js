var Mailgun         = require('mailgun-js');
var request         = require('request');
var auth            = require('../../config/mailGunAuth.js');
var Authentication  = require('./authentication.js');
var asanaApi        = require('../utils/asanaApiRoutes.js');

var User    = require('../models/User.js');

var mailgun = new Mailgun({apiKey: auth.api_key, domain: auth.domain});

var notifyHiringTeam = function (user, companyName) {
  var msgData = {};

  msgData.from    = 'Job Robbers <noreply.student.dashboard@jobrobbers.com>';
  msgData.to      = "Don <mamarildon@gmail.com>, Amira <aellawind@gmail.com>";
  msgData.subject = user.asana.name + ' has added ' + companyName + ' to their job search!'
  msgData.text    = "Beautiful Hiring Team,\n\n" +
                    "Please follow up with " + user.asana.name + 
                    ". They have added " + companyName + " to their leads."; 

  mailgun.messages().send(msgData, function (error, body) {
    console.log(body);
  });
};

module.exports = function (app) {

  // ADD NEW COMPANY AND INSERT INTO LEADS
  app.post('/user/company', Authentication.check, function (req, res) {
    User.findOne({ _id: req.user._id }, function (err, user) {
      if (err) { throw err; }
      var options     = {}
      options.method  = 'POST';
      options.url     = asanaApi['addCompany']();
      options.headers = { 'Authorization' : 'Bearer ' + user.asana.token };
      options.form    = {
        'name'          : req.body.companyName,
        'projects[0]'   : user.projectId,
        'followers[0]'  : user._id,
        'followers[1]'  : asanaApi.followers[0].id,
        'followers[2]'  : asanaApi.followers[1].id
      };

      request(options, function (err, httpResponse, body) {
        // SEND NOTIFICATION E-MAIL TO HIRING TEAM 
        // notifyHiringTeam(user, req.body.companyName);
        console.log(JSON.parse(body))
        var task = JSON.parse(body).data;

        var moveOptions     = {};
        moveOptions.method  = 'POST';
        moveOptions.url     = asanaApi['addTask'](task.id);
        moveOptions.headers = { 'Authorization' : 'Bearer ' + user.asana.token };
        moveOptions.form    = {
          'project'      : user.projectId,
          'insert_after' : user.progress[1].id          
        };

        request(moveOptions, function (err, httpResponse, response) {
          res.send(200);
        });
      });
    });
  });


};
