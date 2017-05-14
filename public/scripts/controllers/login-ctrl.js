angular.module('myApp')
    .controller('LoginController', LoginController);
    
function LoginController($scope, $http, $location, $window, $timeout, AuthFactory){

    $scope.error = undefined;
    $scope.message = undefined;

    $scope.checkIsLoggedIn = function() {
        if (AuthFactory.isLoggedIn) {
            return true;
        } else {
            return false;
        }
    }

    $scope.login = function(){

        if (!$scope.loginUsername || !$scope.loginPassword){
            $scope.error = "Please enter your username and password";
        } else {
            //create user object
            var user = {
                username: $scope.loginUsername,
                password: $scope.loginPassword
            };
            // post request
            $http.post('/sitv/loginuser', user)
                .then(function(response) {
                    if (response.data.success){
                        console.log(response);
                        AuthFactory.isLoggedIn = true;
                        // AuthFactory.activeUser = user.username;
                        $window.localStorage.token = response.data.token;
                        $window.localStorage.activeUser = user.username;
                        $scope.message = "You have logged in successfully! Just a moment ...";
                        $scope.error = undefined;
                        $timeout(function(){
                            $location.url('/');
                        }, 1500);
                    } else {
                        console.log(response);
                        $scope.error = "Your account could not be authenticated. Please try again.";
                    }
            }).catch(function(error){
                console.log(error);
                $scope.error = "Your account could not be authenticated. Please try again.";
            })
            // clear form
            $scope.loginUsername = '';
            $scope.loginPassword = '';
        }
    }
};
