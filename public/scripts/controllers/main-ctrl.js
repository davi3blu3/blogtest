angular.module('myApp')
    .controller('MainController', function MainController($scope, $http, $window, $location){

    $scope.loadData = function() {
        // Send GET request for all posts, send to view scope
        $http.get('/sitv/posts').then(function(response) {
            $scope.posts = response.data;

            // add readable date to post objects
            $scope.posts.forEach(function(post) {
                // convert JSON back to date object
                var dateObj = new Date(post.createdOn);
                // convert date to readable date string, or time string if today
                var readable = (dateObj.toDateString() == new Date().toDateString())
                    ? dateObj.toLocaleTimeString()
                    : dateObj.toLocaleDateString();
                post.date = readable;
            })
        })
    }
    // Initial function call on page load
    $scope.loadData();

    // handles click event - Edit Button
    $scope.handleEdit = function(postID) {
        // test click working
        console.log('edit clicked for post:', postID);

        // toggle edit modal with correct post information
        $scope.toggleEditModal();
    }

    // handles click event - Delete Button
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
});