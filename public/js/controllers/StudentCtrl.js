app.controller('StudentController', function ($scope, $rootScope, Students) {


  $rootScope.$on('change:tasks', function (event, tasks) {
    $scope.tasks = tasks;
    console.log($scope.tasks);
    console.log($scope.tasks['Leads']['id'])
  });

  $scope.logout = function () {
    Students.logout();
  };

  $scope.addNewCompany = function () {
    Students.addNewCompany($scope.task, $scope.tasks['Leads']['id'])
      .then(function (d) {
        // append the new company to Leads
      });
  }
});