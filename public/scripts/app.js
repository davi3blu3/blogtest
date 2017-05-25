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
        var nextState = trans.$to().self;
        if (nextState.access.restricted && !$window.localStorage.token && !AuthFactory.auth.isLoggedIn) {
            event.preventDefault();
            $location.path('/');
            console.log('state change rejected');
        }
    });
});
