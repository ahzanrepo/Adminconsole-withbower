/**
 * Created by Heshan.i on 3/14/2017.
 */


(function () {

    mainApp.controller("callcenterPerformanceController", function ($scope, $q, $timeout, dashboardService, loginService, $anchorScroll) {

        $scope.safeApply = function(fn) {
            var phase = this.$root.$$phase;
            if(phase == '$apply' || phase == '$digest') {
                if(fn && (typeof(fn) === 'function')) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        };
        $anchorScroll();
        $scope.disableCurrent = true;
        $scope.startDate = moment().format("YYYY-MM-DD");
        $scope.endDate = moment().format("YYYY-MM-DD");

        $scope.callCenterPerformance = {
            totalInbound: 0,
            totalOutbound: 0,
            totalQueued: 0,
            totalQueueAnswered: 0,
            totalQueueDropped: 0,
            totalTalkTime: 0,
            totalStaffTime: 0,
            totalAcwTime: 0,
            AverageStaffTime: 0,
            AverageAcwTime: 0,
            AverageInboundCallsPerAgent: 0,
            AverageOutboundCallsPerAgent: 0,
            TotalLoginAgents: 0
        };

        $scope.onDateChange = function()
        {
            if(moment($scope.startDate, "YYYY-MM-DD").isValid() && moment($scope.endDate, "YYYY-MM-DD").isValid())
            {
                $scope.dateValid = true;
            }
            else
            {
                $scope.dateValid = false;
            }
        };

        $scope.callCenterPerformanceChartConfig = {
            type: 'bar',
            data: {
                labels: ["Inbound Calls", "Outbound Calls", "Queued", "Queued Answered", "Queued Dropped"],
                datasets: [
                    {
                        label: "Total Count",
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1,
                        data: [0,0,0,0,0]
                    }
                ]
            },
            options:{
                scales: {
                    yAxes: [{

                        stacked: true,
                        ticks: {
                            min: 0,
                            stepSize: 1
                        }

                    }]
                }
            }
        };

        var callCenterPerformanceChart = document.getElementById("callCenterPerformanceCanvas").getContext("2d");
        window.callCenterPerformanceChart = new Chart(callCenterPerformanceChart, $scope.callCenterPerformanceChartConfig);

        var TimeFormatter = function (seconds) {

            var timeStr = '0h:0m';
            if(seconds > 0) {
                var durationObj = moment.duration(seconds * 1000);

                if (durationObj) {
                    var tempHrs = 0;
                    if (durationObj._data.years > 0) {
                        tempHrs = tempHrs + durationObj._data.years * 365 * 24;
                    }
                    if (durationObj._data.months > 0) {
                        tempHrs = tempHrs + durationObj._data.months * 30 * 24;
                    }
                    if (durationObj._data.days > 0) {
                        tempHrs = tempHrs + durationObj._data.days * 24;
                    }

                    tempHrs = tempHrs + durationObj._data.hours;
                    timeStr = tempHrs + 'h:' + durationObj._data.minutes + 'm';
                }
            }
            return timeStr;
        };

        var getTotalInboundCalls = function () {
            var deferred = $q.defer();

            dashboardService.GetTotalCalls('inbound', null).then(function (response) {

                if (response && response > 0) {
                    $scope.callCenterPerformance.totalInbound = response;
                }else{
                    $scope.callCenterPerformance.totalInbound = 0;
                }
                deferred.resolve('done');
            }, function (err) {
                loginService.isCheckResponse(err);
                deferred.resolve('done');
            });

            return deferred.promise;
        };

        var getTotalOutboundCalls = function () {
            var deferred = $q.defer();

            dashboardService.GetTotalCalls('outbound', null).then(function (response) {

                if (response && response > 0) {
                    $scope.callCenterPerformance.totalOutbound = response;
                }else{
                    $scope.callCenterPerformance.totalOutbound = 0;
                }
                deferred.resolve('done');
            }, function (err) {
                loginService.isCheckResponse(err);
                deferred.resolve('done');
            });

            return deferred.promise;
        };

        var getTotalQueued = function () {
            var deferred = $q.defer();

            dashboardService.GetTotalQueued().then(function (response) {
                if (response && response > 0) {
                    $scope.callCenterPerformance.totalQueued = response;
                }else{
                    $scope.callCenterPerformance.totalQueued = 0;
                }
                deferred.resolve('done');
            }, function (err) {
                loginService.isCheckResponse(err);
                deferred.resolve('done');
            });

            return deferred.promise;
        };

        var getTotalQueueAnswered = function () {
            var deferred = $q.defer();

            dashboardService.GetTotalQueueAnswered().then(function (response) {
                if (response && response > 0) {
                    $scope.callCenterPerformance.totalQueueAnswered = response;
                }else{
                    $scope.callCenterPerformance.totalQueueAnswered = 0;
                }
                deferred.resolve('done');
            }, function (err) {
                loginService.isCheckResponse(err);
                deferred.resolve('done');
            });

            return deferred.promise;
        };

        var getTotalQueueDropped = function () {
            var deferred = $q.defer();

            dashboardService.GetTotalQueueDropped().then(function (response) {
                if (response && response > 0) {
                    $scope.callCenterPerformance.totalQueueDropped = response;
                }else{
                    $scope.callCenterPerformance.totalQueueDropped = 0;
                }
                deferred.resolve('done');
            }, function (err) {
                loginService.isCheckResponse(err);
                deferred.resolve('done');
            });

            return deferred.promise;
        };

        var getTotalTalkTime = function () {
            dashboardService.GetTotalTalkTime().then(function (response) {
                if (response && response > 0) {
                    $scope.callCenterPerformance.totalTalkTime = TimeFormatter(response);
                }else{
                    $scope.callCenterPerformance.totalTalkTime = 0;
                }
            }, function (err) {
                loginService.isCheckResponse(err);
            });
        };

        var getTotalStaffTime = function () {
            dashboardService.GetTotalStaffTime().then(function (response) {
                if (response && response > 0) {
                    $scope.callCenterPerformance.totalStaffTime = TimeFormatter(response);
                }else{
                    $scope.callCenterPerformance.totalStaffTime = 0;
                }
            }, function (err) {
                loginService.isCheckResponse(err);
            });
        };

        var getTotalAcwTime = function () {
            dashboardService.GetTotalAcwTime().then(function (response) {
                if (response && response > 0) {
                    $scope.callCenterPerformance.totalAcwTime = TimeFormatter(response);
                }else{
                    $scope.callCenterPerformance.totalAcwTime = 0;
                }
            }, function (err) {
                loginService.isCheckResponse(err);
            });
        };

        var getAverageStaffTime = function () {
            dashboardService.GetAverageStaffTime().then(function (response) {
                if (response && response > 0) {
                    $scope.callCenterPerformance.AverageStaffTime = TimeFormatter(response);
                }else{
                    $scope.callCenterPerformance.AverageStaffTime = 0;
                }
            }, function (err) {
                loginService.isCheckResponse(err);
            });
        };

        var getAverageAcwTime = function () {
            dashboardService.GetAverageAcwTime().then(function (response) {
                if (response && response > 0) {
                    $scope.callCenterPerformance.AverageAcwTime = TimeFormatter(response);
                }else{
                    $scope.callCenterPerformance.AverageAcwTime = 0;
                }
            }, function (err) {
                loginService.isCheckResponse(err);
            });
        };

        var getAverageInboundCallsPerAgent = function () {
            dashboardService.GetAverageInboundCallsPerAgent().then(function (response) {
                if (response && response > 0) {
                    $scope.callCenterPerformance.AverageInboundCallsPerAgent = response.toFixed(2);
                }else{
                    $scope.callCenterPerformance.AverageInboundCallsPerAgent = 0;
                }
            }, function (err) {
                loginService.isCheckResponse(err);
            });
        };

        var getAverageOutboundCallsPerAgent = function () {
            dashboardService.GetAverageOutboundCallsPerAgent().then(function (response) {
                if (response && response > 0) {
                    $scope.callCenterPerformance.AverageOutboundCallsPerAgent = response.toFixed(2);
                }else{
                    $scope.callCenterPerformance.AverageOutboundCallsPerAgent = 0;
                }
            }, function (err) {
                loginService.isCheckResponse(err);
            });
        };

        var getTotalLoginAgentCount = function () {
            dashboardService.GetTotalLoginAgentCount().then(function (response) {
                if (response && response > 0) {
                    $scope.callCenterPerformance.TotalLoginAgents = response;
                }else{
                    $scope.callCenterPerformance.TotalLoginAgents = 0;
                }
            }, function (err) {
                loginService.isCheckResponse(err);
            });
        };

        $scope.getCallCenterPerformanceHistory = function () {
            if (getCountTimer) {
                $timeout.cancel(getCountTimer);
            }

            if (getTimesTimer) {
                $timeout.cancel(getTimesTimer);
            }

            dashboardService.GetCallCenterPerformanceHistory($scope.startDate, $scope.endDate).then(function (response) {
                if (response) {
                    $scope.safeApply(function() {
                        $scope.disableCurrent = false;
                        $scope.callCenterPerformance = {
                            totalInbound: response.totalInbound,
                            totalOutbound: response.totalOutbound,
                            totalQueued: response.totalQueued,
                            totalQueueAnswered: response.totalQueueAnswered,
                            totalQueueDropped: response.totalQueueDropped,
                            totalTalkTime: TimeFormatter(response.totalTalkTime),
                            totalStaffTime: TimeFormatter(response.totalStaffTime),
                            totalAcwTime: TimeFormatter(response.totalAcwTime),
                            AverageStaffTime: TimeFormatter(response.AverageStaffTime),
                            AverageAcwTime: TimeFormatter(response.AverageAcwTime),
                            AverageInboundCallsPerAgent: response.AverageInboundCallsPerAgent.toFixed(2),
                            AverageOutboundCallsPerAgent: response.AverageOutboundCallsPerAgent.toFixed(2),
                            TotalLoginAgents: response.TotalStaffCount
                        };

                        $scope.callCenterPerformanceChartConfig.data.datasets[0].data = [
                            $scope.callCenterPerformance.totalInbound,
                            $scope.callCenterPerformance.totalOutbound,
                            $scope.callCenterPerformance.totalQueued,
                            $scope.callCenterPerformance.totalQueueAnswered,
                            $scope.callCenterPerformance.totalQueueDropped
                        ];
                        window.callCenterPerformanceChart.update();
                    });

                }
            }, function (err) {
                loginService.isCheckResponse(err);
            });
        };



        var getCounts = function () {


            $q.all([
                getTotalInboundCalls(),
                getTotalOutboundCalls(),
                getTotalQueued(),
                getTotalQueueAnswered(),
                getTotalQueueDropped(),
                getAverageInboundCallsPerAgent(),
                getAverageOutboundCallsPerAgent(),
                getTotalLoginAgentCount()
            ]).then(function (response) {
                $scope.callCenterPerformanceChartConfig.data.datasets[0].data = [
                    $scope.callCenterPerformance.totalInbound,
                    $scope.callCenterPerformance.totalOutbound,
                    $scope.callCenterPerformance.totalQueued,
                    $scope.callCenterPerformance.totalQueueAnswered,
                    $scope.callCenterPerformance.totalQueueDropped
                ];
                window.callCenterPerformanceChart.update();
            });

            getCountTimer = $timeout(getCounts, 60000);
        };

        var getTimes = function () {
            getTotalTalkTime();
            getTotalStaffTime();
            getTotalAcwTime();
            getAverageStaffTime();
            getAverageAcwTime();
            getTimesTimer = $timeout(getTimes, 900000);
        };


        var getCountTimer = $timeout(getCounts, 1000);
        var getTimesTimer = $timeout(getTimes, 1000);

        $scope.loadCurrentCounts = function () {
            $scope.disableCurrent = true;
            var getCountTimer = $timeout(getCounts, 1000);
            var getTimesTimer = $timeout(getTimes, 1000);
        };


        $scope.$on("$destroy", function () {
            if (getCountTimer) {
                $timeout.cancel(getCountTimer);
            }

            if (getTimesTimer) {
                $timeout.cancel(getTimesTimer);
            }
        });

    });

}());