/**
 * Created by dinusha on 5/28/2016.
 */

(function() {
    var app = angular.module("veeryConsoleApp");

    var cdrCtrl = function ($scope, cdrApiHandler, ngAudio)
    {
        $scope.currentPlayingFile = null;

        $scope.playStopFile = function(uuid, playState, stopState)
        {
            if(playState)
            {
                $scope.currentPlayingFile = uuid;

                $scope.fileToPlay = ngAudio.load('http://internalfileservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/FileService/File/DownloadLatest/1/3/' + uuid + '.wav');

                $scope.fileToPlay.play();
            }
            else if(stopState)
            {
                $scope.currentPlayingFile = null;

                $scope.fileToPlay.stop();
            }


        };

        $scope.cdrList = [];

        var pageStack = [];

        var pageInfo = {
        };

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
            var pageInfo = {
                top: $scope.top,
                bottom: $scope.bottom
            };
            pageStack.push(pageInfo);
            $scope.getProcessedCDR(pageInfo.bottom, false);

        };

        $scope.loadPreviousPage = function()
        {
            var prevPage = pageStack.pop();

            $scope.getProcessedCDR(prevPage.top - 1, false);

        };


        $scope.getProcessedCDR = function(offset, reset)
        {
            if(reset)
            {
                pageStack = [];
                $scope.top = -1;
                $scope.bottom = -1;
                pageInfo.top = -1;
                pageInfo.bottom = -1;
            }
            $scope.cdrList = [];
            var startYear = $scope.startDate.getFullYear().toString();
            var startMonth = ($scope.startDate.getMonth()+1).toString();
            var startDay = $scope.startDate.getDate().toString();

            var endYear = $scope.startDate.getFullYear().toString();
            var endMonth = ($scope.startDate.getMonth()+1).toString();
            var endDay  = $scope.startDate.getDate().toString();

            var momentTz = moment.parseZone(new Date()).format('Z');
            //var encodedTz = encodeURI(momentTz);
            momentTz = momentTz.replace("+", "%2B");

            var startTime = startYear + '-' + startMonth + '-' + startDay + ' 00:00:00' + momentTz;
            var endTime = endYear + '-' + endMonth + '-' + endDay + ' 23:59:59' + momentTz;

            //var offset = $scope.offset;

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
                        var isInboundHTTAPI = false;

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

                                cdrAppendObj.Uuid = currCdrLeg.Uuid;
                                cdrAppendObj.SipFromUser = currCdrLeg.SipFromUser;
                                cdrAppendObj.SipToUser = currCdrLeg.SipToUser;
                                cdrAppendObj.IsAnswered = currCdrLeg.IsAnswered;
                                cdrAppendObj.HangupCause = currCdrLeg.HangupCause;

                                var localTime = moment(currCdrLeg.CreatedTime).local().format("YYYY-MM-DD HH:mm:ss");

                                cdrAppendObj.CreatedTime = localTime;
                                cdrAppendObj.Duration = currCdrLeg.Duration;
                                cdrAppendObj.BillSec = currCdrLeg.BillSec;
                                cdrAppendObj.HoldSec = currCdrLeg.HoldSec;
                                cdrAppendObj.DVPCallDirection = currCdrLeg.DVPCallDirection;


                                if(!outLegProcessed)
                                {
                                    cdrAppendObj.AnswerSec = currCdrLeg.AnswerSec;
                                }

                                if(currCdrLeg.ObjType === 'HTTAPI')
                                {
                                    isInboundHTTAPI = true;
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

                        if(isInboundHTTAPI && outLegProcessed && cdrAppendObj.AnswerSec)
                        {
                            cdrAppendObj.ShowButton = true;
                        }


                        $scope.cdrList.push(cdrAppendObj);
                    }


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