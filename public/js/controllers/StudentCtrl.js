app.controller('StudentController', function ($scope, $rootScope, Students) {

  $scope.logout = function () {
    Students.logout();
  };

  $scope.addNewCompany = function () {
    Students.addNewCompany($scope.companyName)
      .then(function (d) {
        // append the new company to Leads
      });
  }
});