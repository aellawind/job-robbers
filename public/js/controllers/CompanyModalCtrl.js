app.controller('CompanyModalController', function ($scope, Students) {

  $scope.addNewCompany = function (event, companyName, context) {
    if (event.which === 13) {
      console.log(companyName);
      Students.addNewCompany(companyName)
        .then(function (d) {
          // append the new company to Leads
        });  
      context.companyName = '';    
    }
  };

});