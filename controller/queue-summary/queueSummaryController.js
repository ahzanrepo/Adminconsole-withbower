/**
 * Created by Pawan on 6/15/2016.
 */

mainApp.controller("queueSummaryController", function ($scope, $filter, $state, $q, queueSummaryBackendService, loginService,$anchorScroll) {

    $anchorScroll();
    $scope.params = {
        startDate: moment().format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD")
    };
    $scope.dateValid = true;
    $scope.queueSummaryList = [];


    $scope.onDateChange = function () {
        if (moment($scope.params.startDate, "YYYY-MM-DD").isValid() && moment($scope.params.endDate, "YYYY-MM-DD").isValid()) {
            $scope.dateValid = true;
        }
        else {
            $scope.dateValid = false;
        }
    };

    var createTotalSummary = function(summaryList)
    {
        var groupedList = _.groupBy(summaryList, function(sum)
        {
            return sum.Queue;
        });

        console.log(groupedList);
    };

    $scope.getQueueSummary = function () {
        $scope.isTableLoading = 0;
        $scope.queueSummaryList = [];
        queueSummaryBackendService.getQueueSummary($scope.params.startDate, $scope.params.endDate).then(function (response) {

            if (!response.data.IsSuccess) {
                console.log("Queue Summary loading failed ", response.data.Exception);
                $scope.isTableLoading = 1;
            }
            else {
                $scope.isTableLoading = 1;
                var summaryData = response.data.Result;
                for (var i = 0; i < summaryData.length; i++) {
                    // main objects

                    for (var j = 0; j < summaryData[i].Summary.length; j++) {
                        summaryData[i].Summary[j].SLA = Math.round(summaryData[i].Summary[j].SLA * 100) / 100;
                        summaryData[i].Summary[j].AverageQueueTime = Math.round(summaryData[i].Summary[j].AverageQueueTime * 100) / 100;
                        summaryData[i].Summary[j].QueueAnsweredPercentage = Math.round((summaryData[i].Summary[j].QueueAnswered/summaryData[i].Summary[j].TotalQueued)*100, 2);
                        summaryData[i].Summary[j].QueueDroppedPercentage = Math.round((summaryData[i].Summary[j].QueueDropped/summaryData[i].Summary[j].TotalQueued)*100, 2);
                        $scope.queueSummaryList.push(summaryData[i].Summary[j]);
                    }
                }

                createTotalSummary($scope.queueSummaryList);

                
            }

        }, function (error) {
            $scope.isTableLoading = 1;
            loginService.isCheckResponse(error);
            console.log("Error in Queue Summary loading ", error);
        });
    }


    $scope.getQueueSummaryCSV = function () {

        $scope.DownloadFileName = 'QUEUESUMMARY_' + $scope.params.startDate + '_' + $scope.params.endDate;
        var deferred = $q.defer();
        var queueSummaryList = [];
        queueSummaryBackendService.getQueueSummary($scope.params.startDate, $scope.params.endDate).then(function (response) {

            if (!response.data.IsSuccess) {
                console.log("Queue Summary loading failed ", response.data.Exception);
                deferred.reject(queueSummaryList);
            }
            else {
                var summaryData = response.data.Result
                for (var i = 0; i < summaryData.length; i++) {
                    // main objects

                    for (var j = 0; j < summaryData[i].Summary.length; j++) {
                        summaryData[i].Summary[j].SLA = Math.round(summaryData[i].Summary[j].SLA * 100) / 100;
                        summaryData[i].Summary[j].AverageQueueTime = Math.round(summaryData[i].Summary[j].AverageQueueTime * 100) / 100;
                        summaryData[i].Summary[j].QueueAnsweredPercentage = Math.round((summaryData[i].Summary[j].QueueAnswered/summaryData[i].Summary[j].TotalQueued)*100, 2);
                        summaryData[i].Summary[j].QueueDroppedPercentage = Math.round((summaryData[i].Summary[j].QueueDropped/summaryData[i].Summary[j].TotalQueued)*100, 2);
                        summaryData[i].Summary[j].Date = moment(summaryData[i].Summary[j].Date).format('YYYY-MM-DD');
                        queueSummaryList.push(summaryData[i].Summary[j]);
                    }
                }

                deferred.resolve(queueSummaryList);

            }

        }, function (error) {
            loginService.isCheckResponse(error);
            console.log("Error in Queue Summary loading ", error);
            deferred.reject(queueSummaryList);
        });

        return deferred.promise;
    }

});