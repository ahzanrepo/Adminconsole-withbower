/**
 * Created by Damith on 5/28/2016.
 */

'use strict';

mainApp.factory("dashboardService", function ($http) {
    var authToken = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3YXJ1bmEiLCJqdGkiOiJlNjk1ZDM3Ny1kMTRkLTRjMTgtYTM5Ni0xYzcwZTQ5NGFjYzMiLCJzdWIiOiJBY2Nlc3MgY2xpZW50IiwiZXhwIjoxNDY2NzgzNzA5LCJ0ZW5hbnQiOjEsImNvbXBhbnkiOjI0LCJhdWQiOiJteWFwcCIsImNvbnRleHQiOnt9LCJzY29wZSI6W3sicmVzb3VyY2UiOiJzeXNtb25pdG9yaW5nIiwiYWN0aW9ucyI6WyJyZWFkIl19LHsicmVzb3VyY2UiOiJkYXNoYm9hcmRldmVudCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJkYXNoYm9hcmRncmFwaCIsImFjdGlvbnMiOlsicmVhZCJdfSx7InJlc291cmNlIjoibm90aWZpY2F0aW9uIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiXX0seyJyZXNvdXJjZSI6ImF0dHJpYnV0ZSIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJncm91cCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJyZXNvdXJjZXRhc2thdHRyaWJ1dGUiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoidGFzayIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJwcm9kdWN0aXZpdHkiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiU2hhcmVkIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InRhc2tpbmZvIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6ImFyZHNyZXNvdXJjZSIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJhcmRzcmVxdWVzdCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJyZXF1ZXN0bWV0YSIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJxdWV1ZSIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJyZXF1ZXN0c2VydmVyIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InVzZXIiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoidXNlclByb2ZpbGUiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoib3JnYW5pc2F0aW9uIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiXX0seyJyZXNvdXJjZSI6InJlc291cmNlIiwiYWN0aW9ucyI6WyJyZWFkIl19LHsicmVzb3VyY2UiOiJwYWNrYWdlIiwiYWN0aW9ucyI6WyJyZWFkIl19LHsicmVzb3VyY2UiOiJjb25zb2xlIiwiYWN0aW9ucyI6WyJyZWFkIl19LHsicmVzb3VyY2UiOiJ1c2VyU2NvcGUiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoidXNlckFwcFNjb3BlIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InVzZXJNZXRhIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InVzZXJBcHBNZXRhIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6ImNsaWVudCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJjbGllbnRTY29wZSIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJEaXNwYXRjaCIsImFjdGlvbnMiOlsid3JpdGUiXX0seyJyZXNvdXJjZSI6ImZpbGVzZXJ2aWNlIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiXX0seyJyZXNvdXJjZSI6ImVuZHVzZXIiLCJhY3Rpb25zIjpbInJlYWQiXX0seyJyZXNvdXJjZSI6ImNvbnRleHQiLCJhY3Rpb25zIjpbInJlYWQiXX0seyJyZXNvdXJjZSI6ImFwcHJlZyIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIl19LHsicmVzb3VyY2UiOiJjYWxscnVsZSIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJ0cnVuayIsImFjdGlvbnMiOlsicmVhZCJdfSx7InJlc291cmNlIjoicXVldWVtdXNpYyIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJsaW1pdCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIl19LHsicmVzb3VyY2UiOiJjZHIiLCJhY3Rpb25zIjpbInJlYWQiXX1dLCJpYXQiOjE0NjYxNzg5MDl9.HHLqJV_zYrF6S0X9fyOp1y7AwM44wMHHuLs7ZGbIHts';

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

    var getTotalOnGoing = function () {
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
