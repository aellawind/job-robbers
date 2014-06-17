app.controller('StudentController', function ($scope, $rootScope, Students) {


  $rootScope.$on('change:tasks', function (event, tasks) {
    $scope.tasks = tasks;
    console.log($scope.tasks);
  });

  $scope.logout = function () {
    Students.logout();
  };

  $scope.addNewCompany = function () {
    Students.addNewCompany($scope.companyName, $scope.tasks['Leads']['id'])
      .then(function (d) {
        // append the new company to Leads
      });
  }
});