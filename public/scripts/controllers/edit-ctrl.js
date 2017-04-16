angular.module('myApp')
    .controller('EditController', function EditController($routeParams){
    // empty object to hold form data from edit post
    // $scope.editData = {};

    console.log('Params', $routeParams.id);
});
