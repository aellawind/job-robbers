app.controller('ModalController', function ($scope, ModalService, comments) {
  $scope.task       = comments[1];
  $scope.comments   = comments[0];

  $scope.addComment = function (keyEvent, comment, context) {
    if (keyEvent.which === 13) { 
      ModalService.addComment($scope.task, comment);
      context.commentAdd = '';
    }
  };

  $scope.taskCompleted = function (task) {
    return ModalService.taskCompleted(task);
  };

});