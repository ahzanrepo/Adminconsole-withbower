/**
 * Created by team veery on 9/22/2016.
 */


mainApp.controller('agentDashboardCtrl', function ($scope, $timeout, dashboardService) {



    /*charts Configurations */

    /* var data1 = [[1, 5], [2, 5], [3, 6], [4, 9], [5, 7], [6, 6], [7, 2], [8, 1], [9, 3]];
     var data2 = [[1, 4], [2, 8], [3, 7], [4, 5], [5, 7], [6, 5], [7, 2], [8, 1], [9, 3]];*/
    var data1 = [];
    var data2 = [];


    $scope.difCreateVsResolvedChartOptions = {
        grid: {
            borderWidth: 1,
            borderColor: '#bfbfbf',
            show: true
        },
        series: {shadowSize: 0, color: "#f8b01d"},
        color: {color: '#63a5a2'},
        legend: {
            container: '#legend',
            show: true
        },
        yaxis: {
            min: 0,
            color: '#f7f5f5'
        }, xaxis: {
            color: '#f7f5f5',
            tickFormatter: function (val, axis) {
                return moment.unix(val).format("DD-MMM"); //moment.unix(val).date();
            }
        }
    };

    var createVsResolvedChartOptions = {
        grid: {
            borderWidth: 1,
            borderColor: '#bfbfbf',
            show: true
        },
        series: {
            lines: {show: true, fill: true, color: "#114858"},
            points: {show: true},
        },
        color: {color: '#63a5a2'},
        legend: {
            show: true
        },
        yaxis: {
            min: 0,
            color: '#f7f5f5',
            /*title: 'Ticket Count',  titleTextStyle: {color: '#333'}*/
        }, xaxis: {
            color: '#f7f5f5',
            /*title: 'Day',  titleTextStyle: {color: '#333'},*/
            tickFormatter: function (val, axis) {
                return moment.unix(val).format("DD-MMM");// moment.unix(val).date();
            }
        }
    };

    var bindDataToChart = function () {
        var data = [{data: data1, label: "Created", lines: {show: true}}, {
            data: data2,
            label: "Resolved",
            lines: {show: true},
            points: {show: true}
        }];
        chart = $.plot($("#createVsResolved"), data, createVsResolvedChartOptions);
        /*var axes = chart.getAxes();
         axes.xaxis.axisLabel = "test";
         axes.yaxis.axisLabel = "test111";
         // Redraw
         chart.setupGrid();
         chart.draw();*/
    };
    $(document).ready(function () {
        bindDataToChart();
    });
    $scope.ticketDif = [{
        data: [], lines: {
            fill: false,
            lineWidth: 2
        }
    }];

    $scope.getCreatedTicketSeries = function () {
        dashboardService.GetCreatedTicketSeries().then(function (response) {
            if (angular.isArray(response)) {
                data1 = response.map(function (c, index) {
                    var item = [];
                    item[0] = c[1];
                    item[1] = c[0]?c[0]:0;
                    return item;
                });
                bindDataToChart();
            }
        }, function (err) {
            console.log(err);
        });
    };
    $scope.getCreatedTicketSeries();

    $scope.getResolvedTicketSeries = function () {
        dashboardService.GetResolvedTicketSeries().then(function (response) {
            if (angular.isArray(response)) {
                data2 = response.map(function (c, index) {
                    var item = [];
                    item[0] = c[1];
                    item[1] = c[0]?c[0]:0;
                    return item;
                });
                bindDataToChart();
            }
        }, function (err) {
            console.log(err);
        });
    };
    $scope.getResolvedTicketSeries();

    $scope.getDeferenceResolvedTicketSeries = function () {
        dashboardService.GetDeferenceResolvedTicketSeries().then(function (response) {
            if (angular.isArray(response)) {
                $scope.ticketDif[0].data = response.map(function (c, index) {
                    var item = [];
                    item[0] = c[1];
                    item[1] = c[0]?c[0]:0;
                    return item;
                });

            }
        }, function (err) {
            console.log(err);
        });
    };
    $scope.getDeferenceResolvedTicketSeries();

    /*charts Configurations  End ------------*/


    $scope.newTicket = 0;
    $scope.getNewTicketCount = function () {
        dashboardService.GetTicketCount("NEWTICKET").then(function (response) {
            if (response) {
                $scope.newTicket = response;
                if ($scope.newTicket > 0) {
                    calculateReopenPercentage();
                    SlaCompliance();
                }
            }
            else {
                $scope.newTicket = 0;
            }
        }, function (err) {
            $scope.newTicket = 0;
            console.log(err);
        });
    };
    $scope.getNewTicketCount();

    $scope.totalTicket = 0;
    $scope.getNewTicketCount = function () {
        dashboardService.GetTotalTicketCount("NEWTICKET").then(function (response) {
            if (response) {
                $scope.totalTicket = response;
            }
            else {
                $scope.totalTicket = 0;
            }
        }, function (err) {
            $scope.totalTicket = 0;
            console.log(err);
        });
    };
    $scope.getNewTicketCount();

    $scope.openTicket = 0;
    $scope.getOpenTicketCount = function () {
        dashboardService.GetTicketCount("OPENTICKET").then(function (response) {
            if (response) {
                $scope.openTicket = response;
            }
            else {
                $scope.openTicket = 0;
            }
        }, function (err) {
            $scope.openTicket = 0;
            console.log(err);
        });
    };
    $scope.getOpenTicketCount();

    $scope.solvedTicket = 0;
    $scope.getSolvedTicketCount = function () {
        dashboardService.GetTicketCount("SOLVEDTICKET").then(function (response) {
            if (response) {
                $scope.solvedTicket = response;
            }
            else {
                $scope.solvedTicket = 0;
            }
        }, function (err) {
            $scope.solvedTicket = 0;
            console.log(err);
        });
    };
    $scope.getSolvedTicketCount();

    $scope.reopenTicket = 0;
    $scope.getReopenTicketCount = function () {
        dashboardService.GetTicketCount("REOPENTICKET").then(function (response) {
            if (response) {
                $scope.reopenTicket = response;
                if ($scope.newTicket > 0) {
                    calculateReopenPercentage();
                }
            }
            else {
                $scope.reopenTicket = 0;
            }
        }, function (err) {
            $scope.reopenTicket = 0;
            console.log(err);
        });
    };
    $scope.getReopenTicketCount();

    $scope.parkedTicket = 0;
    $scope.getParkedTicketCount = function () {
        dashboardService.GetTicketCount("PARKEDTICKET").then(function (response) {
            if (response) {
                $scope.parkedTicket = response;
            }
            else {
                $scope.parkedTicket = 0;
            }
        }, function (err) {
            $scope.parkedTicket = 0;
            console.log(err);
        });
    };
    $scope.getParkedTicketCount();

    $scope.progressTicket = 0;
    $scope.getProgressTicketCount = function () {
        dashboardService.GetTicketCount("PROGRESSINGTICKET").then(function (response) {
            if (response) {
                $scope.progressTicket = response;
            }
            else {
                $scope.progressTicket = 0;
            }
        }, function (err) {
            $scope.progressTicket = 0;
            console.log(err);
        });
    };
    $scope.getProgressTicketCount();

    $scope.closedTicket = 0;
    $scope.getClosedTicketCount = function () {
        dashboardService.GetTicketCount("CLOSEDTICKET").then(function (response) {
            if (response) {
                $scope.closedTicket = response;
            }
            else {
                $scope.closedTicket = 0;
            }
        }, function (err) {
            $scope.closedTicket = 0;
            console.log(err);
        });
    };
    $scope.getClosedTicketCount();

    $scope.firstCallResolution = 0;
    $scope.getFirstCallResolutionTicketCount = function () {
        dashboardService.GetTotalTicketCount("FIRSTCALLRESOLUTION").then(function (response) {
            if (response) {
                $scope.firstCallResolution = response;
            }
            else {
                $scope.firstCallResolution = 0;
            }
        }, function (err) {
            $scope.firstCallResolution = 0;
            console.log(err);
        });
    };
    $scope.getFirstCallResolutionTicketCount();

    $scope.slaViolated = 0;
    $scope.getSlaViolatedTicketCount = function () {
        dashboardService.GetTotalTicketCount("SLAVIOLATED").then(function (response) {
            if (response) {
                $scope.slaViolated = response;
                if ($scope.newTicket > 0) {
                    SlaCompliance();
                }
            }
            else {
                $scope.slaViolated = 0;
            }
        }, function (err) {
            $scope.slaViolated = 0;
            console.log(err);
        });
    };
    $scope.getSlaViolatedTicketCount();


    $scope.ticketResolutionTime = 0;
    $scope.getTicketResolutionTime = function () {
        dashboardService.GetTotalTicketAvg("TICKETRESOLUTION").then(function (response) {
            if (response) {
                $scope.ticketResolutionTime = response;
            }
            else {
                $scope.ticketResolutionTime = 0;
            }
        }, function (err) {
            $scope.ticketResolutionTime = 0;
            console.log(err);
        });
    };
    $scope.getTicketResolutionTime();

    $scope.averageResponseTime = 0;
    $scope.getAverageResponseTime = function () {
        dashboardService.GetTotalTicketAvg("NEWTICKET").then(function (response) {
            if (response) {
                $scope.averageResponseTime =  response;
            }
            else {
                $scope.averageResponseTime = 0;
            }
        }, function (err) {
            $scope.averageResponseTime = 0;
            console.log(err);
        });
    };
    $scope.getAverageResponseTime();

    $scope.slaCompliance = 0;
    var SlaCompliance = function () {
        $scope.slaCompliance = (($scope.slaViolated / $scope.newTicket) * 100).toFixed(2);
    };

    $scope.reopenPercentage = 0;
    var calculateReopenPercentage = function () {
        $scope.reopenPercentage = (($scope.reopenTicket / $scope.totalTicket) * 100).toFixed(2);
    };


    var getAllRealTimeTimer = {};
    var getAllRealTime = function () {
        $scope.getCreatedTicketSeries();
        $scope.getResolvedTicketSeries();
        $scope.getDeferenceResolvedTicketSeries();
        $scope.getNewTicketCount();
        $scope.getOpenTicketCount();
        $scope.getSolvedTicketCount();
        $scope.getReopenTicketCount();
        $scope.getParkedTicketCount();
        $scope.getProgressTicketCount();
        $scope.getClosedTicketCount();
        $scope.getFirstCallResolutionTicketCount();
        $scope.getSlaViolatedTicketCount();
        $scope.getTicketResolutionTime();
        $scope.getAverageResponseTime();
        getAllRealTimeTimer = $timeout(getAllRealTime, 1800000);//30min
    };
    getAllRealTime();

    $scope.$on("$destroy", function () {
        if (getAllRealTimeTimer) {
            $timeout.cancel(getAllRealTimeTimer);
        }
    });


});

