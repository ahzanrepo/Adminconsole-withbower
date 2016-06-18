/**
 * Created by dinusha on 5/28/2016.
 */

(function () {
    var app = angular.module("veeryConsoleApp");

    var cdrCtrl = function ($scope, $filter, cdrApiHandler, ngAudio) {


        $scope.showAlert = function (tittle, type, content) {

            new PNotify({
                title: tittle,
                text: content,
                type: type,
                styling: 'bootstrap3'
            });
        };

        $scope.startTimeNow = '00:00';
        $scope.endTimeNow = '00:00';




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

        $scope.currentPlayingFile = null;

        $scope.hstep = 1;
        $scope.mstep = 15;


        $scope.SetDownloadPath = function(uuid)
        {
            $scope.DownloadFileUrl = 'http://internalfileservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/FileService/File/DownloadLatest/1/3/' + uuid + '.wav';
        };

        $scope.playStopFile = function (uuid, playState, stopState) {
            if (playState) {


                if ($scope.currentPlayingFile) {
                    $scope.fileToPlay.stop();
                }
                $scope.currentPlayingFile = uuid;

                $scope.fileToPlay = ngAudio.load('http://internalfileservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/FileService/File/DownloadLatest/1/3/' + uuid + '.wav');

                $scope.fileToPlay.play();
            }
            else if (stopState) {
                $scope.currentPlayingFile = null;

                $scope.fileToPlay.stop();
            }


        };

        //set loagin option
        $scope.isTableLoading = 3;
        $scope.cdrList = [];

        var pageStack = [];

        var pageInfo = {};

        $scope.searchCriteria = "";

        $scope.recLimit = "10";

        $scope.isPreviousDisabled = true;
        $scope.isNextDisabled = true;

        $scope.top = -1;
        $scope.bottom = -1;

        $scope.startDate = moment().format("YYYY-MM-DD");
        $scope.endDate = moment().format("YYYY-MM-DD");
        $scope.dateValid = true;

        $scope.offset = -1;
        $scope.prevOffset = -1;

        $scope.loadNextPage = function () {
            var pageInfo = {
                top: $scope.top,
                bottom: $scope.bottom
            };
            pageStack.push(pageInfo);
            $scope.getProcessedCDR(pageInfo.bottom, false);

        };

        $scope.loadPreviousPage = function () {
            var prevPage = pageStack.pop();

            $scope.getProcessedCDR(prevPage.top - 1, false);

        };

        var isEmpty = function (map) {
            for (var key in map) {
                if (map.hasOwnProperty(key)) {
                    return false;
                }
            }
            return true;
        };





        $scope.getProcessedCDR = function (offset, reset) {

            try
            {
                if (reset)
                {
                    pageStack = [];
                    $scope.top = -1;
                    $scope.bottom = -1;
                    pageInfo.top = -1;
                    pageInfo.bottom = -1;
                }
                $scope.cdrList = [];

                $scope.isNextDisabled = true;
                $scope.isPreviousDisabled = true;


                var startDateMoment = moment($scope.startDate, "YYYY-MM-DD");
                var endDateMoment = moment($scope.endDate, "YYYY-MM-DD");

                var startYear = startDateMoment.year().toString();
                var startMonth = (startDateMoment.month() + 1).toString();
                var startDay = startDateMoment.date().toString();

                var endYear = endDateMoment.year().toString();
                var endMonth = (endDateMoment.month() + 1).toString();
                var endDay = endDateMoment.date().toString();

                var momentTz = moment.parseZone(new Date()).format('Z');
                //var encodedTz = encodeURI(momentTz);
                momentTz = momentTz.replace("+", "%2B");

                var startTime = startYear + '-' + startMonth + '-' + startDay + ' ' + $scope.startTimeNow + ':00' + momentTz;
                var endTime = endYear + '-' + endMonth + '-' + endDay + ' ' + $scope.endTimeNow + ':59' + momentTz;

                if($scope.startTimeNow === '00:00' && $scope.endTimeNow === '00:00')
                {
                    //use date only
                    startTime = startYear + '-' + startMonth + '-' + startDay + ' 00:00:00' + momentTz;
                    endTime = endYear + '-' + endMonth + '-' + endDay + ' 23:59:59' + momentTz;
                }


                var lim = parseInt($scope.recLimit);
                $scope.isTableLoading = 0;
                cdrApiHandler.getCDRForTimeRange(startTime, endTime, lim, offset).then(function (cdrResp) {
                    if (!cdrResp.Exception && cdrResp.IsSuccess && cdrResp.Result) {
                        if (!isEmpty(cdrResp.Result)) {
                            var topSet = false;
                            var bottomSet = false;

                            var count = 0;
                            var cdrLen = Object.keys(cdrResp.Result).length;

                            for (cdr in cdrResp.Result)
                            {
                                count++;
                                var cdrAppendObj = {};
                                var outLegProcessed = false;
                                var curCdr = cdrResp.Result[cdr];
                                var isInboundHTTAPI = false;

                                var callHangupDirectionA = '';
                                var callHangupDirectionB = '';

                                var len = curCdr.length;


                                //Need to filter out inbound and outbound legs before processing

                                var filteredInb = curCdr.filter(function (item)
                                {
                                    if(item.Direction === 'inbound')
                                    {
                                        return true;
                                    }
                                    else
                                    {
                                        return false;
                                    }

                                });

                                var filteredOutb = curCdr.filter(function (item)
                                {
                                    if(item.Direction === 'outbound')
                                    {
                                        return true;
                                    }
                                    else
                                    {
                                        return false;
                                    }

                                });


                                //process inbound legs first

                                for(i=0; i < filteredInb.length; i++)
                                {
                                    var curProcessingLeg = filteredInb[i];

                                    if (curProcessingLeg.DVPCallDirection)
                                    {
                                        callHangupDirectionA = curProcessingLeg.HangupDisposition;
                                    }


                                    //use the counts in inbound leg
                                    if (!topSet)
                                    {
                                        $scope.top = curProcessingLeg.id;
                                        topSet = true;
                                    }

                                    if (!bottomSet && count === cdrLen)
                                    {
                                        $scope.bottom = curProcessingLeg.id;
                                        bottomSet = true;
                                    }

                                    cdrAppendObj.Uuid = curProcessingLeg.Uuid;
                                    cdrAppendObj.SipFromUser = curProcessingLeg.SipFromUser;
                                    cdrAppendObj.SipToUser = curProcessingLeg.SipToUser;
                                    cdrAppendObj.IsAnswered = curProcessingLeg.IsAnswered;
                                    cdrAppendObj.HangupCause = curProcessingLeg.HangupCause;

                                    var localTime = moment(curProcessingLeg.CreatedTime).local().format("YYYY-MM-DD HH:mm:ss");

                                    cdrAppendObj.CreatedTime = localTime;
                                    cdrAppendObj.Duration = curProcessingLeg.Duration;
                                    cdrAppendObj.BillSec = curProcessingLeg.BillSec;
                                    cdrAppendObj.HoldSec = curProcessingLeg.HoldSec;

                                    cdrAppendObj.QueueSec = curProcessingLeg.QueueSec;
                                    cdrAppendObj.AgentSkill = curProcessingLeg.AgentSkill;

                                    cdrAppendObj.DVPCallDirection = curProcessingLeg.DVPCallDirection;
                                    cdrAppendObj.AnswerSec = curProcessingLeg.AnswerSec;


                                    if (curProcessingLeg.ObjType === 'HTTAPI')
                                    {
                                        isInboundHTTAPI = true;
                                    }

                                    if (len === 1)
                                    {
                                        cdrAppendObj.ObjType = curProcessingLeg.ObjType;
                                        cdrAppendObj.ObjCategory = curProcessingLeg.ObjCategory;
                                    }


                                }

                                //process outbound legs next


                                for(j=0; j< filteredOutb.length; j++)
                                {
                                    var curProcessingLeg = filteredOutb[j];

                                    callHangupDirectionB = curProcessingLeg.HangupDisposition;

                                    var dvpCallDirection = curProcessingLeg.DVPCallDirection;

                                    if (!bottomSet && count === cdrLen) {
                                        $scope.bottom = curProcessingLeg.id;
                                        bottomSet = true;
                                    }

                                    cdrAppendObj.RecievedBy = curProcessingLeg.SipToUser;
                                    cdrAppendObj.AnswerSec = curProcessingLeg.AnswerSec;

                                    if(dvpCallDirection === 'outbound')
                                    {
                                        cdrAppendObj.Duration = curProcessingLeg.Duration;
                                        cdrAppendObj.BillSec = curProcessingLeg.BillSec;
                                        cdrAppendObj.HoldSec = curProcessingLeg.HoldSec;
                                    }

                                    if (!cdrAppendObj.ObjType) {
                                        cdrAppendObj.ObjType = curProcessingLeg.ObjType;
                                    }

                                    if (!cdrAppendObj.ObjCategory) {
                                        cdrAppendObj.ObjCategory = curProcessingLeg.ObjCategory;
                                    }

                                    outLegProcessed = true;
                                }

                                if(callHangupDirectionA === 'recv_bye')
                                {
                                    cdrAppendObj.HangupParty = 'CALLER';
                                }
                                else if(callHangupDirectionB === 'recv_bye')
                                {
                                    cdrAppendObj.HangupParty = 'CALLEE';
                                }
                                else
                                {
                                    cdrAppendObj.HangupParty = 'SYSTEM';
                                }


                                /*for (i = 0; i < curCdr.length; i++)
                                {
                                    var currCdrLeg = curCdr[i];
                                    var legDirection = currCdrLeg.Direction;

                                    if (legDirection === 'inbound')
                                    {
                                        if (!topSet)
                                        {
                                            $scope.top = currCdrLeg.id;
                                            topSet = true;
                                        }

                                        if (!bottomSet && count === cdrLen)
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


                                        if (!outLegProcessed) {
                                            cdrAppendObj.AnswerSec = currCdrLeg.AnswerSec;
                                        }

                                        if (currCdrLeg.ObjType === 'HTTAPI') {
                                            isInboundHTTAPI = true;
                                        }

                                        if (len === 1) {
                                            cdrAppendObj.ObjType = currCdrLeg.ObjType;
                                            cdrAppendObj.ObjCategory = currCdrLeg.ObjCategory;
                                        }

                                    }
                                    else {
                                        if (!bottomSet && count === cdrLen) {
                                            $scope.bottom = currCdrLeg.id;
                                            bottomSet = true;
                                        }

                                        cdrAppendObj.RecievedBy = currCdrLeg.SipToUser;
                                        cdrAppendObj.AnswerSec = currCdrLeg.AnswerSec;

                                        if (!cdrAppendObj.ObjType) {
                                            cdrAppendObj.ObjType = currCdrLeg.ObjType;
                                        }

                                        if (!cdrAppendObj.ObjCategory) {
                                            cdrAppendObj.ObjCategory = currCdrLeg.ObjCategory;
                                        }

                                        outLegProcessed = true;
                                    }
                                }*/

                                if (isInboundHTTAPI && outLegProcessed && cdrAppendObj.AnswerSec) {
                                    cdrAppendObj.ShowButton = true;
                                }


                                $scope.cdrList.push(cdrAppendObj);
                            }

                            if (pageStack.length === 0) {
                                $scope.isNextDisabled = false;
                                $scope.isPreviousDisabled = true;
                            }
                            else if (pageStack.length > 0) {
                                $scope.isPreviousDisabled = false;
                                $scope.isNextDisabled = false;
                            }

                            $scope.isTableLoading = 1;
                        }
                        else {
                            $scope.showAlert('Info', 'info', 'No records to load');

                            if (pageStack.length > 0) {
                                $scope.isPreviousDisabled = false;
                                $scope.isNextDisabled = true;
                            }
                            $scope.isNextDisabled = true;
                            $scope.isTableLoading = 1;
                        }


                    }
                    else {
                        $scope.showAlert('Error', 'error', 'Error occurred while loading cdr list');
                        $scope.isTableLoading = 1;
                    }


                }, function (err) {
                    $scope.showAlert('Error', 'error', 'ok', 'Error occurred while loading cdr list');
                    $scope.isTableLoading = 1;
                })
            }
            catch (ex) {
                $scope.showAlert('Error', 'error', 'ok', 'Error occurred while loading cdr list');
                $scope.isTableLoading = 1;
            }
        }


    };
    app.controller("cdrCtrl", cdrCtrl);

}());


