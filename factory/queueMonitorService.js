/**
 * Created by a on 5/29/2016.
 */



'use strict';

mainApp.factory("queueMonitorService", function ($http, authService) {


    var getAllConcurrentQueue = function () {
        //dashboard.104.131.67.21.xip.io
        var authToken = authService.GetToken();
        return $http({
            method: 'GET',
            url: "http://dashboard.104.131.67.21.xip.io/DashboardGraph/ConcurrentQueued/" + queue + "/5",
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


    var getAllQueueStats = function () {
        //dashboard.104.131.67.21.xip.io
        var authToken = authService.GetToken();
        return $http({
            method: 'GET',
            url: "http://dashboard.104.131.67.21.xip.io/DashboardEvent/QueueDetails",
            headers: {
                'authorization': authToken
            }
        }).then(function (response) {
            if (response.data) {
                return response.data;
            } else {

                return [];
            }
        });

    };

    var getSingleQueueStats = function (queue) {
        //dashboard.104.131.67.21.xip.io
        var authToken = authService.GetToken();
        return $http({
            method: 'GET',
            url: "http://dashboard.104.131.67.21.xip.io/DashboardEvent/QueueSingleDetail/" + queue,
            headers: {
                'authorization': authToken
            }
        }).then(function (response) {
            if (response.data) {
                return response.data;
            } else {
                return {};
            }
        });

    };

    var getSingleQueueGraph = function (queue) {
        //dashboard.104.131.67.21.xip.io
        var authToken = authService.GetToken();
        return $http({
            method: 'GET',
            url: "http://dashboard.104.131.67.21.xip.io/DashboardGraph/ConcurrentQueued/"+ queue+"/5",
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







    return {
        GetAllQueueStats: getAllQueueStats,
        GetAllConcurrentQueue: getAllConcurrentQueue,
        GetSingleQueueStats: getSingleQueueStats,
        GetSingleQueueGraph: getSingleQueueGraph

    }
});


