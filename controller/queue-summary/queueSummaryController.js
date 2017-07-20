/**
 * Created by Pawan on 6/15/2016.
 */

mainApp.controller("queueSummaryController", function ($scope, $filter, $state, $q, _, queueSummaryBackendService, loginService,$anchorScroll) {

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


    /*============================== Total Queue Summary Tab =============================*/

    $scope.params2 = {
        startDate: moment().format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD")
    };
    $scope.dateValid2 = true;
    $scope.queueSummaryList2 = [];


    $scope.onDateChange2 = function () {
        if (moment($scope.params2.startDate, "YYYY-MM-DD").isValid() && moment($scope.params2.endDate, "YYYY-MM-DD").isValid()) {
            $scope.dateValid2 = true;
        }
        else {
            $scope.dateValid2 = false;
        }
    };

    var createTotalSummary = function(summaryList)
    {
        var totalSummaryList = [];
        var groupedList = _.groupBy(summaryList, function(sum)
        {
            return sum.Queue;
        });

        for(var key in groupedList)
        {
            var totalSumObj = {};
            totalSumObj.Queue = key;
            totalSumObj.TotalQueued = _.sum(groupedList[key], 'TotalQueued');
            totalSumObj.MaxTime = _.max(groupedList[key], 'MaxTime').MaxTime;
            totalSumObj.SLA = 'N/A';
            totalSumObj.QueueAnsweredPercentage = 'N/A';
            totalSumObj.QueueDroppedPercentage = 'N/A';
            totalSumObj.AverageQueueTime = 'N/A';
            if(totalSumObj.TotalQueued > 0)
            {
                totalSumObj.SLA = Math.round((((totalSumObj.TotalQueued - _.sum(groupedList[key], 'ThresholdValue'))/totalSumObj.TotalQueued)*100) * 100) / 100;
            }

            totalSumObj.QueueAnswered = _.sum(groupedList[key], 'QueueAnswered');
            if(totalSumObj.TotalQueued > 0)
            {
                totalSumObj.QueueAnsweredPercentage = Math.round((totalSumObj.QueueAnswered/totalSumObj.TotalQueued)*100, 2);
            }

            totalSumObj.QueueDropped = _.sum(groupedList[key], 'QueueDropped');

            if(totalSumObj.TotalQueued > 0)
            {
                totalSumObj.QueueDroppedPercentage = Math.round((totalSumObj.QueueDropped/totalSumObj.TotalQueued)*100, 2);
            }

            if(totalSumObj.TotalQueued > 0)
            {

                totalSumObj.AverageQueueTime = Math.round(_.sum(groupedList[key], 'TotalQueueTime')/totalSumObj.TotalQueued * 100) / 100;
            }

            totalSummaryList.push(totalSumObj);

        }

        return totalSummaryList;
    };

    $scope.getQueueSummary2 = function () {
        $scope.isTableLoading2 = 0;
        var tempQueueSummaryList = [];
        queueSummaryBackendService.getQueueSummary($scope.params2.startDate, $scope.params2.endDate).then(function (response) {

            if (!response.data.IsSuccess) {
                console.log("Queue Summary loading failed ", response.data.Exception);
                $scope.isTableLoading2 = 1;
            }
            else {
                $scope.isTableLoading2 = 1;
                var summaryData = response.data.Result;
                for (var i = 0; i < summaryData.length; i++) {
                    // main objects

                    for (var j = 0; j < summaryData[i].Summary.length; j++) {
                        summaryData[i].Summary[j].Date = moment(summaryData[i].Summary[j].Date).format('YYYY-MM-DD');
                        tempQueueSummaryList.push(summaryData[i].Summary[j]);
                    }
                }

                $scope.queueSummaryList2 = createTotalSummary(tempQueueSummaryList);


            }

        }, function (error) {
            $scope.isTableLoading2 = 1;
            loginService.isCheckResponse(error);
            console.log("Error in Queue Summary loading ", error);
        });
    }


    $scope.getQueueSummaryCSV2 = function () {

        $scope.DownloadFileName2 = 'QUEUESUMMARY_TOTAL_' + $scope.params2.startDate + '_' + $scope.params2.endDate;
        var deferred = $q.defer();
        var queueSummaryList = [];
        queueSummaryBackendService.getQueueSummary($scope.params2.startDate, $scope.params2.endDate).then(function (response) {

            if (!response.data.IsSuccess) {
                console.log("Queue Summary loading failed ", response.data.Exception);
                deferred.reject(queueSummaryList);
            }
            else {
                var summaryData = response.data.Result;
                for (var i = 0; i < summaryData.length; i++) {
                    // main objects

                    for (var j = 0; j < summaryData[i].Summary.length; j++) {
                        summaryData[i].Summary[j].Date = moment(summaryData[i].Summary[j].Date).format('YYYY-MM-DD');
                        queueSummaryList.push(summaryData[i].Summary[j]);
                    }
                }

                var queueSummaryListFinal = createTotalSummary(queueSummaryList);

                deferred.resolve(queueSummaryListFinal);

            }

        }, function (error) {
            loginService.isCheckResponse(error);
            console.log("Error in Queue Summary loading ", error);
            deferred.reject(queueSummaryList);
        });

        return deferred.promise;
    }

    /*====================================================================================*/


});