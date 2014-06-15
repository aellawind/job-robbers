app.factory('Students', function ($http, $location, $rootScope) {

  $rootScope.$emit('change:tasks', function (tasks) {

  });

  var parseData = function (tasks) {
    var results       = [];
    var currentHeader = '';

    tasks.forEach(function(task) {
      if (task.name.indexOf(':') !== -1) {
        currentHeader = task.name;

        results[task.name] = {
          id       : task.id,
          subTasks : []
        };

      } else {
        if (!!task.name.length) { results[currentHeader]['subTasks'].push(task); }
      }
    });

    console.log(results);

  };


  var Students = {};

  Students.fetchTasks = function () {
    $http.get('/users')
      .then(function (d) {
        parseData(d.data);
      })
  };

  Students.logout = function () {
    return $http.get('/unlink/asana')
      .then(function () {
        $location.path('/')
      });
  };

  Students.fetchTasks();

});