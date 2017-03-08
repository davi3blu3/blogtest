angular.module('myApp', []).controller('MyController', MyController);

function MyController($scope, $http, $window){

    $scope.loadData = function() {
        // Send GET request for all posts, send to view scope
        $http.get('/posts').then(function(response) {
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
    $scope.loadData();

    // handles click event - Post Button & Close New Post Button
    $scope.toggleModal = function() {
        var modal = document.querySelector('.modal');
        modal.style.display = (modal.style.display == "block") ? "none" : "block";
    }

    // empty object to hold form data from new post
    $scope.formData = {};

    // handles new post Submit event
    $scope.submit = function() {
        // console.log($scope.formData);

        // send POST request with new post
        $http.post('/posts', $scope.formData).then(function(response){

            // reload data on success
            if (response.status > 199 && response.status < 300) {
                $scope.loadData();
                $scope.toggleModal();
                // TO DO: delete form data
            }
        })
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
}

