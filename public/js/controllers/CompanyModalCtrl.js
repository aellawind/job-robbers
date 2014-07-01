app.controller('CompanyModalController', function ($scope, Students) {

  $scope.addNewCompany = function (event, companyName, context) {
    if (event.which === 13) {
      Students.addNewCompany(companyName)
        .then(function (d) {
          // how to close modal and refresh data
        });  
      context.companyName = '';  
    }
  };

});