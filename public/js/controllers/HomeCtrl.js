app.controller('HomeController', function($scope, Dashboard, $http) {

  $scope.fetchProjects = function () {
    Dashboard.fetchProjects();
  };

  $scope.newCompany = function () {
    // $http.post(path, data);
    $http.post('/user/company', { companyName: $scope.companyName})
  }
});