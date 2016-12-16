/**
 * Created by Heshan.i on 10/26/2016.
 */

mainApp.controller("queueSlaBreakDownController", function ($scope, $filter, $state, $q, queueSummaryBackendService, loginService) {

    $scope.qDate = moment().format("YYYY-MM-DD");
    $scope.dateValid = true;
    $scope.queueSummaryList = [];


    $scope.onDateChange = function () {
        if (moment($scope.qDate, "YYYY-MM-DD").isValid()) {
            $scope.dateValid = true;
        }
        else {
            $scope.dateValid = false;
        }
    };

    $scope.getQueueSummary = function () {
        $scope.queueSummaryList = [];
        $scope.isTableLoading = 0;
        queueSummaryBackendService.getQueueHourlySlaBreakDown($scope.qDate).then(function (response) {

            $scope.isTableLoading = 1;
            if (!response.data.IsSuccess) {
                console.log("Queue Summary loading failed ", response.data.Exception);
            }
            else {
                $scope.queueSummaryList = response.data.Result;


            }

        }, function (error) {
            loginService.isCheckResponse(error);
            console.log("Error in Queue Summary loading ", error);
        });
    };

    $scope.getQueueDailySummary = function () {
        $scope.dailyQueueSummaryList = [];
        $scope.isTableLoading = 0;
        queueSummaryBackendService.getQueueSlaBreakDown($scope.qDate).then(function (response) {

            $scope.isTableLoading = 1;
            if (!response.data.IsSuccess) {
                console.log("Queue Summary loading failed ", response.data.Exception);
            }
            else {
                $scope.dailyQueueSummaryList = response.data.Result;

                console.log($scope.dailyQueueSummaryList);
            }

        }, function (error) {
            loginService.isCheckResponse(error);
            console.log("Error in Queue Summary loading ", error);
        });
    };


    $scope.getProcessedSlaCSVDownload = function () {
        var deferred = $q.defer();

        var queueSummaryListForCsv = [];
        queueSummaryBackendService.getQueueHourlySlaBreakDown($scope.qDate).then(function (response) {

            if (!response.data.IsSuccess) {
                console.log("Queue Summary loading failed ", response.data.Exception);
                deferred.resolve(queueSummaryListForCsv);
            }
            else {
                queueSummaryListForCsv = response.data.Result;
                deferred.resolve(queueSummaryListForCsv);

                console.log(queueSummaryListForCsv);
            }

        }, function (error) {
            loginService.isCheckResponse(error);
            deferred.resolve(queueSummaryListForCsv);
            console.log("Error in Queue Summary loading ", error);
        });

        return deferred.promise;

    };

    var data = {
        labels: [
            "Red",
            "Blue",
            "Yellow"
        ],
        datasets: [
            {
                data: [300, 50, 100],
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ]
            }]
    };

    //Daily SLA Break Down
    //Line chart
    $scope.chartConfig = {
        type: 'pie',
        data: data,
        options: {
            responsive: false,
            title: {
                display: false
            },
            legend: {
                display: true,
                position: 'bottom',
                padding: 10,
                labels: {
                    fontColor: 'rgb(130, 152, 174)',
                    fontSize: 15,
                    boxWidth: 50
                }
            }
        }
    };

    //code update damith
    //SLA daily summary graph


    $scope.tabSelectedDaily = function () {
        $scope.dailySLAbreakObj = [];
        // get daily summary data
        queueSummaryBackendService.getQueueHourlySlaBreakDown($scope.qDate).then(function (response) {
            console.log(response);
            if (response && response.data) {
                response.data.Result.forEach(function (value, key) {
                    var chartData = {
                        name: '',
                        data: [],
                        labels: []
                    };
                    chartData.name = response.data.Result[key].Queue;
                    chartData.labels.push(response.data.Result[key].BreakDown);
                    chartData.data.push(response.data.Result[key].Average);
                    for (var i = 0; i < $scope.dailySLAbreakObj.length; i++) {
                        if ($scope.dailySLAbreakObj[i].name == chartData.name) {
                            $scope.dailySLAbreakObj[i].data.push(response.data.Result[key].Average);
                            $scope.dailySLAbreakObj[i].labels.push(response.data.Result[key].BreakDown);
                            return;
                        }
                    }
                    $scope.dailySLAbreakObj.push(chartData);
                });
                // var ctx = document.getElementById("dailyBreakDownChart").getContext("2d");
                // window.myChart = new Chart(ctx, $scope.chartConfig);
                // document.getElementById("dailyBreakDownChart").setAttribute("style", "width: 300px;height: 300px;margin-top: 15px;");
            }
        }, function (error) {
            loginService.isCheckResponse(error);
            console.log("Error in Queue Summary loading ", error);
        });
    }


    $scope.options = {
        type: 'pie',
        options: {
            responsive: false,
            title: {
                display: false
            },
            legend: {
                display: true,
                position: 'bottom',
                padding: 10,
                labels: {
                    fontColor: 'rgb(130, 152, 174)',
                    fontSize: 15,
                    boxWidth: 50
                }
            }
        }
    };

});