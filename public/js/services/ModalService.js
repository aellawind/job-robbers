app.factory('ModalService', function ($http) {

  var ModalService = {};

  ModalService.addComment = function (task, comment) {
    return $http.post('/tasks/' + task.id + '/stories', { comment: comment });
  };

  ModalService.taskCompleted = function (task) {
    if (!task.completed) {
      return $http.put('/tasks/' + task.id)
        .then(function () {
          ModalService.fetchComments(task);
        });
    }
  };

  ModalService.fetchComments = function (task) {
    return $http.get('/tasks/' + task.id + '/stories')
      .then(function (d) {
        return d.data;
      });
  };

  return ModalService;
});