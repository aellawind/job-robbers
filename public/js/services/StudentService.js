app.factory('Students', function ($http) {

  return: {
    fetchCompanies: function (userId, projectId) {
      return $http.get('/api/user/' + userId + 'projects/' + projectId + '/tasks/')
        .success(function (d) {
          return d;
        });
    }
  }
});