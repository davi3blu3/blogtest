
angular.module('myApp', []).controller('MyController', MyController);

function MyController($http){
    var vm = this;
    vm.title = 'microBlog suggah';

    $http.get('/posts').then(function(response) {
        $scope.posts = response.data;
        console.log($scope.posts);
    })
}
