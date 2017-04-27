angular.module('myApp').directive('sitvNav', sitvNav);

function sitvNav(){
    return {
        restrict: 'E',
        controller: function($scope, AuthFactory) {
            $scope.isLoggedIn = function(){
                console.log('AuthFactory', AuthFactory);
                if (AuthFactory.isLoggedIn) {
                    console.log('returning true!');
                    return true;
                } else {
                    console.log('returning false!');
                    return false;
                }
            }
        },
        templateUrl: 'scripts/navigation/navigation.html'

    };
}


        // isLoggedIn: function(AuthFactory){
        //     if (AuthFactory.isLoggedIn) {
        //         return true;
        //     } else {
        //         return false;
        //     }
        // }