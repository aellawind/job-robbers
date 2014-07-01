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
    task =  {
      "id":13267637474050,
      "created_at":"2014-06-20T19:20:50.430Z",
      "name":"Activity",
      "notes":"",
      "assignee":null,
      "completed":false,
      "assignee_status":"upcoming",
      "completed_at":null,
      "due_on":null,
      "tags":[],
      "hearted":false,
      "$$hashKey":"010"};
    var instance = $modal.open({
      templateUrl: 'views/modal.html',
      controller: 'ModalController',
      size: '',
      resolve: {
        comments: function (ModalService, $timeout, $q) {
          var prom = $q.defer();
          var data = [
              {
                "id":13267724778070,
                "created_at":"2014-06-20T19:26:43.400Z",
                "created_by":{"id":12515015054241,
                "name":"User"},
                "type":"system",
                "text":"User moved Activity from Stage 1 to Stage 2"
              },
                {
                "id":13267724778070,
                "created_at":"2014-06-20T19:26:43.400Z",
                "created_by":{"id":12515015054241,
                "name":"User"},
                "type":"system",
                "text":"User moved Activity from Stage 2 to Stage 3"
              },
                {
                "id":13267724778070,
                "created_at":"2014-06-20T19:26:43.400Z",
                "created_by":{"id":12515015054241,
                "name":"User"},
                "type":"system",
                "text":"User moved Activity from Stage 3 to Stage 4"
              },
                {
                "id":13267724778070,
                "created_at":"2014-06-20T19:26:43.400Z",
                "created_by":{"id":12515015054241,
                "name":"User"},
                "type":"system",
                "text":"User moved Activity from Stage 4 to Stage 5"
              }
             ];
          $timeout(function(){prom.resolve(data)},1);
          return prom.promise
          .then(function (comments) {
            return [comments, task];
          });
        }
      }
    });
  };



});
