angular.module('myApp').directive('sitvNav', sitvNav);

function sitvNav(){
    return {
        restrict: 'E',
        templateUrl: 'scripts/navigation/navigation.html'
    };
}