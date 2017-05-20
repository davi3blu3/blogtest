angular.module('myApp', ['ngRoute', 'ngSanitize', 'ui.router']).config(config).run(run);

function config($httpProvider, $routeProvider, $stateProvider, $urlRouterProvider){
    $httpProvider.interceptors.push('AuthInterceptor');

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
}

function run($rootScope, $location, $window, AuthFactory) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
        if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.localStorage.token && !AuthFactory.isLoggedIn) {
            event.preventDefault();
            $location.path('/');
        }
    })
}