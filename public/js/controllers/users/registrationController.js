/**
 * User: gamaroff
 * Date: 2012/07/01
 * Time: 11:19 PM
 */
function RegistrationController($scope, $http, $window) {

    var data = {
        email:'',
        password:'',
        confirm:''
    }
    $scope.form = angular.copy(data);

    $scope.emailRegex = /b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/;

    $scope.isNotValid = function () {
        var result = $scope.RegistrationForm.$invalid;

        if ($scope.form.password !== $scope.form.confirm)
            result = true;

        return result;
    };


    $scope.save = function () {

        $http.post('/register', $scope.form).success(function (result) {
            if (!result.err){
                $window.location.href = '/registered';
            }
            else
                $scope.emailMessage = result.err;
        });
    };
}