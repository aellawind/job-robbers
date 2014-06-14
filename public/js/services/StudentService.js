app.factory('Students', function ($http, $location) {

  return {
    fetchTasks: function ($) {
      return $http.get('/users');
    },

    logout: function () {
      return $http.get('/unlink/asana')
        .success(function () {
          $location.path('/') ;
        });
    }
  };

});