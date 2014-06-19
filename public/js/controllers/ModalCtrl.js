app.controller('ModalController', function ($scope, Students, comments) {
  $scope.task     = comments[1];
  $scope.comments = comments[0];

  $scope.addComment = function (keyEvent, comment) {
    if (keyEvent.which === 13) { 
      return Students.addComment($scope.task, comment);
    }
  };



});