/**
 * Created by Heshan.i on 10/26/2016.
 */

mainApp.controller("queueSlaBreakDownController", function ($scope,$filter,$state,$q, queueSummaryBackendService) {

    $scope.qDate = moment().format("YYYY-MM-DD");
    $scope.dateValid = true;
    $scope.queueSummaryList = [];


    $scope.onDateChange = function()
    {
        if(moment($scope.qDate, "YYYY-MM-DD").isValid())
        {
            $scope.dateValid = true;
        }
        else
        {
            $scope.dateValid = false;
        }
    };

    $scope.getQueueSummary = function () {
        $scope.queueSummaryList=[];
        queueSummaryBackendService.getQueueSlaBreakDown($scope.qDate).then(function (response) {

            if(!response.data.IsSuccess)
            {
                console.log("Queue Summary loading failed ",response.data.Exception);
            }
            else
            {
                $scope.isTableLoading=1;
                $scope.queueSummaryList = response.data.Result;

                console.log($scope.queueSummaryList);
            }

        }, function (error) {
            console.log("Error in Queue Summary loading ",error);
        });
    };


    $scope.getProcessedSlaCSVDownload = function()
    {
        var deferred = $q.defer();

        var queueSummaryListForCsv=[];
        queueSummaryBackendService.getQueueSlaBreakDown($scope.qDate).then(function (response) {

            if(!response.data.IsSuccess)
            {
                console.log("Queue Summary loading failed ",response.data.Exception);
                deferred.resolve(queueSummaryListForCsv);
            }
            else
            {
                queueSummaryListForCsv = response.data.Result;
                deferred.resolve(queueSummaryListForCsv);

                console.log(queueSummaryListForCsv);
            }

        }, function (error) {
            deferred.resolve(queueSummaryListForCsv);
            console.log("Error in Queue Summary loading ",error);
        });

        return deferred.promise;

    };

});