/**
 * Created by Rajinda on 5/28/2016.
 */

'use strict';

mainApp.factory("dashboardService", function ($http, authService,baseUrls) {

    var getAllCalls = function () {
        var authToken = authService.GetToken();
        //dashboard.app.veery.cloud
        return $http({
            method: 'GET',
            url: "http://dashboard.app.veery.cloud/DashboardGraph/Calls/5",
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
        //dashboard.app.veery.cloud
        return $http({
            method: 'GET',
            url: "http://dashboard.app.veery.cloud/DashboardGraph/Queued/5",
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
        //dashboard.app.veery.cloud
        return $http({
            method: 'GET',
            url: "http://dashboard.app.veery.cloud/DashboardGraph/Bridge/5",
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
        //dashboard.app.veery.cloud
        return $http({
            method: 'GET',
            url: "http://dashboard.app.veery.cloud/DashboardGraph/Channels/5",
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



    var getTotalCalls = function (param1, param2) {

        var tempParam1 = '*';

        if(param1)
        {
            tempParam1 = param1;
        }

        var tempParam2 = '*';

        if(param2)
        {
            tempParam2 = param2;
        }

        var authToken = authService.GetToken();
        return $http({
            method: 'GET',
            url: "http://dashboard.app.veery.cloud/DashboardEvent/TotalCount/CALLS/" + tempParam1 + "/" + tempParam2,
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

    var getNewTicketCountViaChenal = function (chenal) {
        return $http({
            method: 'GET',
            url: baseUrls.dashBordUrl+"DashboardEvent/TotalCount/NEWTICKET/via_"+chenal+"/*",//http://dashboard.app.veery.cloud/DashboardEvent/TotalCount/NEWTICKET/via_CALL/*
            headers: {
                'authorization': authService.GetToken()
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
        //dashboard.app.veery.cloud
        return $http({
            method: 'GET',
            url: "http://dashboard.app.veery.cloud/DashboardEvent/TotalCount/QUEUE/*/*",
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
    var getTotalQueueHit = function () {
        var authToken = authService.GetToken();
        //dashboard.app.veery.cloud
        return $http({
            method: 'GET',
            url: "http://dashboard.app.veery.cloud/DashboardGraph/AllConcurrentQueued/5",
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
    var getTotalQueueAnswered = function () {
        var authToken = authService.GetToken();
        return $http({
            method: 'GET',
            url: "http://dashboard.app.veery.cloud/DashboardEvent/TotalCount/QUEUEANSWERED/*/*",
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
            url: "http://dashboard.app.veery.cloud/DashboardEvent/TotalCount/QUEUEDROPPED/*/*",
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
            url: "http://dashboard.app.veery.cloud/DashboardEvent/CurrentCount/QUEUE/*/*",
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
            url: "http://dashboard.app.veery.cloud/DashboardEvent/TotalCount/BRIDGE/*/*",
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

    var getTotalOnGoing = function (callDirection) {

        var url = "http://monitorrestapi.app.veery.cloud/DVP/API/1.0.0.0/MonitorRestAPI/Calls/Count";

        if(callDirection)
        {
            url = url + '?direction=' + callDirection;
        }
        var authToken = authService.GetToken();
        return $http({
            method: 'GET',
            url: url,
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
            url: "http://ardsmonitoring.app.veery.cloud/DVP/API/1.0.0.0/ARDS/MONITORING/resources",
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


    var getCompanyTasks = function () {
        var authToken = authService.GetToken();
        //
        //dashboard.app.veery.cloud
        return $http({
            method: 'GET',
            url: "http://resourceservice.app.veery.cloud/DVP/API/1.0.0.0/ResourceManager/Tasks",
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


    /*ticket*/
    var getTicketCount = function (status) {
        return $http({
            method: 'GET',
            url: baseUrls.dashBordUrl+"DashboardEvent/CurrentCount/"+status+"/total/total",
            headers: {
                'authorization': authService.GetToken()
            }
        }).then(function (response) {
            if (response.status===200) {
                return response.data;
            } else {
                return 0;
            }
        });

    };

    var getTotalTicketCount = function (status) {
        return $http({
            method: 'GET',
            url: baseUrls.dashBordUrl+"DashboardEvent/TotalCount/"+status+"/total/total",
            headers: {
                'authorization': authService.GetToken()
            }
        }).then(function (response) {
            if (response.status===200) {
                return response.data;
            } else {
                return 0;
            }
        });

    };

    var getTotalTicketAvg = function (status) {
        return $http({
            method: 'GET',
            url: baseUrls.dashBordUrl+"DashboardEvent/AverageTime/"+status+"/total/total",
            headers: {
                'authorization': authService.GetToken()
            }
        }).then(function (response) {
            if (response.status===200) {
                return response.data;
            } else {
                return 0;
            }
        });

    };

    /*var getTotalTicketCount = function (status) {
     return $http({
     method: 'GET',
     url: baseUrls.dashBordUrl+"DashboardEvent/TotalCount/SLAVIOLATED/total/total",
     headers: {
     'authorization': authService.GetToken()
     }
     }).then(function (response) {
     if (response.status===200) {
     return response.data;
     } else {
     return 0;
     }
     });

     };

     var getTotalTicketCount = function (status) {
     return $http({
     method: 'GET',
     url: baseUrls.dashBordUrl+"DashboardEvent/TotalCount/FIRSTCALLRESOLUTION/total/total",
     headers: {
     'authorization': authService.GetToken()
     }
     }).then(function (response) {
     if (response.status===200) {
     return response.data;
     } else {
     return 0;
     }
     });

     };*/

    var getCreatedTicketSeries = function () {
        return $http({
            method: 'GET',
            url: baseUrls.dashBordUrl+"DashboardGraph/NewTicket/30",
            headers: {
                'authorization': authService.GetToken()
            }
        }).then(function (response) {
            if (response.data && response.data.length > 0 && response.data[0].datapoints) {
                return response.data[0].datapoints;
            } else {

                return {};
            }
        });

    };



    var getResolvedTicketSeries = function (status) {
        return $http({
            method: 'GET',
            url: baseUrls.dashBordUrl+"DashboardGraph/ClosedTicket/30",
            headers: {
                'authorization': authService.GetToken()
            }
        }).then(function (response) {
            if (response.data && response.data.length > 0 && response.data[0].datapoints) {
                return response.data[0].datapoints;
            } else {

                return {};
            }
        });

    };

    var getDeferenceResolvedTicketSeries = function (status) {
        return $http({
            method: 'GET',
            url: baseUrls.dashBordUrl+"DashboardGraph/ClosedVsOpenTicket/30",
            headers: {
                'authorization': authService.GetToken()
            }
        }).then(function (response) {
            if (response.data && response.data.length > 0 && response.data[0].datapoints) {
                return response.data[0].datapoints;
            } else {

                return {};
            }
        });

    };

    /*ticket*/

    return {
        GetAll: getAllCalls,
        GetAllQueued: getAllQueued,
        GetAllBriged: getAllBriged,
        GetAllChannels: getAllChannels,
        GetTotalCalls: getTotalCalls,
        GetTotalQueued: getTotalQueued,
        GetTotalQueueHit:getTotalQueueHit,
        GetTotalQueueAnswered: getTotalQueueAnswered,
        GetTotalQueueDropped: getTotalQueueDropped,
        GetCurrentWaiting: getCurrentWaiting,
        GetTotalBriged: getTotalBriged,
        GetTotalOnGoing: getTotalOnGoing,
        GetProfileDetails: getProfileDetails,
        getCompanyTasks: getCompanyTasks,
        GetTicketCount:getTicketCount,
        GetCreatedTicketSeries:getCreatedTicketSeries,
        GetResolvedTicketSeries:getResolvedTicketSeries,
        GetDeferenceResolvedTicketSeries:getDeferenceResolvedTicketSeries,
        GetTotalTicketCount:getTotalTicketCount,
        GetTotalTicketAvg:getTotalTicketAvg,
        GetNewTicketCountViaChannel:getNewTicketCountViaChenal
    }
});
