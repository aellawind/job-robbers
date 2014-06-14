app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

	$routeProvider.when('/', {
		templateUrl: 'views/home.html',
		controller: 'HomeController'
	})

	.when('/home/:id', {
		templateUrl: 'views/listings.html',
		controller: 'ListingsController',
		resolve: {
			app: function ($route, User) {
				return User.fetch($route.current.params.id);
			}
		}
	})

	.when('/groups', {
		templateUrl: 'views/groups.html',
		controller: 'GroupsController'
	})

	.when('/listings', {
		templateUrl: 'views/listings.html',
		controller: 'ListingsController'
	});

	$locationProvider.html5Mode(true);
}]);