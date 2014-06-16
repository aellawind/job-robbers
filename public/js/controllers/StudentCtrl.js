app.controller('StudentController', function ($scope, Students) {

  $scope.logout = function () {
    Students.logout();
  };

  $scope.newCompany = function () {
    // do check on company name here
    Students.addNewCompany($scope.companyName);
  }


});