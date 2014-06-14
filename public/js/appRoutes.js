app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

	$routeProvider

	.when('/', {
		templateUrl: 'views/home.html',
		controller: 'HomeController'
	})

	.when('/student/:id', {
		templateUrl: 'views/student.html',
		controller: 'StudentController',
		resolve : {
			fetchTasks: function (Students) {
				Students.fetchTasks()
					.then(function (d) {
						console.log(d.data, 'from');
					});
			}
		}
	})


	$locationProvider.html5Mode(true);
}]);