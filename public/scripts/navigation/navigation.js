angular.module('myApp').directive('sitvNav', sitvNav);

function sitvNav(){
    return {
        restrict: 'E',
        controller: function($scope, $window, $location, AuthFactory) {
            $scope.isLoggedIn = function(){
                if (AuthFactory.auth.isLoggedIn) {
                    return true;
                } else {
                    return false;
                }
            },
            $scope.logout = function() {
                AuthFactory.auth.isLoggedIn = false;
                delete $window.localStorage.token;
                delete $window.localStorage.activeUser;
                $location.path('/');
            },
            $scope.activeUser = function() {
                return $window.localStorage.activeUser;
            }
        },
        templateUrl: 'scripts/navigation/navigation.html'
    };
}
