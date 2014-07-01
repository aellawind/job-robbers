app.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('login', {
      url:'/login',
      templateUrl: 'views/login.html',
    })

    .state('home', {
    	url: '/home',
    	templateUrl: 'views/home.html',
    	controller: 'HomeController',
        resolve: {
            delay: function($timeout, $q){
                var prom = $q.defer();
                $timeout(function(){
                    prom.resolve();
                }, 1000);
                return prom.promise;
            }
        }
    })

    .state('404', {
        url: '/404',
        templateUrl: 'views/404.html'
    })

    $urlRouterProvider.otherwise('/login');
});
