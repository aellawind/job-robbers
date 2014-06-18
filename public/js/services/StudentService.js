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

    console.log(results);
    return results;
  };

  var companyExists = function (companyName) {
    return userCompanies.indexOf(companyName) !== -1  ? true : false;
  };

  var Students = {};

  Students.fetchTasks = function () {
    return $http.get('/users')
      .then(function (d) {
        return parseData(d.data);
      })
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

  Students.updateTask = function (task, headerId) {
    // insert task that's clicked 
    // insert headerId that it was moved to
  };

  Students.fetchComments = function (task) {
    return $http.get('/task/' + task.id + '/comments')
      .then(function (d) {
        console.log(d.data);
        return d.data;
      })
  // data from server
  //   [ { id: 13006538057137,
  //   created_at: '2014-06-10T21:44:01.699Z',
  //   type: 'system',
  //   text: 'added to Amira Anuar',
  //   created_by: { id: 6384579925796, name: 'Ruan Pethiyagoda' } },
  // { id: 13205120369834,
  //   created_at: '2014-06-18T18:40:39.949Z',
  //   created_by: { id: 12515015054286, name: 'Don Mamaril' },
  //   type: 'comment',
  //   text: 'blha blha' },
  // { id: 13205120369835,
  //   created_at: '2014-06-18T18:40:42.623Z',
  //   created_by: { id: 12515015054286, name: 'Don Mamaril' },
  //   type: 'comment',
  //   text: 'blah 2' },
  // { id: 13205120369836,
  //   created_at: '2014-06-18T18:40:46.489Z',
  //   created_by: { id: 12515015054286, name: 'Don Mamaril' },
  //   type: 'comment',
  //   text: 'blha blah 3' },
  // { id: 13205122191204,
  //   created_at: '2014-06-18T18:55:13.323Z',
  //   created_by: { id: 12515015054286, name: 'Don Mamaril' },
  //   type: 'system',
  //   text: 'added the description' } ]
  };

  Students.logout = function () {
    return $http.get('/unlink/asana')
      .then(function () {
        $location.path('/')
      });
  };

  return Students;

});