app.controller('DragController', function ($scope, $modal, Students, statusOrder) {

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
      console.log($scope.data);
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
