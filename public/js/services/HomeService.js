app.factory('Dashboard', function ($http) {

  return {
    fetchProjects: function () {
      return $http.get('/users')
        .success(function () {
          console.log('yes!');
        });
    }
  }

});