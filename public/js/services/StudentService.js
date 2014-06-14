app.factory('Students', function ($http) {

  return: {
    fetchCompanies: function (userId) {
      return $http.get('/api/user/' + userId + '/tasks/')
        .success(function (d) {
          return d;
        });
    }
  }
});