angular.module('myApp', ['ngRoute'])
    .config(config)
    .controller('MyController', MyController);

function config($routeProvider){
    $routeProvider.when('/', {
        templateUrl: '../templates/feed.html'
    })
    .when('/newPost', {
        templateUrl: '../templates/newPost.html'
    })
    .when('/editPost', {
        templateUrl: '../templates/editPost.html'
    })
    .when('/deletePost', {
        templateUrl: '../templates/deletePost.html'
    })
}

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
    // Initial function call on page load
    $scope.loadData();


    // handles click event - Post Button & Close New Post Button
    $scope.toggleModal = function() {
        var modal = document.querySelector('.modal');
        modal.style.display = (modal.style.display == "block") ? "none" : "block";
    }

    // handles click event - Edit Button & Close Edit Post Button
    // $scope.toggleEditModal = function(postID) {
    //     var editModal = document.querySelector('.post-modal');
    //     editModal.style.display = (editModal.style.display == "block") ? "none" : "block";
    // }

    // empty object to hold form data from new post and edit post
    $scope.postData = {};
    $scope.editData = {};

    // handles new post Submit event
    $scope.submit = function() {
        // console.log($scope.postData);

        // send POST request with new post
        $http.post('/posts', $scope.postData).then(function(response){

            // reload data on success
            if (response.status > 199 && response.status < 300) {
                $scope.loadData();
                console.log('post successful, triggering modal close');
                $scope.toggleModal();
                // TO DO: delete form data
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

