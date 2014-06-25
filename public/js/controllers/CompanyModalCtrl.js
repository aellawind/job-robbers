app.controller('CompanyModalController', function ($scope, Students) {

  $scope.addNewCompany = function () {
    Students.addNewCompany($scope.companyName)
      .then(function (d) {
        // append the new company to Leads
      });
  };

});