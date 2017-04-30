angular.module('myApp').directive('sitvNav', sitvNav);

function sitvNav(){
    return {
        restrict: 'E',
        controller: function($scope, $window, $location, AuthFactory) {
            $scope.isLoggedIn = function(){
                if (AuthFactory.isLoggedIn) {
                    return true;
                } else {
                    return false;
                }
            },
            $scope.logout = function() {
                AuthFactory.isLoggedIn = false;
                AuthFactory.activeUser = null;
                delete $window.sessionStorage.token;
                $location.path('/');
            },
            $scope.activeUser = function() {
                return AuthFactory.activeUser;
            }
        },
        templateUrl: 'scripts/navigation/navigation.html'
    };
}
