angular.module('myApp')
    .controller('MyController', MyController)
    .controller('EditController', EditController);


function MyController($scope, $http, $window, $location){

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
    // Initial function call on page load
    $scope.loadData();


    // empty object to hold form data from new post
    $scope.postData = {};

    // handles new post Submit event
    $scope.submit = function() {
        // console.log($scope.postData);

        // send POST request with new post
        $http.post('/posts', $scope.postData).then(function(response){

            // reload data on success, clear form, return to feed
            if (response.status > 199 && response.status < 300) {
                $scope.loadData();             
                $scope.postData = {};
                $location.url('/');
            }
        })
    }

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
}

function EditController($routeParams){
    // empty object to hold form data from edit post
    // $scope.editData = {};

    console.log('Params', $routeParams.id);
}
