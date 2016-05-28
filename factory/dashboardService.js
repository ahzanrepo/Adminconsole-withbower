/**
 * Created by Damith on 5/28/2016.
 */

'use strict';

mainApp.factory("dashboardService", function ($http) {
    var authToken = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkaW51c2hhZGNrIiwianRpIjoiMjViZjZmZTItZjZjNC00ZWJhLWFmODgtNmMxNjIxOTU4OGRiIiwic3ViIjoiNTZhOWU3NTlmYjA3MTkwN2EwMDAwMDAxMjVkOWU4MGI1YzdjNGY5ODQ2NmY5MjExNzk2ZWJmNDMiLCJleHAiOjE4OTI0NDE2NzIsInRlbmFudCI6MSwiY29tcGFueSI6Mywic2NvcGUiOlt7InJlc291cmNlIjoiYWxsIiwiYWN0aW9ucyI6ImFsbCJ9XSwiaWF0IjoxNDYwNDM4MDcyfQ.aPoVPiTtoGFgnKmhdLBTzwTrQRTGWWliYujHP5NONqU';

    var getAllCalls = function () {
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
        GetTotalBriged: getTotalBriged

    }
});
