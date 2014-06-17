app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

	$routeProvider

	.when('/', {
		templateUrl: 'views/home.html',
		controller: 'HomeController'
	})

	.when('/student/:id', {
		templateUrl: 'views/student.html',
		controller: 'StudentController'
	})

	.when('/drag',{
		templateUrl: 'views/drag.html',
		controller: 'DragController'
	})


	$locationProvider.html5Mode(true);
}]);