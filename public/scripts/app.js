angular.module('myApp', []).controller('MyController', MyController);

function MyController($scope, $http){

    $http.get('/posts').then(function(response) {
        $scope.posts = response.data;
        console.log($scope.posts);
    })

    $scope.handleDelete = function(postID) {
        console.log('Delete Clicked!', postID);

        $http.delete('/posts/' + postID).then(function(response){
            console.log(response.status);
            // $scope.$apply();
        })

    }
}

