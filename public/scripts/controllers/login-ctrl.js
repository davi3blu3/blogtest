angular.module('myApp')
    .controller('LoginController', function LoginController($scope, $http){

    console.log('login controller loaded!');

    $scope.login = function(){
        console.log('login submit pressed!');
    
        //create user object
        var user = {
            username: $scope.loginUsername,
            password: $scope.loginPassword
        };

        console.log('returning user:', user);
        // // post request
        // $http.post('/newuser', user)
        //     .then(function(response) {
        //         console.log(response);
        // })


        // clear form
        $scope.loginUsername = '';
        $scope.loginPassword = '';
    }
});
