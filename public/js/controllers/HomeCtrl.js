app.controller('HomeController', function($scope, Dashboard) {

  $scope.fetchProjects = function () {
    Dashboard.fetchProjects();
  };

  $scope.logout = function () {
    Dashboard.logout();
  };
  
});