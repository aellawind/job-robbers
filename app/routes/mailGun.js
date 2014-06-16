var Mailgun = require('mailgun-js');
var auth    = require('../../config/mailGunAuth.js');

var User    = require('../models/User.js');

var mailgun = new Mailgun({apiKey: auth.api_key, domain: auth.domain});

var notifyHiringTeam = function (user, companyName) {
  var msgData = {};

  msgData.from    = 'Job Robbers <noreply.student.dashboard@jobrobbers.com>';
  msgData.to      = "Don <mamarildon@gmail.com>, Amira <aellawind@gmail.com>";
  msgData.subject = user.asana.name + ' has added ' + companyName + ' to their job search!'
  msgData.html    = "Beautiful Hiring Team," +
                    "Please follow up with " + user.asana.name + ". They have added " + companyName +
                    " and we do not have an existing relationship with them."; 

  mailgun.messages().send(msgData, function (error, body) {
    console.log(body);
  });
};

module.exports = function (app) {
  // query database for company
  // if not found create new task in asana
    // then save to company db
    // then email hiring team
  // else serve task id

  app.get('/addCompany/:companyName', function (req, res) {

    User.findOne({ _id: req.user._id }, function (err, user) {
      if (err) { throw err; }

      if (user.companies.indexOf(req.params.companyName) === -1) {
        notifyHiringTeam(user, req.params.companyName);

        // do asana api task add

      } else {
        // company already exists in users task
      }

    });


  });

};
