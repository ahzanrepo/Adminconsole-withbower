/**
 * Created by Heshan.i on 2/2/2017.
 */
(function(){

    var app =angular.module('veeryConsoleApp');

    var agentMissedCallDetailController = function($scope, $state, acwDetailApiAccess, loginService) {

        $scope.pageSize = 10;
        $scope.dtOptions = {paging: false, searching: false, info: false, order: [5, 'asc']};
        $scope.obj = {
            startDay: moment().format("YYYY-MM-DD"),
            endDay: moment().format("YYYY-MM-DD")
        };

        $scope.startTime = '12:00 AM';
        $scope.endTime = '11:59 PM';

        var convertToMMSS = function (sec) {
            var minutes = Math.floor(sec / 60);

            if (minutes < 10) {
                minutes = '0' + minutes;
            }

            var seconds = sec - minutes * 60;

            if (seconds < 10) {
                seconds = '0' + seconds;
            }

            return minutes + ':' + seconds;
        };

        $scope.getResourceDetails = function(){
            acwDetailApiAccess.GetResourceDetails().then(function(response){
                if(response.IsSuccess)
                {
                    $scope.resourceDetails = response.Result;
                }
                else
                {
                    var errMsg = response.CustomMessage;

                    if(response.Exception)
                    {
                        errMsg = response.Exception.Message;
                    }
                    $scope.showAlert('Missed Call Details', errMsg, 'error');
                }
            }, function(err){
                loginService.isCheckResponse(err);
                var errMsg = "Error occurred while loading resource details";
                if(err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Missed Call Details', errMsg, 'error');
            });
        };

        $scope.getRejectedSummery = function(){
            $scope.rejectedSessionCount = 0;

            $scope.showPaging = false;
            $scope.currentPage = 1;


            $scope.obj.isTableLoading = 0;

            $scope.allMissedCallRecords = [];


            var st = moment($scope.startTime, ["h:mm A"]).format("HH:mm");
            var et = moment($scope.endTime, ["h:mm A"]).format("HH:mm");
            $scope.obj.isTableLoading = 0;
            var momentTz = moment.parseZone(new Date()).format('Z');
            momentTz = momentTz.replace("+", "%2B");

            var startDate = $scope.obj.startDay + ' ' + st + ':00' + momentTz;
            var endDate = $scope.obj.endDay + ' ' + et + ':59' + momentTz;

            acwDetailApiAccess.GetRejectedSessionCount($scope.obj.resourceId, startDate, endDate).then(function(response){
                if(response.IsSuccess)
                {
                    if(response.Result) {
                        $scope.rejectedSessionCount = response.Result?response.Result:0;
                        $scope.getMissedCallDetails($scope.currentPage);
                    }else{
                        $scope.obj.isTableLoading = 2;
                    }

                }
                else
                {
                    var errMsg = response.CustomMessage;

                    if(response.Exception)
                    {
                        errMsg = response.Exception.Message;
                    }
                    $scope.showAlert('Missed Call Details', errMsg, 'error');
                }
            }, function(err){
                loginService.isCheckResponse(err);
                var errMsg = "Error occurred while loading Missed Call records";
                if(err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Missed Call Details', errMsg, 'error');
            });
        };

        $scope.getMissedCallDetails = function(pageNo){
            $scope.currentPage = pageNo;
            var st = moment($scope.startTime, ["h:mm A"]).format("HH:mm");
            var et = moment($scope.endTime, ["h:mm A"]).format("HH:mm");
            var momentTz = moment.parseZone(new Date()).format('Z');
            momentTz = momentTz.replace("+", "%2B");

            var startDate = $scope.obj.startDay + ' ' + st + ':00' + momentTz;
            var endDate = $scope.obj.endDay + ' ' + et + ':59' + momentTz;

            acwDetailApiAccess.GetRejectedSessionDetails($scope.obj.resourceId, $scope.currentPage, $scope.pageSize, startDate, endDate).then(function(response){
                if(response.IsSuccess)
                {
                    $scope.missedCallRecords = response.Result;
                    var sessionIds = [];
                    if($scope.missedCallRecords && $scope.missedCallRecords.length > 0){
                        sessionIds = $scope.missedCallRecords.map(function (record) {
                            return record.SessionId
                        });

                        $scope.getCdrRecords(sessionIds);

                        if($scope.missedCallRecords.length < $scope.pageSize){
                            $scope.showPaging = false;
                        }else{
                            $scope.showPaging = true;
                        }
                    }else{
                        $scope.obj.isTableLoading = 1;
                        $scope.showPaging = false;
                    }
                }
                else
                {
                    var errMsg = response.CustomMessage;

                    if(response.Exception)
                    {
                        errMsg = response.Exception.Message;
                    }
                    $scope.showAlert('Missed Call Details', errMsg, 'error');
                }
            }, function(err){
                loginService.isCheckResponse(err);
                var errMsg = "Error occurred while loading Missed Call records";
                if(err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Missed Call Details', errMsg, 'error');
            });
        };

        $scope.getCdrRecords = function(sessionIds){
            acwDetailApiAccess.GetCdrBySessions(sessionIds).then(function(response){
                if(response.IsSuccess)
                {

                    var newRecords = $scope.missedCallRecords.map(function (missedCallRecord) {
                        if(response.Result) {
                            for (var i = 0; i < response.Result.length; i++) {
                                var cdrRecord = response.Result[i];
                                if (cdrRecord.Uuid === missedCallRecord.SessionId) {
                                    cdrRecord.QueueSec = convertToMMSS(cdrRecord.QueueSec);
                                    if (cdrRecord.DVPCallDirection === "outbound") {
                                        var oriFrom = angular.copy(cdrRecord.SipFromUser);
                                        var oriTo = angular.copy(cdrRecord.SipToUser);
                                        cdrRecord.SipFromUser = oriTo;
                                        cdrRecord.SipToUser = oriFrom;
                                    }
                                    missedCallRecord.cdrInfo = cdrRecord;
                                    break;
                                }
                            }
                        }

                        return missedCallRecord;
                    });
                    $scope.obj.isTableLoading = 1;
                    $scope.allMissedCallRecords = newRecords;
                }
                else
                {
                    var errMsg = response.CustomMessage;

                    if(response.Exception)
                    {
                        errMsg = response.Exception.Message;
                    }
                    $scope.showAlert('Missed Call Details', errMsg, 'error');
                }
            }, function(err){
                loginService.isCheckResponse(err);
                var errMsg = "Error occurred while loading CDR details";
                if(err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Missed Call Details', errMsg, 'error');
            });
        };

        $scope.getResourceDetails();

    };

    app.controller('agentMissedCallDetailController', agentMissedCallDetailController);
}());