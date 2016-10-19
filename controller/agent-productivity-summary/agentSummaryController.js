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
    $scope.Agents=[];

    $scope.dtOptions = { paging: false, searching: false, info: false, order: [2, 'asc'] };


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
                        summaryData[i].Summary[j].IdleTime=TimeFromatter(summaryData[i].Summary[j].IdleTime,"HH:mm:ss");
                        summaryData[i].Summary[j].AfterWorkTime=TimeFromatter(summaryData[i].Summary[j].AfterWorkTime,"HH:mm:ss");
                        summaryData[i].Summary[j].AverageHandlingTime=TimeFromatter(summaryData[i].Summary[j].AverageHandlingTime,"HH:mm:ss");
                        summaryData[i].Summary[j].StaffTime=TimeFromatter(summaryData[i].Summary[j].StaffTime,"HH:mm:ss");
                        summaryData[i].Summary[j].TalkTime=TimeFromatter(summaryData[i].Summary[j].TalkTime,"HH:mm:ss");
                        summaryData[i].Summary[j].BreakTime=TimeFromatter(summaryData[i].Summary[j].BreakTime,"HH:mm:ss");

                        $scope.agentSummaryList.push(summaryData[i].Summary[j]);
                    }
                }
                $scope.AgentDetailsAssignToSummery();
                console.log($scope.agentSummaryList);
            }

        }, function (error) {
            console.log("Error in Queue Summary loading ",error);
        });
    }

    $scope.getAgents = function () {
        agentSummaryBackendService.getAgentDetails().then(function (response) {
            if(response.data.IsSuccess)
            {
                console.log("Agents "+response.data.Result);
                console.log(response.data.Result.length+" Agent records found");
                $scope.Agents = response.data.Result;
            }
            else
            {
                console.log("Error in Agent details picking");
            }
        }, function (error) {
            console.log("Error in Agent details picking "+error);
        });
    };

    $scope.AgentDetailsAssignToSummery = function () {


        for(var i=0;i<$scope.agentSummaryList.length;i++)
        {
            //$scope.agentSummaryList[i].AverageHandlingTime=Math.round($scope.agentSummaryList[i].AverageHandlingTime * 100) / 100;
            for(var j=0;j<$scope.Agents.length;j++)
            {
                if($scope.Agents[j].ResourceId==$scope.agentSummaryList[i].Agent)
                {
                    $scope.agentSummaryList[i].AgentName=$scope.Agents[j].ResourceName;

                }
            }
        }
    };

    var TimeFromatter = function (mins,timeFormat) {

        var secondsData = mins;


        var hourData = parseInt( secondsData / 3600 );
        if(hourData<10)
        {
            hourData="0"+hourData;
        }

        secondsData=secondsData%3600;

        var minutesData = parseInt( secondsData / 60 );
        if(minutesData<10)
        {
            minutesData="0"+minutesData;
        }
        secondsData = secondsData % 60;

        if(secondsData.length > 2)
        {
            secondsData = secondsData.substring(0,2);
        }
        secondsData=parseInt(secondsData);
        if(secondsData<10)
        {
            secondsData="0"+secondsData;
        }


        if(timeFormat=="HH:mm:ss")
        {
            return hourData+":"+minutesData+":"+secondsData;
        }
        else
        {
            return minutesData+":"+secondsData;
        }




    }

    $scope.getAgents();

});