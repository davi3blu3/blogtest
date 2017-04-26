angular.module('myApp', ['ngRoute'])

.config(function($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl: '../templates/feed.html',
        controller: 'MainController'
    })
    .when('/register', {
        templateUrl: '../templates/register.html',
        controller: 'RegisterController'
    })
    .when('/login', {
        templateUrl: '../templates/login.html',
        controller: 'LoginController'
    })
    .when('/newPost', {
        templateUrl: '../templates/newPost.html',
        controller: 'PostController'
    })
    .when('/editPost/', {
        templateUrl: '../templates/editPost.html',
        controller: 'EditController'
    })
    .when('/deletePost', {
        templateUrl: '../templates/deletePost.html',
        controller: 'MainController'
    })
    .otherwise({
        redirectTo: '/'
    })
})
