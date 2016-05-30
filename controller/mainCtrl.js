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
        goFilegallery: function () {
            $state.go('console.filegallery');
        },
        goFileupload: function () {
            $state.go('console.fileupload');
        },
        goRealTimeQueued: function () {
            $state.go('console.productivity');
        }
    };


});

