app.controller('StudentController', function ($scope, $rootScope, Students) {


  $rootScope.$on('change:tasks', function (event, tasks) {
    $scope.tasks = tasks;
    console.log($scope.tasks);
  });

  $scope.logout = function () {
    Students.logout();
  };

  $scope.addNewCompany = function () {
    // do check on company name here
    Students.addNewCompany($scope.companyName)
      .then(function (d) {
        // append the new company to Leads
      });
  }


});