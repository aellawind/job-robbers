var Mailgun = require('mailgun-js');
var request = require('request');
var auth    = require('../../config/mailGunAuth.js');
var hr      = require('../../config/hr.js');

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
  app.post('/user/company', function (req, res) {

    User.findOne({ _id: req.user._id }, function (err, user) {
      if (err) { throw err; }
      var options = {
        method      : 'POST',
        url         : 'https://app.asana.com/api/1.0/workspaces/' + hr.workspace + '/tasks',
        form        : {
          'name'          : req.body.companyName,
          'projects[0]'   : user.projectId,
          'followers[0]'  : user._id,
          'followers[1]'  : hr.followers[0].id,
          'followers[2]'  : hr.followers[1].id
        },
        headers     : {
          'Authorization' : 'Bearer ' + user.asana.token
        }
      };

      request(options, function (err, httpResponse, body) {
        notifyHiringTeam(user, req.body.companyName);

        var task = JSON.parse(body).data;
        console.log(task);

        var moveoptions = {
          method: 'POST',
          url : 'https://app.asana.com/api/1.0/tasks/' + task.id + '/addProject',
          form : {
            'project' : user.projectId,
            'insert_after' : user.progress[1].id
          },
          headers: { 'Authorization' : 'Bearer ' + user.asana.token }
        };

        request(moveoptions, function (err, httpResponse, body) {
          console.log(body);
        });

      });
    });
  });


};
