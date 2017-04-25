angular.model('myApp')
    .factory('AuthInterceptor', function($window){

        return {
            request: request,
            response: response,
            responseError: responseError
        }

        function request(config){
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
            }
        }

        function response(response){
            
        }

        function responseError(rejection){
            
        }        

    })