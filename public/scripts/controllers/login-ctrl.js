angular.module('myApp')
    .controller('LoginController', function LoginController($scope, $http){

    $scope.login = function(){

        //create user object
        var user = {
            username: $scope.loginUsername,
            password: $scope.loginPassword
        };

        console.log('returning user:', user);
        // post request
        $http.post('/loginuser', user)
            .then(function(response) {
                console.log(response);
        })

        // clear form
        $scope.loginUsername = '';
        $scope.loginPassword = '';
    }
});
