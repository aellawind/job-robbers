var request = require('request');

var asanaURL        = 'https://app.asana.com/api/1.0';

var fetchTasks = function (err, response, body) {
  console.log(JSON.parse(body));
};


var asanaUtils = {};

asanaUtils.fetchProject = function (err, response, body, options, user) {
  body = JSON.parse(body);
  body.data.forEach(function (project) {
    if (project.name === 'Amira Anuar') { // replace with user.asana.name
      options.url = asanaURL + '/projects/' + project.id + '/tasks';
      request(options, function (err, response, body) {
        console.log(JSON.parse(body));
      });
    }
  });
};

module.exports = asanaUtils;