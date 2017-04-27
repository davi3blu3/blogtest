angular.module('myApp')
    .controller('LoginController', function LoginController($scope, $http, $location, $window, AuthFactory){

    $scope.checkIsLoggedIn = function() {
        if (AuthFactory.isLoggedIn) {
            return true;
        } else {
            return false;
        }
    }

    $scope.login = function(){

        if ($scope.loginUsername && $scope.loginPassword){
            //create user object
            var user = {
                username: $scope.loginUsername,
                password: $scope.loginPassword
            };
            // post request
            $http.post('/sitv/loginuser', user)
                .then(function(response) {
                    if (response.data.success){
                        $window.sessionStorage.token = response.data.token;
                        AuthFactory.isLoggedIn = true;
                    }
            }).catch(function(error)){
                console.log(error);
            }

            // clear form
            $scope.loginUsername = '';
            $scope.loginPassword = '';
        }
    }



    $scope.logout = function() {
        // handle logout
        AuthFactory.isLoggedIn = false;
        delete $window.sessionStorage.token;
        $location.path('/');
    }
});
