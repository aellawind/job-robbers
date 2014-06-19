app.controller('DragController', function ($scope, $modal, Students) {

  Students.fetchTasks()
    .then(function(data){
      $scope.data = data;
    });

  $scope.renderModal = function (task) {
    var instance = $modal.open({
      templateUrl: 'views/modal.html',
      controller: 'ModalController',
      size: '',
      resolve: {
        comments: function (Students) {
          return Students.fetchComments(task)
          .then(function (comments) {
            return [comments, task];
          });
        }
      }
    });
  };



});
