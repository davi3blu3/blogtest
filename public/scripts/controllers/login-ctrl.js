angular.module('myApp')
    .controller('LoginController', LoginController);
    
function LoginController($scope, $http, $location, $window, AuthFactory){

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
                        $window.sessionStorage.token = response.data.token;
                        AuthFactory.isLoggedIn = true;
                        AuthFactory.activeUser = user.username;
                        console.log(AuthFactory.activeUser + ' was logged in successfully');
                        $scope.message = "You have logged in successfully!";
                        $scope.error = undefined;
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
