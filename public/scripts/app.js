myApp = angular.module('myApp', ['ngRoute', 'ngSanitize', 'ui.router'])
//.config(config).run(run);

myApp.config(function ($httpProvider, $routeProvider, $stateProvider, $urlRouterProvider){
    // $httpProvider.interceptors.push('AuthInterceptor');

    $stateProvider
        .state('mainfeed', {
            url: '/',
            templateUrl: 'templates/feed.html',
            controller: 'MainController',
            access: {
                restricted: false
            }
        })
        .state('register', {
            url: '/register',
            templateUrl: 'templates/register.html',
            controller: 'RegisterController',
            access: {
                restricted: false
            }
        })
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'LoginController',
            access: {
                restricted: false
            }         
        })
        .state('newpost', {
            url: '/newPost',
            templateUrl: 'templates/newPost.html',
            controller: 'PostController',
            access: {
                restricted: true
            }          
        });

    $urlRouterProvider.otherwise('/');
});

myApp.run(function ($rootScope, $state, $transitions, $location, $window, AuthFactory) {


    $transitions.onStart( {}, function(trans){
        // console.log('from state: ' + trans.$from().name);        
        // console.log('to state:   ' + trans.$to().name);
        var nextState = trans.$to().self;
        console.log('token: ' + $window.localStorage.token);
        console.log('logged in: ' + AuthFactory.auth.isLoggedIn);
        console.log(AuthFactory.auth.isLoggedIn);
        // if (nextState.access.restricted && !$window.localStorage.token && !AuthFactory.auth.isLoggedIn) {
        //     event.preventDefault();
        //     $location.path('/');
        //     console.log('state change rejected?');
        // }
        if (nextState.access.restricted) {
            console.log('restricted view');
            //event.preventDefault();
            //$location.path('/');
        }
    });
});
