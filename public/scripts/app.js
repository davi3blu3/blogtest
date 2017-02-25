angular.module('myApp', []).controller('MyController', MyController);

function MyController($scope, $http){

    // Send GET request for all posts, send to view scope
    $http.get('/posts').then(function(response) {
        $scope.posts = response.data;
        console.log($scope.posts);
    })

    // handles click event of delete button
    $scope.handleDelete = function(postID) {
        
        // Send DELETE request for specified post
        $http.delete('/posts/' + postID).then(function(response){
            console.log(response.status);

            // remove deleted row from view
            for (i = 0; i < $scope.posts.length; i++) {
                if ($scope.posts[i]._id == postID) {
                    console.log('delete post', $scope.posts[i]._id);
                    $scope.posts.splice( i, 1 );
                }
            }
        })

    }
}

