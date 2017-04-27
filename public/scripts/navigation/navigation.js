angular.module('myApp').directive('sitvNav', sitvNav);

function sitvNav(){
    return {
        restrict: 'E',
        controller: function($scope, $window, $location, AuthFactory) {
            $scope.isLoggedIn = function(){
                if (AuthFactory.isLoggedIn) {
                    console.log('is logged in returning true!');
                    return true;
                } else {
                    console.log('is logged in returning false!');
                    return false;
                }
            },
            $scope.logout = function() {
                console.log('logging out!');
                // handle logout
                AuthFactory.isLoggedIn = false;
                delete $window.sessionStorage.token;
                $location.path('/');
            }
        },
        templateUrl: 'scripts/navigation/navigation.html'

    };
}
