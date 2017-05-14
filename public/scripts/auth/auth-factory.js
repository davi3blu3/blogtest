angular.module('myApp').factory('AuthFactory', AuthFactory);

function AuthFactory(){
    var auth = {
        isLoggedIn: false,
        activeUser: null
    }
    return {
        auth: auth
    };
}