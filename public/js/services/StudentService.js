app.factory('Students', function ($http, $location, $rootScope) {


  var updateTasks = function (tasks) {
    $rootScope.$emit('change:tasks', tasks);
  };

  var userCompanies = [];

  var parseData = function (tasks) {
    var results       = [];
    var currentHeader = '';

    tasks.forEach(function(task) {
      if (task.name.indexOf(':') !== -1) {
        var taskName = task.name.slice(0, -1);
        currentHeader = taskName

        results[taskName] = {
          id       : task.id,
          subTasks : []
        };
      } else {
        if (task.name.length > 0) { 
          results[currentHeader]['subTasks'].push(task);
          userCompanies.push(task.name.toLowerCase()); 
        }
      }
    });

    updateTasks(results);
  };

  var companyExists = function (companyName) {
    return userCompanies.indexOf(companyName) !== -1  ? true : false;
  };

  var Students = {};

  Students.fetchTasks = function () {
    $http.get('/users')
      .then(function (d) {
        parseData(d.data);
      })
  };

  Students.addNewCompany = function (companyName, headerId) {
    if (!companyExists(companyName.toLowerCase())) {
      var data = {
        companyName : companyName, // input company name
        headerId    : headerId // leads id
      };

      return $http.post('/user/company', data)
    } else {
      alert('Nope');
    }
  };

  Students.logout = function () {
    return $http.get('/unlink/asana')
      .then(function () {
        $location.path('/')
      });
  };

  Students.fetchTasks();

  return Students;

});