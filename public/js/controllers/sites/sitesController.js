/**
 * User: gamaroff
 * Date: 2012/07/01
 * Time: 11:19 PM
 */
function SitesController($scope, $http) {

    $http({method: 'GET', url: '/api/utility'}).
        success(function(data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.utility = data;
        }).
        error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with status
            // code outside of the <200, 400) range
            alert(JSON.stringify(data));
        });
}