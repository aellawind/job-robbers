app.controller('DragController', function ($scope, Students) {

  Students.fetchTasks()

  //load data into the controller
  .then(function(data){
    $scope.data = data;
  });

  $scope.renderModal = function (task) {
    Students.fetchComments(task)
      .then(function (d) {
        task['story'] = d.data;
        console.log(task);
        // render modal body
      });
  }

});
