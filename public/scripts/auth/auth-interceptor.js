angular.module('myApp').factory('AuthInterceptor', AuthInterceptor);

function AuthInterceptor($location, $q, $window, AuthFactory) {
    return {
        request: request,
        response: response,
        responseError: responseError
    };

    function request(config){
        // check request headers for JWT
        config.headers = config.headers || {};
        if ($window.localStorage.token) {
            config.headers.Authorization = 'Bearer ' + $window.localStorage.token;
        }
        return config;
    }

    function response(response){
        // permit login if JWT checks out and not already logged in
        if (response.status === 200 && $window.localStorage.token && !AuthFactory.isLoggedIn){
            AuthFactory.isLoggedIn = true;
        }
        if (response.status === 401) {
            AuthFactory.isLoggedIn = false;
        }
        return response || $q.when(response);
    }

    function responseError(rejection){
        // handle JWT not accepted
        if (rejection.status === 401 || rejection.status === 403) {
            delete $window.localStorage.token;
            AuthFactory.isLoggedIn = false;
            $location.path('/');
        }
        return $q.reject(rejection);
    }
}