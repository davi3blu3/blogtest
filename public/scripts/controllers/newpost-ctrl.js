angular.module('myApp')
    .controller('PostController', function PostController($scope, $http, $location, $window, AuthFactory){

    // handles new post Submit event
    $scope.submit = function() {

        // construct newPost object
        var newPost = {
            username: $window.localStorage.activeUser,
            message: $scope.postData.message
        };

        // send POST request with new post
        $http.post('/sitv/posts', newPost).then(function(response){

            // reload data on success, clear form, return to feed
            if (response.status > 199 && response.status < 300) {           
                $scope.postData = {};
                $location.url('/');
            }
        })
    }
});
