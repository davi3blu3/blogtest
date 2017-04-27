angular.module('myApp')
    .factory('AuthFactory', function(){
        
        return {
            auth: auth
        }

        var auth = {
            isLoggedIn: false
        };

    })