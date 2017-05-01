angular.module('myApp')
    .controller('RegisterController', function RegisterController($scope, $http, $sanitize){

    $scope.error = undefined;
    $scope.message = undefined;
    $scope.register = function(){
        // create user object
        var user = {
            username: $scope.regUsername,
            password: $scope.regPassword
        };
        // basic validation
        if (!$scope.regUsername || !$scope.regPassword){
            $scope.error = "Please create a username and a password";
        } else {
            if ($scope.regPassword !== $scope.regPasswordRepeat){
                $scope.error = "Passwords do not match";
                clearRegInput();
            } else {
                // post request
                $http.post('/sitv/newuser', user)
                    .then(function(response) {
                        $scope.error = undefined;
                        $scope.message = "Registered successfully! Please <a href='#/login'>login</a>.";
                        clearRegInput();
                })
            }
        }
    }

    clearRegInput = function(){
        $scope.regUsername = '';
        $scope.regPassword = '';
        $scope.regPasswordRepeat = '';
    }
});
