app.controller('ModalController', function ($scope, ModalService, comments) {
  $scope.task       = comments[1];
  $scope.comments   = comments[0];
  $scope.checked    = $scope.task.completed;

  $scope.addComment = function (keyEvent, comment, context) {
    if (keyEvent.which === 13) { 
      ModalService.addComment($scope.task, comment)
        .then(function (d) {
          ModalService.fetchComments($scope.task)
            .then(function (d) {
              $scope.comments = d;
            })
        });
      context.commentAdd = '';
    }
  };

  $scope.taskCompleted = function (task) {
    return ModalService.taskCompleted(task);
  };

});