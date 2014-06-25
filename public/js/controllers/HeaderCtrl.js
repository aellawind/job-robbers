app.controller('HeaderController', function ($scope, $modal, Students) {

  $scope.logout = function () {
    Students.logout();
  };

  $scope.renderCompanyModal = function () {
    var instance = $modal.open({
      templateUrl: 'views/company.html',
      controller: 'CompanyModalController'
    });
  };
});