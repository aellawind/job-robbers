app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

	$routeProvider

	.when('/', {
		templateUrl: 'views/login.html'
	})

	.when('/home',{
		templateUrl: 'views/home.html',
		controller: 'HomeController'
	})

  .otherwise({
    redirectTo: '/'
  });

}]);