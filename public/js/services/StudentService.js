app.factory('Students', function ($http, $timeout, $location, $rootScope, $q) {

  var userCompanies = [];

  var parseData = function (tasks) {
    var results = [];
    var index   = 0;

    tasks.forEach(function(task) {
      if (task.name.indexOf(':') !== -1) {
        var taskName = task.name.slice(0, -1);

        results[index] = {
          header   : taskName,
          headerId : task.id,
          subTasks : []
        };

        index++;
      } else {
        if (task.name.length > 0) { 
          results[index-1]['subTasks'].push(task);
          userCompanies.push(task.name.toLowerCase()); 
        }
      }
    });

    return results;
  };

  var companyExists = function (companyName) {
    return userCompanies.indexOf(companyName) !== -1  ? true : false;
  };

  var Students = {};

  Students.fetchTasks = function () {
    return $http.get('/users')
      .then(function (d) {
        return parseData(d.data);
      })
  };

  Students.addNewCompany = function (companyName) {
    if (!companyExists(companyName.toLowerCase())) {
      var data = {
        companyName : companyName, // input company name
      };

      userCompanies.push(companyName.toLowerCase());
      
      return $http.post('/user/company', data);
    } else {
      alert('Nope');
    }
  };

  Students.updateTask = function (task, headerId) {
    // insert task that's clicked 
    // insert headerId that it was moved to
  };

  Students.logout = function () {
    return $http.get('/unlink/asana')
      .then(function () {
        $location.path('/')
      });
  };

  // Students.fetchTasks();

  return Students;

});