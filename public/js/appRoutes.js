app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

	$routeProvider

	.when('/', {
		templateUrl: 'views/home.html'
	})

	.when('/student', {
		templateUrl: 'views/student.html',
		controller: 'StudentController',
		resolve: {
			data: function (Students) {
				return Students.fetchTasks();
			}
		}
	})

	.when('/drag',{
		templateUrl: 'views/drag.html',
		controller: 'DragController'
	})

}]);