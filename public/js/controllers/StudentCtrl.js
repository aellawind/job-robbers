app.controller('StudentController', function ($scope, Students) {

  $scope.logout = function () {
    Students.logout();
  };

});