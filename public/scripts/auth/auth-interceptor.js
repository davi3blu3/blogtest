angular.module('myApp').factory('AuthInterceptor', AuthInterceptor);

function AuthInterceptor($location, $q, $window, AuthFactory) {
    console.log('interceptor triggered');
    return {
        request: request,
        response: response,
        responseError: responseError
    };

    function request(config){
        // if JWT exists, it add to config headers
        config.headers = config.headers || {};
        if ($window.localStorage.token) {
            config.headers.Authorization = 'Bearer ' + $window.localStorage.token;
        }
        return config;
    }

    function response(response){
        // permit login if JWT checks out and not already logged in
        if (response.status === 200 && $window.localStorage.token && !AuthFactory.auth.isLoggedIn){
            AuthFactory.auth.isLoggedIn = true;
        }
        if (response.status === 401) {
            AuthFactory.auth.isLoggedIn = false;
        }
        return response || $q.when(response);
    }

    function responseError(rejection){
        // handle JWT not accepted
        if (rejection.status === 401 || rejection.status === 403) {
            delete $window.localStorage.token;
            AuthFactory.auth.isLoggedIn = false;
            $location.path('/');
        }
        return $q.reject(rejection);
    }
}