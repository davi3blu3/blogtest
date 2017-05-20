angular.module('myApp')
    .controller('MainController', function MainController($scope, $http, $window, AuthFactory){

    $scope.loadData = function() {
        // Send GET request for all posts, send to view scope
        $http.get('/sitv/posts').then(function(response) {
            $scope.posts = response.data;

            // add readable date to post objects
            $scope.posts.forEach(function(post) {
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

    // handles click event - Delete Button
    $scope.handleDelete = function(postID) {
        // Send DELETE request for specified post and remove from view
        $http.delete('/sitv/posts/' + postID).then(function(response){
            for (i = 0; i < $scope.posts.length; i++) {
                if ($scope.posts[i]._id == postID) {
                    $scope.posts.splice( i, 1 );
                }
            }
        })
    }

    // control edit/delete buttons visiblity - only to post author
    $scope.isAuthor = function(user) {
        if (user == $window.localStorage.activeUser) return true;
        return false;
    }

    return $scope;
});