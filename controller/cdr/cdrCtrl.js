/**
 * Created by dinusha on 5/28/2016.
 */

(function() {
    var app = angular.module("veeryConsoleApp");

    var cdrCtrl = function ($scope, cdrApiHandler)
    {
        $scope.cdrList = [];

        $scope.searchCriteria = "";

        $scope.recLimit = "10";

        $scope.top = -1;
        $scope.bottom = -1;

        $scope.startDate = new Date();
        $scope.endDate = new Date();

        $scope.offset = -1;
        $scope.prevOffset = -1;

        $scope.loadNextPage = function()
        {
            if($scope.bottom)
            {
                $scope.offset = $scope.bottom;
                $scope.prevOffset = $scope.top;
                $scope.getProcessedCDR($scope.offset);
            }

        };


        $scope.getProcessedCDR = function(offset)
        {
            if(!offset)
            {
                $scope.top = -1;
                $scope.bottom = -1;

                $scope.offset = -1;
                $scope.prevOffset = -1;
            }
            $scope.cdrList = [];
            var startYear = $scope.startDate.getFullYear().toString();
            var startMonth = ($scope.startDate.getMonth()+1).toString();
            var startDay = $scope.startDate.getDate().toString();

            var endYear = $scope.startDate.getFullYear().toString();
            var endMonth = ($scope.startDate.getMonth()+1).toString();
            var endDay  = $scope.startDate.getDate().toString();

            var startTime = startYear + '-' + startMonth + '-' + startDay + ' 00:00:00%2b05:30';
            var endTime = endYear + '-' + endMonth + '-' + endDay + ' 23:59:59%2b05:30';

            var offset = $scope.offset;

            var lim = parseInt($scope.recLimit);

            cdrApiHandler.getCDRForTimeRange(startTime, endTime, lim, offset).then(function(cdrResp)
            {
                if(!cdrResp.Exception && cdrResp.IsSuccess && cdrResp.Result)
                {
                    var topSet = false;
                    var bottomSet = false;

                    var count = 0;
                    var cdrLen = Object.keys(cdrResp.Result).length;

                    for(cdr in cdrResp.Result)
                    {
                        count++;
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
                                if(!topSet)
                                {
                                    $scope.top = currCdrLeg.id;
                                    topSet = true;
                                }

                                if(!bottomSet && count === cdrLen)
                                {
                                    $scope.bottom = currCdrLeg.id;
                                    bottomSet = true;
                                }

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
                                if(!bottomSet && count === cdrLen)
                                {
                                    $scope.bottom = currCdrLeg.id;
                                    bottomSet = true;
                                }

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