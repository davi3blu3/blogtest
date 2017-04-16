angular.module('myApp', ['ngRoute'])
    // .config(config)
    // .controller('MyController', MyController);

.config(function($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl: '../templates/feed.html',
        controller: 'MainController'
    })
    .when('/register', {
        templateUrl: '../templates/register.html',
        controller: 'MainController'
    })
    .when('/login', {
        templateUrl: '../templates/login.html',
        controller: 'MainController'
    })
    .when('/newPost', {
        templateUrl: '../templates/newPost.html',
        controller: 'MainController'
    })
    .when('/editPost/', {
        templateUrl: '../templates/editPost.html',
        controller: 'EditController'
    })
    .when('/deletePost', {
        templateUrl: '../templates/deletePost.html',
        controller: 'MainController'
    })
})
