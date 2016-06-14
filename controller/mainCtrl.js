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
        goAttributeList: function () {
            $state.go('console.attributes');
        },
        goResourceList: function () {
            $state.go('console.resources');
        },
        goRealTimeQueued: function () {
            $state.go('console.realtime-queued');
        },
        goCdrReport: function () {
            $state.go('console.cdr');
        },
        goCallMonitor: function () {
            $state.go('console.callmonitor');
        },
        goSipUser: function () {
            $state.go('console.sipuser');
        },
        goUsers: function () {
            $state.go('console.users');
        },
        goRingGroup: function () {
            $state.go('console.ringGroup');
        },
        GoApplicationAccessManager: function () {
            $state.go('console.applicationAccessManager');
        },
        goRule: function () {
            $state.go('console.rule');
        },
        goApplications: function () {
            $state.go('console.application');
        },
        goHoldMusic: function () {
            $state.go('console.holdmusic');
        },
        goLimits: function () {
            $state.go('console.limits');
        }
    };


});

