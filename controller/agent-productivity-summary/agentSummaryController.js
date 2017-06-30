/**
 * Created by Pawan on 6/15/2016.
 */
/**
 * Created by Pawan on 6/15/2016.
 */

mainApp.controller("agentSummaryController", function ($scope,$filter,$state, $q, agentSummaryBackendService,loginService,$anchorScroll) {

    $anchorScroll();
    $scope.startDate = moment().format("YYYY-MM-DD");
    $scope.endDate = moment().format("YYYY-MM-DD");
    $scope.dateValid = true;
    $scope.agentSummaryList = [];
    $scope.Agents=[];

    $scope.total={
        IdleTime: 'N/A',
        AfterWorkTime: 'N/A',
        AverageHandlingTime: 'N/A',
        StaffTime: 'N/A',
        TalkTime: 'N/A',
        TalkTimeOutbound: 'N/A',
        BreakTime: 'N/A',
        Answered: 'N/A',
        InboundCalls: 'N/A',
        OutboundCalls: 'N/A'

    };

    $scope.querySearch = function (query)
    {
        var emptyArr = [];
        if (query === "*" || query === "") {
            if ($scope.Agents) {
                return $scope.Agents;
            }
            else {
                return emptyArr;
            }

        }
        else {
            if ($scope.Agents)
            {
                return $scope.Agents.filter(function (item)
                {
                    var regEx = "^(" + query + ")";

                    if (item.ResourceName)
                    {
                        return item.ResourceName.match(regEx);
                    }
                    else
                    {
                        return false;
                    }

                });
            }
            else {
                return emptyArr;
            }
        }

    };

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
        $scope.isTableLoading=0;
        $scope.agentSummaryList=[];
        agentSummaryBackendService.getAgentSummary($scope.startDate,$scope.endDate,$scope.agentFilter.ResourceId).then(function (response) {


            if(!response.data.IsSuccess)
            {
                console.log("Queue Summary loading failed ",response.data.Exception);
                $scope.isTableLoading=1;
            }
            else
            {

                var summaryData=response.data.Result;
                var totalIdleTime = 0;
                var totalAfterWorkTime = 0;
                var totalAverageHandlingTime = 0;
                var totalStaffTime = 0;
                var totalTalkTime = 0;
                var totalTalkTimeOutbound = 0;
                var totalBreakTime = 0;
                var totalAnswered = 0;
                var totalCallsInb = 0;
                var totalCallsOut = 0;
                var count = 0;

                for(var i=0;i<summaryData.length;i++)
                {
                    // main objects

                    for(var j=0;j<summaryData[i].Summary.length;j++)
                    {
                        totalIdleTime = totalIdleTime + summaryData[i].Summary[j].IdleTime;
                        totalAfterWorkTime = totalAfterWorkTime + summaryData[i].Summary[j].AfterWorkTime;
                        totalAverageHandlingTime = totalAverageHandlingTime + summaryData[i].Summary[j].AverageHandlingTime;
                        totalStaffTime = totalStaffTime + summaryData[i].Summary[j].StaffTime;
                        totalTalkTime = totalTalkTime + summaryData[i].Summary[j].TalkTime;
                        totalTalkTimeOutbound = totalTalkTimeOutbound + summaryData[i].Summary[j].TalkTimeOutbound;
                        totalBreakTime = totalBreakTime + summaryData[i].Summary[j].BreakTime;
                        totalAnswered = totalAnswered + summaryData[i].Summary[j].TotalAnswered;
                        totalCallsInb = totalCallsInb + summaryData[i].Summary[j].TotalCalls;
                        totalCallsOut = totalCallsOut + summaryData[i].Summary[j].TotalCallsOutbound;

                        if(summaryData[i].Summary[j].AverageHandlingTime > 0)
                        {
                            count++;
                        }

                        summaryData[i].Summary[j].IdleTime=TimeFromatter(summaryData[i].Summary[j].IdleTime,"HH:mm:ss");
                        summaryData[i].Summary[j].AfterWorkTime=TimeFromatter(summaryData[i].Summary[j].AfterWorkTime,"HH:mm:ss");
                        summaryData[i].Summary[j].AverageHandlingTime=TimeFromatter(summaryData[i].Summary[j].AverageHandlingTime,"HH:mm:ss");
                        summaryData[i].Summary[j].StaffTime=TimeFromatter(summaryData[i].Summary[j].StaffTime,"HH:mm:ss");
                        summaryData[i].Summary[j].TalkTime=TimeFromatter(summaryData[i].Summary[j].TalkTime,"HH:mm:ss");
                        summaryData[i].Summary[j].TalkTimeOutbound=TimeFromatter(summaryData[i].Summary[j].TalkTimeOutbound,"HH:mm:ss");
                        summaryData[i].Summary[j].BreakTime=TimeFromatter(summaryData[i].Summary[j].BreakTime,"HH:mm:ss");



                        $scope.agentSummaryList.push(summaryData[i].Summary[j]);
                    }
                }

                $scope.total.IdleTime = TimeFromatter(totalIdleTime,"HH:mm:ss");
                $scope.total.AfterWorkTime = TimeFromatter(totalAfterWorkTime,"HH:mm:ss");
                if(count > 0)
                {
                    $scope.total.AverageHandlingTime = TimeFromatter(Math.round(totalAverageHandlingTime/count),"HH:mm:ss");
                }
                else
                {
                    $scope.total.AverageHandlingTime = TimeFromatter(totalAverageHandlingTime,"HH:mm:ss");
                }
                $scope.total.StaffTime = TimeFromatter(totalStaffTime,"HH:mm:ss");
                $scope.total.TalkTime = TimeFromatter(totalTalkTime,"HH:mm:ss");
                $scope.total.TalkTimeOutbound = TimeFromatter(totalTalkTimeOutbound,"HH:mm:ss");
                $scope.total.BreakTime = TimeFromatter(totalBreakTime,"HH:mm:ss");
                $scope.total.Answered = totalAnswered;
                $scope.total.InboundCalls = totalCallsInb;
                $scope.total.OutboundCalls = totalCallsOut;
                $scope.AgentDetailsAssignToSummery();
                console.log($scope.agentSummaryList);

                $scope.isTableLoading=1;
            }

        }, function (error) {
            loginService.isCheckResponse(error);
            console.log("Error in Queue Summary loading ",error);
            $scope.isTableLoading=1;
        });
    };

    $scope.getAgentSummaryCSV = function () {
        $scope.DownloadFileName = 'AGENT_PRODUCTIVITY_SUMMARY_' + $scope.startDate + '_' + $scope.endDate;
        var deferred = $q.defer();
        var agentSummaryList=[];
        agentSummaryBackendService.getAgentSummary($scope.startDate,$scope.endDate, $scope.agentFilter.ResourceId).then(function (response) {

            if(!response.data.IsSuccess)
            {
                console.log("Queue Summary loading failed ",response.data.Exception);
                deferred.reject(agentSummaryList);
            }
            else
            {

                var summaryData=response.data.Result;
                var totalIdleTime = 0;
                var totalAfterWorkTime = 0;
                var totalAverageHandlingTime = 0;
                var totalStaffTime = 0;
                var totalTalkTime = 0;
                var totalTalkTimeOutbound = 0;
                var totalBreakTime = 0;
                var totalAnswered = 0;
                var totalCallsInb = 0;
                var totalCallsOut = 0;
                var count = 0;

                for(var i=0;i<summaryData.length;i++)
                {
                    // main objects

                    for(var j=0;j<summaryData[i].Summary.length;j++)
                    {
                        totalIdleTime = totalIdleTime + summaryData[i].Summary[j].IdleTime;
                        totalAfterWorkTime = totalAfterWorkTime + summaryData[i].Summary[j].AfterWorkTime;
                        totalAverageHandlingTime = totalAverageHandlingTime + summaryData[i].Summary[j].AverageHandlingTime;
                        totalStaffTime = totalStaffTime + summaryData[i].Summary[j].StaffTime;
                        totalTalkTime = totalTalkTime + summaryData[i].Summary[j].TalkTime;
                        totalTalkTimeOutbound = totalTalkTimeOutbound + summaryData[i].Summary[j].TalkTimeOutbound;
                        totalBreakTime = totalBreakTime + summaryData[i].Summary[j].BreakTime;
                        totalAnswered = totalAnswered + summaryData[i].Summary[j].TotalAnswered;
                        totalCallsInb = totalCallsInb + summaryData[i].Summary[j].TotalCalls;
                        totalCallsOut = totalCallsOut + summaryData[i].Summary[j].TotalCallsOutbound;

                        if(summaryData[i].Summary[j].AverageHandlingTime > 0)
                        {
                            count++;
                        }

                        summaryData[i].Summary[j].Date = moment(summaryData[i].Summary[j].Date).format("YYYY-MM-DD");
                        summaryData[i].Summary[j].IdleTime=TimeFromatter(summaryData[i].Summary[j].IdleTime,"HH:mm:ss");
                        summaryData[i].Summary[j].AfterWorkTime=TimeFromatter(summaryData[i].Summary[j].AfterWorkTime,"HH:mm:ss");
                        summaryData[i].Summary[j].AverageHandlingTime=TimeFromatter(summaryData[i].Summary[j].AverageHandlingTime,"HH:mm:ss");
                        summaryData[i].Summary[j].StaffTime=TimeFromatter(summaryData[i].Summary[j].StaffTime,"HH:mm:ss");
                        summaryData[i].Summary[j].TalkTime=TimeFromatter(summaryData[i].Summary[j].TalkTime,"HH:mm:ss");
                        summaryData[i].Summary[j].TalkTimeOutbound=TimeFromatter(summaryData[i].Summary[j].TalkTimeOutbound,"HH:mm:ss");
                        summaryData[i].Summary[j].BreakTime=TimeFromatter(summaryData[i].Summary[j].BreakTime,"HH:mm:ss");



                        agentSummaryList.push(summaryData[i].Summary[j]);
                    }
                }

                for(var i=0;i<agentSummaryList.length;i++)
                {
                    //$scope.agentSummaryList[i].AverageHandlingTime=Math.round($scope.agentSummaryList[i].AverageHandlingTime * 100) / 100;
                    for(var j=0;j<$scope.Agents.length;j++)
                    {
                        if($scope.Agents[j].ResourceId==agentSummaryList[i].Agent)
                        {
                            agentSummaryList[i].AgentName=$scope.Agents[j].ResourceName;

                        }
                    }
                }

                var total =
                {
                    AgentName : 'Total',
                    StaffTime : TimeFromatter(totalStaffTime,"HH:mm:ss"),
                    Date: 'N/A',
                    TalkTime : TimeFromatter(totalTalkTime,"HH:mm:ss"),
                    TalkTimeOutbound : TimeFromatter(totalTalkTimeOutbound,"HH:mm:ss"),
                    TotalAnswered: totalAnswered,
                    TotalCalls: totalCallsInb,
                    TotalCallsOutbound: totalCallsOut,
                    AverageHandlingTime: TimeFromatter(Math.round(totalAverageHandlingTime/count),"HH:mm:ss"),
                    BreakTime: TimeFromatter(totalBreakTime,"HH:mm:ss"),
                    AfterWorkTime: TimeFromatter(totalAfterWorkTime,"HH:mm:ss"),
                    IdleTime: TimeFromatter(totalIdleTime,"HH:mm:ss")
                };

                if(count > 0)
                {
                    total.AverageHandlingTime = TimeFromatter(Math.round(totalAverageHandlingTime/count),"HH:mm:ss");
                }
                else
                {
                    total.AverageHandlingTime = TimeFromatter(totalAverageHandlingTime,"HH:mm:ss");
                }

                agentSummaryList.push(total);
                //$scope.AgentDetailsAssignToSummery();
                deferred.resolve(agentSummaryList);
            }

        }, function (error) {
            loginService.isCheckResponse(error);
            console.log("Error in Queue Summary loading ",error);
            deferred.reject(agentSummaryList);
        });

        return deferred.promise;
    };

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
            loginService.isCheckResponse(error);
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

        var timeStr = '00:00:00';
        if(mins > 0)
        {
            var durationObj = moment.duration(mins * 1000);

            var totalHrs = Math.floor(durationObj.asHours());

            var temphrs = '00';


            if(totalHrs > 0 && totalHrs < 10)
            {
                temphrs = '0' + totalHrs;
            }
            else if(durationObj._data.hours >= 10)
            {
                temphrs = totalHrs;
            }

            var tempmins = '00';

            if(durationObj._data.minutes > 0 && durationObj._data.minutes < 10)
            {
                tempmins = '0' + durationObj._data.minutes;
            }
            else if(durationObj._data.minutes >= 10)
            {
                tempmins = durationObj._data.minutes;
            }

            var tempsec = '00';

            if(durationObj._data.seconds > 0 && durationObj._data.seconds < 10)
            {
                tempsec = '0' + durationObj._data.seconds;
            }
            else if(durationObj._data.seconds >= 10)
            {
                tempsec = durationObj._data.seconds;
            }

            timeStr = temphrs + ':' + tempmins + ':' + tempsec;
        }

        return timeStr;

    };

    $scope.getAgents();

});