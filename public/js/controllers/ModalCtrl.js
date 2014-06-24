app.controller('ModalController', function ($scope, ModalService, comments) {
  $scope.task     = comments[1];
  $scope.comments = comments[0];

  $scope.addComment = function (keyEvent, comment) {
    if (keyEvent.which === 13) { 
      return ModalService.addComment($scope.task, comment);
    }
  };

  $scope.taskCompleted = function (task) {
    return ModalService.taskCompleted(task);
  };

});