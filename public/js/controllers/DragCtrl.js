app.controller('DragController', function ($scope, Students) {

  Students.fetchTasks()

  //load data into the controller
  .then(function(data){
    $scope.data = data;
  });

});
