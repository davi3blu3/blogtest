angular.module('myApp')
    .factory('AuthFactory', function(){

        return {
            isLoggedIn: false,
            activeUser: null
        }



    })