/**
 * Created by Damith on 6/1/2016.
 */

mainApp.controller('loginCtrl', function ($scope, $state) {

    $scope.login = function () {
        $state.go('console.dashboard');
    }
});