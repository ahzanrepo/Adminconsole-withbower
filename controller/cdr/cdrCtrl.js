/**
 * Created by dinusha on 5/28/2016.
 */

(function() {
    var app = angular.module("veeryConsoleApp");

    var cdrCtrl = function ($scope, cdrApiHandler)
    {
        $scope.cdrList = [];

        $scope.recLimit = "10";

        $scope.startDate = new Date();
        $scope.endDate = new Date();

        $scope.getProcessedCDR = function()
        {
            $scope.cdrList = [];
            var startYear = $scope.startDate.getFullYear().toString();
            var startMonth = ($scope.startDate.getMonth()+1).toString();
            var startDay = $scope.startDate.getDate().toString();

            var endYear = $scope.startDate.getFullYear().toString();
            var endMonth = ($scope.startDate.getMonth()+1).toString();
            var endDay  = $scope.startDate.getDate().toString();

            var startTime = startYear + '-' + startMonth + '-' + startDay + ' 00:00:00%2b05:30';
            var endTime = endYear + '-' + endMonth + '-' + endDay + ' 23:59:59%2b05:30';

            var lim = parseInt($scope.recLimit);

            cdrApiHandler.getCDRForTimeRange(startTime, endTime, lim, null).then(function(cdrResp)
            {
                if(!cdrResp.Exception && cdrResp.IsSuccess && cdrResp.Result)
                {
                    for(cdr in cdrResp.Result)
                    {
                        var cdrAppendObj = {};
                        var outLegProcessed = false;
                        var curCdr = cdrResp.Result[cdr];

                        var len = curCdr.length;

                        for(i=0; i<curCdr.length; i++)
                        {
                            var currCdrLeg = curCdr[i];
                            var legDirection = currCdrLeg.Direction;

                            if(legDirection === 'inbound')
                            {
                                cdrAppendObj.SipFromUser = currCdrLeg.SipFromUser;
                                cdrAppendObj.SipToUser = currCdrLeg.SipToUser;
                                cdrAppendObj.IsAnswered = currCdrLeg.IsAnswered;
                                cdrAppendObj.HangupCause = currCdrLeg.HangupCause;
                                cdrAppendObj.CreatedTime = currCdrLeg.CreatedTime;
                                cdrAppendObj.Duration = currCdrLeg.Duration;
                                cdrAppendObj.BillSec = currCdrLeg.BillSec;
                                cdrAppendObj.HoldSec = currCdrLeg.HoldSec;
                                cdrAppendObj.DVPCallDirection = currCdrLeg.DVPCallDirection;


                                if(outLegProcessed)
                                {
                                    cdrAppendObj.AnswerSec = currCdrLeg.AnswerSec;
                                }

                                if(len === 1)
                                {
                                    cdrAppendObj.ObjType = currCdrLeg.ObjType;
                                    cdrAppendObj.ObjCategory = currCdrLeg.ObjCategory;
                                }

                            }
                            else
                            {
                                cdrAppendObj.RecievedBy = currCdrLeg.SipToUser;
                                cdrAppendObj.AnswerSec = currCdrLeg.AnswerSec;

                                if(!cdrAppendObj.ObjType)
                                {
                                    cdrAppendObj.ObjType = currCdrLeg.ObjType;
                                }

                                if(!cdrAppendObj.ObjCategory)
                                {
                                    cdrAppendObj.ObjCategory = currCdrLeg.ObjCategory;
                                }

                                outLegProcessed = true;
                            }
                        }

                        $scope.cdrList.push(cdrAppendObj);
                    }

                    var dd = 3;
                }
                else
                {

                }



            }, function(err)
            {

            })

        }



    };



    app.controller("cdrCtrl", cdrCtrl);
}());