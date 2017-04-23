angular.module('myApp')
    .controller('PostController', function PostController($scope, $http, $location){

    // handles new post Submit event
    $scope.submit = function() {
        // console.log($scope.postData);
        console.log('post page submit was called');
        // send POST request with new post
        $http.post('/sitv/posts', $scope.postData).then(function(response){

            // reload data on success, clear form, return to feed
            if (response.status > 199 && response.status < 300) {           
                $scope.postData = {};
                $location.url('/');
            }
        })
    }
});
