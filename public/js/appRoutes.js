app.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('login', {
      url:'/login',
      templateUrl: 'views/login.html',
    })

    .state('drag', {
    	url: '/drag',
    	templateUrl: 'views/drag.html',
    	controller: 'DragController'
    })

    .state('company', {
    	url: '/student',
    	templateUrl: 'views/student.html',
    	controller: 'StudentController'
    });

    $urlRouterProvider.otherwise('/login');
});
