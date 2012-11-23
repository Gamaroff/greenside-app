/**
 * User: gamaroff
 * Date: 2012/11/23
 * Time: 11:54 AM
 */

var RegisterController = function ($scope) {

   $scope.isBusy = false;

    $scope.emailValid = function(){
       return $scope.email;
   };

    $scope.register = function () {
        alert('Poes!');
    };

}