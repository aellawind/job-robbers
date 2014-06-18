app.controller('DragController', function ($scope, Students) {

  Students.fetchTasks()

  //load data into the controller
  .then(function(data){
    $scope.data = data;
  });

  $scope.renderModal = function (task) {
    Students.fetchComments(task)
      .then(function (comments) {
        console.log(comments);
        // render modal body
      });
  }

});
