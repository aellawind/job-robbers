var Mailgun = require('mailgun-js');
var auth    = require('../../config/mailGunAuth.js');

var User    = require('../models/User.js');

var mailgun = new Mailgun({apiKey: auth.api_key, domain: auth.domain});

var notifyHiringTeam = function (user, companyName) {
  var msgData = {};

  msgData.from    = 'Job Robbers <noreply.student.dashboard@jobrobbers.com>';
  msgData.to      = "Don <mamarildon@gmail.com>, Amira <aellawind@gmail.com>";
  msgData.subject = user.asana.name + ' has added ' + companyName + ' to their job search!'
  msgData.text    = "Beautiful Hiring Team,\n\n" +
                    "Please follow up with " + user.asana.name + 
                    ". They have added " + companyName + "to their leads."; 

  mailgun.messages().send(msgData, function (error, body) {
    console.log(body);
  });
};

module.exports = function (app) {
  app.post('/user/company', function (req, res) {

    User.findOne({ _id: req.params.userId }, function (err, user) {
      if (err) { throw err; }

      notifyHiringTeam(user, req.body.companyName);

      var options = {
        method      : 'POST',
        url         : 'https://app.asana.com/api/1.0/tasks' + req.body.companyId + '/addProject',
        form        : {
          'project'       : user.projectId, // this is the id of the project
          'insert_after'  : req.body.headerId // id of the header/section
        },
        headers     : {
          'Authorization' : 'Bearer ' + user.asana.token
        }
      };

      request(moveoptions, function(err,httpResponse,body) {
        // do stuff body = { 'data' : {} } on success
      });
    });
  });

};
