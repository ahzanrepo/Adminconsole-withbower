/**
 * Created by Pawan on 11/22/2016.
 */

mainApp.controller("billingHistoryController", function ($scope,$filter,$state, $q,loginService,billingHistoryService) {

    $scope.startDate = moment().format("YYYY-MM-DD");
    $scope.endDate = moment().format("YYYY-MM-DD");
    $scope.dateValid = true;
    $scope.agentSummaryList = [];
    $scope.Agents=[];
    $scope.summaryData=[];
    $scope.pageNo=1;
    $scope.rowCount=5;

    $scope.dtOptions = { paging: false, searching: false, info: false, order: [2, 'asc'] };




    var momentTz = moment.parseZone(new Date()).format('Z');
    momentTz = momentTz.replace("+", "%2B");

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


    $scope.getBillHistoryCSV = function () {


        $scope.DownloadFileName = 'BILL_HISTORY_SUMMARY_' + $scope.startDate + '_' + $scope.endDate;
        var deferred = $q.defer();

        var billData = $scope.summaryData.map(function (c,index) {
            c.description = c.OtherJsonData.msg;
            if(c.OtherJsonData.amount)
            {
                c.Payment= c.OtherJsonData.amount;
            }
            else
            {
                c.Payment=0;
            }


            return c;
        });


        //$scope.AgentDetailsAssignToSummery();
        deferred.resolve(billData);

        return deferred.promise;


        /*$scope.historyList=[];
        billingHistoryService.getBillingHistory($scope.rowCount,$scope.pageNo).then(function (response) {

            if(!response.data.IsSuccess)
            {
                console.log("Bill history loading failed ",response.data.Exception);
                deferred.reject($scope.summaryData);
            }
            else
            {
                $scope.isTableLoading=1;

                var NewSummaryData=$scope.summaryData.concat(response.data.Result);
                $scope.summaryData=NewSummaryData;


                var billData = $scope.summaryData.map(function (c,index) {
                    c.description = c.OtherJsonData.msg;
                    return c;
                });


                //$scope.AgentDetailsAssignToSummery();
                deferred.resolve(billData);
            }

        }, function (error) {
            loginService.isCheckResponse(error);
            console.log("Error in Queue Summary loading ",error);
            deferred.reject(agentSummaryList);
        });

        return deferred.promise;*/
    }



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

    //$scope.getAgents();

    $scope.getBillingHistory = function () {

        billingHistoryService.getBillingHistory($scope.rowCount,$scope.pageNo).then(function (response) {

            if(!response.data.IsSuccess)
            {
                console.log("Bill History loading failed ",response.data.Exception);
            }
            else
            {
                $scope.isTableLoading=1;
                if(response.data.Result)
                {
                    $scope.summaryData=$scope.summaryData.concat(response.data.Result);
                    $scope.pageNo+=1;
                }


            }

        }, function (error) {
            console.log("Error in Bill History loading ",error);
        })
    };



    $scope.getBillingHistory();

});