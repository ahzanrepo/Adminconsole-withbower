/**
 * Created by Damith on 5/28/2016.
 */

'use strict';
mainApp.controller('mainCtrl', function ($scope, $state) {

    $scope.clickDirective = {
        goDashboard: function () {
            $state.go('console.dashboard');
        },
        goProductivity: function () {
            $state.go('console.productivity');
        },
        goRealTimeQueued: function () {
            $state.go('console.productivity');
        }
    };


});

