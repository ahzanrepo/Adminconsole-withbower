/**
 * Created by Pawan on 6/15/2016.
 */
/**
 * Created by Pawan on 6/15/2016.
 */

mainApp.controller("agentSummaryController", function ($scope,$filter,$state, agentSummaryBackendService) {

    $scope.startDate = moment().format("YYYY-MM-DD");
    $scope.endDate = moment().format("YYYY-MM-DD");
    $scope.dateValid = true;
    $scope.agentSummaryList = [];


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

    $scope.getAgentSummary = function () {
        $scope.agentSummaryList=[];
        agentSummaryBackendService.getAgentSummary($scope.startDate,$scope.endDate).then(function (response) {

            if(!response.data.IsSuccess)
            {
                console.log("Queue Summary loading failed ",response.data.Exception);
            }
            else
            {
                $scope.isTableLoading=1;
                var summaryData=response.data.Result
                for(var i=0;i<summaryData.length;i++)
                {
                    // main objects

                    for(var j=0;j<summaryData[i].Summary.length;j++)
                    {
                        $scope.agentSummaryList.push(summaryData[i].Summary[j]);
                    }
                }
                console.log($scope.agentSummaryList);
            }

        }, function (error) {
            console.log("Error in Queue Summary loading ",error);
        });
    }

});