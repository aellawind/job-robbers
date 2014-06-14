app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

	$routeProvider

	.when('/', {
		templateUrl: 'views/home.html',
		controller: 'HomeController'
	})

	.when('/student/:id', {
		templateUrl: 'views/student.html',
		controller: 'StudentController',
		resolve: {
			data: function (Students) {
				return Students.fetchProjects()
					.then(function (d) {
						return d.data;
					});
			}
		}
	})


	$locationProvider.html5Mode(true);
}]);