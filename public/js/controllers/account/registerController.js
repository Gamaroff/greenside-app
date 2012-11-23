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

        $scope.registerResult = null;

        registration.register(null, {email : $scope.email}, function (result) {

            if (result.err) {
                alert(err);
            }
            else {
                $scope.email = '';
                $scope.registerResult = 'Registration successful. Please follow the instructions sent to your mailbox.'
                // $scope.registerResult = result.data;
            }

        }, function (result) {

        });
    };

    var registration = $resource('/register',
        {callback : 'JSON_CALLBACK'},
        {register : {method : 'POST'}}
    );

}

