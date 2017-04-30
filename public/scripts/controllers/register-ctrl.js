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

        if (!$scope.regUsername || !$scope.regPassword){
            $scope.error = "Please create a username and a password";
        } else {
            if ($scope.regPassword !== $scope.regPasswordRepeat){
                $scope.error = "Passwords do not match"
            } else {

                // post request
                $http.post('/sitv/newuser', user)
                    .then(function(response) {
                        console.log(response);
                        $scope.message = "Registered successfully! Please <a href='#'>login</a>.";
                        $scope.error = undefined;
                })

                // clear form
                $scope.regUsername = '';
                $scope.regPassword = '';
                $scope.regPasswordRepeat = '';

            }
        }


    }
});
