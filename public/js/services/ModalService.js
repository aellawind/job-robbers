app.factory('ModalService', function ($http) {

  var ModalService = {};


  // due to Asana API not automatically detecting API changes as system stories,
  // $$ is used by dashboard && student parsers to classify comments as such
  var parseSysStory = function (comments) {
    
    comments.forEach(function (comment) {
      (comment['text'].substr(0, 2) === '$$'       || 
       comment['text'].substr(0, 8) === 'added to' || 
       comment['text'] === 'completed this task')     ? comment['type'] = 'system' : comment['type'] = 'comment'; 

      if (comment['text'].substr(0, 2) === '$$') { comment['text'] = comment['text'].slice(2); }
    });
    return comments;
  };

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
        return parseSysStory(d.data);
      });
  };

  return ModalService;
});