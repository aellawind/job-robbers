app.factory('Students', function ($http, $timeout, $location, $rootScope, $q) {

  var userCompanies = [];

  var parseData = function (tasks) {
    var results = [];
    var index   = 0;

    tasks.forEach(function(task) {
      if (task.name.indexOf(':') !== -1) {
        var taskName = task.name.slice(0, -1);

        results[index] = {
          header   : taskName,
          headerId : task.id,
          subTasks : []
        };

        index++;
      } else {
        if (task.name.length > 0) { 
          results[index-1]['subTasks'].push(task);
          userCompanies.push(task.name.toLowerCase()); 
        }
      }
    });

    Students.tasks = results;
    return results;
  };

  var companyExists = function (companyName) {
    return userCompanies.indexOf(companyName) !== -1  ? true : false;
  };
  
  var Students = {};

  Students.tasks = null;

  Students.fetchTasks = function () {
    // return $http.get('/users')
    //   .then(function (d) {
    //     return parseData(d.data);
    //   })

    var data = 
      [ { header: 'Stage 10', headerId: 13267637474021, subTasks: [] },
        { header: 'Stage 9',
          headerId: 13267637474023,
          subTasks: [ ] },
        { header: 'Stage 8',
          headerId: 13267637474028,
          subTasks: [] },
        { header: 'Stage 7',
          headerId: 13267637474030,
          subTasks: [] },
        { header: 'Stage 6',
          headerId: 13267637474032,
          subTasks: [] },
        { header: 'Stage 5',
          headerId: 13267637474034,
          subTasks: [] },
        { header: 'Stage 4',
          headerId: 13267637474042,
          subTasks: [] },
        { header: 'Stage 3',
          headerId: 13267637474044,
          subTasks: [ ] },
        { header: 'Stage 2',
          headerId: 13267637474046,
          subTasks: 
           [ {"id":13267637474035,
           "created_at":"2014-06-20T19:20:46.029Z",
           "name":"Activity 1",
           "notes":"",
           "assignee":null,
           "completed":true,
           "assignee_status":"upcoming",
           "completed_at":"2014-03-27T21:12:49.096Z",
           "due_on":null,
           "tags":[{"id":8255318982106,"name":"HR Partner"}]},

          {"id":13267637474035,
           "created_at":"2014-06-20T19:20:46.029Z",
           "name":"Activity 2",
           "notes":"",
           "assignee":null,
           "completed":true,
           "assignee_status":"upcoming",
           "completed_at":"2014-03-27T21:12:49.096Z",
           "due_on":null,
           "tags":[{"id":8255318982106,"name":"HR Partner"}]},

           {"id":13267637474035,
           "created_at":"2014-06-20T19:20:46.029Z",
           "name":"Activity 3",
           "notes":"",
           "assignee":null,
           "completed":true,
           "assignee_status":"upcoming",
           "completed_at":"2014-03-27T21:12:49.096Z",
           "due_on":null,
           "tags":[{"id":8255318982106,"name":"HR Partner"}]},

           {"id":13267637474035,
           "created_at":"2014-06-20T19:20:46.029Z",
           "name":"Activity 4",
           "notes":"",
           "assignee":null,
           "completed":true,
           "assignee_status":"upcoming",
           "completed_at":"2014-03-27T21:12:49.096Z",
           "due_on":null,
           "tags":[{"id":8255318982106,"name":"HR Partner"}]},

           {"id":13267637474035,
           "created_at":"2014-06-20T19:20:46.029Z",
           "name":"Activity 5",
           "notes":"",
           "assignee":null,
           "completed":true,
           "assignee_status":"upcoming",
           "completed_at":"2014-03-27T21:12:49.096Z",
           "due_on":null,
           "tags":[{"id":8255318982106,"name":"HR Partner"}]},

           {"id":13267637474035,
           "created_at":"2014-06-20T19:20:46.029Z",
           "name":"Activity 6",
           "notes":"",
           "assignee":null,
           "completed":true,
           "assignee_status":"upcoming",
           "completed_at":"2014-03-27T21:12:49.096Z",
           "due_on":null,
           "tags":[{"id":8255318982106,"name":"HR Partner"}]},

           {"id":13267637474035,
           "created_at":"2014-06-20T19:20:46.029Z",
           "name":"Activity 7",
           "notes":"",
           "assignee":null,
           "completed":true,
           "assignee_status":"upcoming",
           "completed_at":"2014-03-27T21:12:49.096Z",
           "due_on":null,
           "tags":[{"id":8255318982106,"name":"HR Partner"}]},

           {"id":13267637474035,
           "created_at":"2014-06-20T19:20:46.029Z",
           "name":"Activity 8",
           "notes":"",
           "assignee":null,
           "completed":true,
           "assignee_status":"upcoming",
           "completed_at":"2014-03-27T21:12:49.096Z",
           "due_on":null,
           "tags":[{"id":8255318982106,"name":"HR Partner"}]}
           ] },
        { header: 'Stage 1',
          headerId: 13267637474079,
          subTasks: [ 
               {"id":13267637474035,
           "created_at":"2014-06-20T19:20:46.029Z",
           "name":"Activity 9",
           "notes":"",
           "assignee":null,
           "completed":true,
           "assignee_status":"upcoming",
           "completed_at":"2014-03-27T21:12:49.096Z",
           "due_on":null,
           "tags":[{"id":8255318982106,"name":"HR Partner"}]},

           {"id":13267637474035,
           "created_at":"2014-06-20T19:20:46.029Z",
           "name":"Activity 10",
           "notes":"",
           "assignee":null,
           "completed":true,
           "assignee_status":"upcoming",
           "completed_at":"2014-03-27T21:12:49.096Z",
           "due_on":null,
           "tags":[{"id":8255318982106,"name":"HR Partner"}]},

           {"id":13267637474035,
           "created_at":"2014-06-20T19:20:46.029Z",
           "name":"Activity 11",
           "notes":"",
           "assignee":null,
           "completed":true,
           "assignee_status":"upcoming",
           "completed_at":"2014-03-27T21:12:49.096Z",
           "due_on":null,
           "tags":[{"id":8255318982106,"name":"HR Partner"}]},

           {"id":13267637474035,
           "created_at":"2014-06-20T19:20:46.029Z",
           "name":"Activity 12",
           "notes":"",
           "assignee":null,
           "completed":true,
           "assignee_status":"upcoming",
           "completed_at":"2014-03-27T21:12:49.096Z",
           "due_on":null,
           "tags":[{"id":8255318982106,"name":"HR Partner"}]},
            ] } ];

    var prom = $q.defer();
    $timeout(function(){
      prom.resolve(data);
    }, 1);
    return prom.promise;
  };

  Students.addNewCompany = function (companyName) {
    if (!companyExists(companyName.toLowerCase())) {
      var data = {
        companyName : companyName, // input company name
      };

      userCompanies.push(companyName.toLowerCase());
      
      return $http.post('/user/company', data);
    } else {
      alert('Nope');
    }
  };

  Students.logout = function () {
    return $http.get('/unlink/asana')
      .then(function () {
        $location.path('/')
      });
  };

  return Students;

});