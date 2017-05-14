angular.module('myApp').factory('AuthInterceptor', AuthInterceptor);

function AuthInterceptor($location, $q, $window, AuthFactory) {
    return {
        request: request,
        response: response,
        responseError: responseError
    };

    function request(config){
        config.headers = config.headers || {};
        if ($window.localStorage.token) {
            config.headers.Authorization = 'Bearer ' + $window.localStorage.token;
        }
        return config;
    }

    function response(response){
        if (response.status === 200 && $window.localStorage.token && !AuthFactory.isLoggedIn){
            AuthFactory.isLoggedIn = true;
        }
        if (response.status === 401) {
            AuthFactory.isLoggedIn = false;
        }
        return response || $q.when(response);
    }

    function responseError(rejection){
        if (rejection.status === 401 || rejection.status === 403) {
            delete $window.localStorage.token;
            AuthFactory.isLoggedIn = false;
            $location.path('/');
        }
        return $q.reject(rejection);
    }
}