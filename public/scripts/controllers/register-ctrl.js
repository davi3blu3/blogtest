angular.module('myApp')
    .controller('RegisterController', function RegisterController($scope, $http){

    $scope.register = function(){

        // create user object
        var user = {
            username: $scope.regUsername,
            password: $scope.regPassword
        };

        // post request
        $http.post('/newuser', user)
            .then(function(response) {
                console.log(response);
        })


        // clear form
        $scope.regUsername = '';
        $scope.regPassword = '';
    }
});
