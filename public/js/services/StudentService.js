app.factory('Students', function ($http, $location) {

  return {
    fetchCompanies: function (userId, projectId) {
      return $http.get('/api/user/' + userId + 'projects/' + projectId + '/tasks/')
        .success(function (d) {
          return d;
        });
    },

    fetchProjects: function ($) {
      return $http.get('/users')
        .success(function () {
          console.log('yes!');
        });
    },

    logout: function () {
      return $http.get('/unlink/asana')
        .success(function () {
          $location.path('/');
        });
    }
  };

});