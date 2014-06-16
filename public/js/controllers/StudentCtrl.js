app.controller('StudentController', function ($scope, Students) {

  $scope.logout = function () {
    Students.logout();
  };

  $scope.newCompany = function () {
    // $http.post(path, data);
    $http.post('/user/company', { companyName: $scope.companyName})
  }


});