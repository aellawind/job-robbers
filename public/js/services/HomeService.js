app.factory('Dashboard', function ($http) {

  return {
    fetchProjects: function () {
      return $http.get('/users')
        .success(function () {
          console.log('yes!');
        });
    },

    logout: function () {
      return $http.get('/unlink/asana')
        .success(function () {
          alert("logged out");
        })
    }
  };


});