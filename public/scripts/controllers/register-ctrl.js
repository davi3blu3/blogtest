angular.module('myApp')
    .controller('RegisterController', function RegisterController($scope){
    // empty object to hold form data from edit post
    // $scope.editData = {};

    $scope.register = function(){
        console.log('Register submit button pressed');
        console.log('username:', $scope.regUsername);
        console.log('password:', $scope.regPassword);

        // clear form
        $scope.regUsername = '';
        $scope.regPassword = '';
    }
});
