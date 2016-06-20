/**
 * Created by Damith on 5/28/2016.
 */

'use strict';

mainApp.factory("dashboardService", function ($http, authService) {

    var getAllCalls = function () {
        var authToken = authService.GetToken();
        //dashboard.104.131.67.21.xip.io
        return $http({
            method: 'GET',
            url: "http://dashboard.104.131.67.21.xip.io/DashboardGraph/Calls/5",
            headers: {
                'authorization': authToken
            }
        }).then(function (response) {
            if (response.data && response.data.length > 0 && response.data[0].datapoints) {
                return response.data[0].datapoints;
            } else {
                return {};
            }
        });
    };
    var getAllQueued = function () {
        var authToken = authService.GetToken();
        //dashboard.104.131.67.21.xip.io
        return $http({
            method: 'GET',
            url: "http://dashboard.104.131.67.21.xip.io/DashboardGraph/Queued/5",
            headers: {
                'authorization': authToken
            }
        }).then(function (response) {
            if (response.data && response.data.length > 0 && response.data[0].datapoints) {
                return response.data[0].datapoints;
            } else {

                return {};
            }
        });
    };
    var getAllBriged = function () {
        var authToken = authService.GetToken();
        //dashboard.104.131.67.21.xip.io
        return $http({
            method: 'GET',
            url: "http://dashboard.104.131.67.21.xip.io/DashboardGraph/Bridge/5",
            headers: {
                'authorization': authToken
            }
        }).then(function (response) {
            if (response.data && response.data.length > 0 && response.data[0].datapoints) {
                return response.data[0].datapoints;
            } else {
                return {};
            }
        });
    };
    var getAllChannels = function () {
        var authToken = authService.GetToken();
        //dashboard.104.131.67.21.xip.io
        return $http({
            method: 'GET',
            url: "http://dashboard.104.131.67.21.xip.io/DashboardGraph/Channels/5",
            headers: {
                'authorization': authToken
            }
        }).then(function (response) {
            if (response.data && response.data.length > 0 && response.data[0].datapoints) {
                return response.data[0].datapoints;
            } else {

                return {};
            }
        });
    };

    var getTotalCalls = function () {
        var authToken = authService.GetToken();
        return $http({
            method: 'GET',
            url: "http://dashboard.104.131.67.21.xip.io/DashboardEvent/TotalCount/CALLS/*/*",
            headers: {
                'authorization': authToken
            }
        }).then(function (response) {
            if (response.data) {
                return response.data;
            } else {
                return 0;
            }
        });


    };

    var getTotalQueued = function () {
        var authToken = authService.GetToken();
        //
        //dashboard.104.131.67.21.xip.io
        return $http({
            method: 'GET',
            url: "http://dashboard.104.131.67.21.xip.io/DashboardEvent/TotalCount/QUEUE/*/*",
            headers: {
                'authorization': authToken
            }
        }).then(function (response) {
            if (response.data) {
                return response.data;
            } else {
                return 0;
            }
        });


    };

    var getTotalQueueAnswered = function () {
        var authToken = authService.GetToken();
        return $http({
            method: 'GET',
            url: "http://dashboard.104.131.67.21.xip.io/DashboardEvent/TotalCount/QUEUEANSWERED/*/*",
            headers: {
                'authorization': authToken
            }
        }).then(function (response) {
            if (response.data) {
                return response.data;
            } else {
                return 0;
            }
        });


    };

    var getTotalQueueDropped = function () {

        var authToken = authService.GetToken();
        return $http({
            method: 'GET',
            url: "http://dashboard.104.131.67.21.xip.io/DashboardEvent/TotalCount/QUEUEDROPPED/*/*",
            headers: {
                'authorization': authToken
            }

        }).then(function (response) {
            if (response.data) {


                return response.data;


            } else {

                return 0;
            }

        });


    };

    var getCurrentWaiting = function () {
        var authToken = authService.GetToken();
        return $http({
            method: 'GET',
            url: "http://dashboard.104.131.67.21.xip.io/DashboardEvent/CurrentCount/QUEUE/*/*",
            headers: {
                'authorization': authToken
            }
        }).then(function (response) {
            if (response.data) {
                return response.data;
            } else {
                return 0;
            }
        });
    };

    var getTotalBriged = function () {
        var authToken = authService.GetToken();
        return $http({
            method: 'GET',
            url: "http://dashboard.104.131.67.21.xip.io/DashboardEvent/TotalCount/BRIDGE/*/*",
            headers: {
                'authorization': authToken
            }
        }).then(function (response) {
            if (response.data) {


                return response.data;


            } else {

                return 0;
            }

        });


    };

    var getTotalOnGoing = function () {
        var authToken = authService.GetToken();
        return $http({
            method: 'GET',
            url: "http://monitorrestapi.104.131.67.21.xip.io/DVP/API/1.0.0.0/MonitorRestAPI/Calls/Count",
            headers: {
                'authorization': authToken
            }
        }).then(function (response) {
            if (response.data && response.data.IsSuccess && response.data.Result
                && response.data.Result.length > 0) {
                return response.data.Result;
            } else {
                return [];
            }

        });


    };

    var getProfileDetails = function () {
        var authToken = authService.GetToken();
        return $http({
            method: 'GET',
            url: "http://ardsmonitoring.104.131.67.21.xip.io/DVP/API/1.0.0.0/ARDS/MONITORING/resources",
            headers: {
                'authorization': authToken
            }
        }).then(function (response) {
            if (response.data && response.data.IsSuccess) {
                return response.data.Result;
            } else {
                return 0;
            }

        });


    };


    return {
        GetAll: getAllCalls,
        GetAllQueued: getAllQueued,
        GetAllBriged: getAllBriged,
        GetAllChannels: getAllChannels,
        GetTotalCalls: getTotalCalls,
        GetTotalQueued: getTotalQueued,
        GetTotalQueueAnswered: getTotalQueueAnswered,
        GetTotalQueueDropped: getTotalQueueDropped,
        GetCurrentWaiting: getCurrentWaiting,
        GetTotalBriged: getTotalBriged,
        GetTotalOnGoing: getTotalOnGoing,
        GetProfileDetails: getProfileDetails

    }
});
