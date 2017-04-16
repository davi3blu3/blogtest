angular.module('myApp', ['ngRoute'])
    // .config(config)
    // .controller('MyController', MyController);

.config(function($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl: '../templates/feed.html',
        controller: 'MyController'
    })
    .when('/register', {
        templateUrl: '../templates/register.html',
        controller: 'MyController'
    })
    .when('/newPost', {
        templateUrl: '../templates/newPost.html',
        controller: 'MyController'
    })
    .when('/editPost/', {
        templateUrl: '../templates/editPost.html',
        controller: 'EditController'
    })
    .when('/deletePost', {
        templateUrl: '../templates/deletePost.html',
        controller: 'MyController'
    })
})
