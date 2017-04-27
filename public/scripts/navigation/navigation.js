angular.module('myApp').directive('sitvNav', sitvNav);

function sitvNav(){
    return {
        restrict: 'E',
        templateUrl: 'scripts/navigation/navigation.html'
        // ,
        // isLoggedIn: function(AuthFactory){
        //     if (AuthFactory.isLoggedIn) {
        //         return true;
        //     } else {
        //         return false;
        //     }
        // }
    };
}
