/**
 * User: gamaroff
 * Date: 2012/11/23
 * Time: 11:54 AM
 */
angular.module('register', ['ngResource']);

function RegisterController($scope, $resource) {

    $scope.isBusy = false;

    $scope.emailValid = function () {
        return $scope.email;
    };

    $scope.register = function () {
        $scope.twitterResult = $scope.twitter.get({q : 'monkey'});
    };

    $scope.twitter = $resource('http://search.twitter.com/:action',
        {action : 'search.json', q : 'cow', callback : 'JSON_CALLBACK'},
        {get : {method : 'JSONP'}
        });

}

//RegisterController.$inject = ['$scope', '$resource'];