app.controller('StudentController', function ($scope, Students) {
 
   $scope.fetchProjects = function () {
    Students.fetchProjects();
  };

  $scope.logout = function () {
    Students.logout();
  };

});