app.controller('HomeController', function ($scope, $modal, Students, statusOrder, HomeService) {

  $scope.undoLast = HomeService.undoLast;


  Students.fetchTasks()
    .then(function(data){
      var obj;
      
      for (var i = 0; i<data.length; i++){
        obj = data[i];
        if (statusOrder[obj.header]){
          obj.statusOrder = statusOrder[obj.header];
        } else {
          obj.statusOrder = undefined;
        }
      }

      data.sort(function(a,b){
        return a.statusOrder - b.statusOrder;
      });
      $scope.data = data;
    });

  $scope.renderModal = function (task) {
    var instance = $modal.open({
      templateUrl: 'views/modal.html',
      controller: 'ModalController',
      size: '',
      resolve: {
        comments: function (ModalService) {
          return ModalService.fetchComments(task)
          .then(function (comments) {
            return [comments, task];
          });
        }
      }
    });
  };



});
