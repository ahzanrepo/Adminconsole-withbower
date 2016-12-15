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

                var ctx = document.getElementById("reportTab")
                var ctx = document.getElementById("dailyBreakDownChart").getContext("2d");
                window.myChart = new Chart(ctx, $scope.chartConfig);
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

    //Daily SLA Break Down
    //Line chart
    $scope.chartConfig = {
        type: 'bar',
        data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
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
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    };

    $(function () {
        /*var ctx = document.getElementById("reportTab")
        var ctx = document.getElementById("dailyBreakDownChart").getContext("2d");
        window.myChart = new Chart(ctx, $scope.chartConfig);*/
    });




});