/**
 * Created by dinusha on 5/28/2016.
 */

(function ()
{
    var app = angular.module("veeryConsoleApp");

    var cdrCtrl = function ($scope, $filter, $q, cdrApiHandler, ngAudio, loginService)
    {

        $scope.enableSearchButton = true;


        $scope.showAlert = function (tittle, type, content)
        {

            new PNotify({
                title: tittle,
                text: content,
                type: type,
                styling: 'bootstrap3'
            });
        };

        $scope.startTimeNow = '00:00';
        $scope.endTimeNow = '00:00';


        $scope.onDateChange = function ()
        {
            if (moment($scope.startDate, "YYYY-MM-DD").isValid() && moment($scope.endDate, "YYYY-MM-DD").isValid())
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


        $scope.SetDownloadPath = function (uuid)
        {
            var decodedToken = loginService.getTokenDecode();

            if (decodedToken && decodedToken.company && decodedToken.tenant)
            {
                $scope.DownloadFileUrl = 'http://fileservice.app.veery.cloud/DVP/API/1.0.0.0/InternalFileService/File/DownloadLatest/' + decodedToken.tenant + '/' + decodedToken.company + '/' + uuid + '.mp3';
            }

        };

        $scope.playStopFile = function (uuid, playState, stopState)
        {
            if (playState)
            {

                if ($scope.currentPlayingFile)
                {
                    $scope.fileToPlay.stop();
                }
                $scope.currentPlayingFile = uuid;

                var decodedToken = loginService.getTokenDecode();

                if (decodedToken && decodedToken.company && decodedToken.tenant)
                {
                    $scope.fileToPlay = ngAudio.load('http://fileservice.app.veery.cloud/DVP/API/1.0.0.0/InternalFileService/File/DownloadLatest/' + decodedToken.tenant + '/' + decodedToken.company + '/' + uuid + '.mp3');

                    $scope.fileToPlay.play();
                }


            }
            else if (stopState)
            {
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

        $scope.loadNextPage = function ()
        {
            var pageInfo = {
                top: $scope.top,
                bottom: $scope.bottom
            };
            pageStack.push(pageInfo);
            $scope.getProcessedCDR(pageInfo.bottom, false);

        };

        $scope.loadPreviousPage = function ()
        {
            var prevPage = pageStack.pop();

            $scope.getProcessedCDR(prevPage.top - 1, false);

        };

        var isEmpty = function (map)
        {
            for (var key in map)
            {
                if (map.hasOwnProperty(key))
                {
                    return false;
                }
            }
            return true;
        };

        var convertToMMSS = function(sec)
        {
            var minutes = Math.floor(sec / 60);

            if(minutes < 10)
            {
                minutes = '0' + minutes;
            }

            var seconds = sec - minutes * 60;

            if(seconds < 10)
            {
                seconds = '0' + seconds;
            }

            return minutes + ':' + seconds;
        };


        $scope.getProcessedCDRForCSV = function ()
        {

            $scope.DownloadFileName = 'CDR_' + $scope.startDate + ' ' + $scope.startTimeNow + '_' + $scope.endDate + ' ' + $scope.endTimeNow;

            var deferred = $q.defer();

            var cdrListForCSV = [];

            try
            {

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

                if ($scope.startTimeNow === '00:00' && $scope.endTimeNow === '00:00')
                {
                    //use date only
                    startTime = startYear + '-' + startMonth + '-' + startDay + ' 00:00:00' + momentTz;
                    endTime = endYear + '-' + endMonth + '-' + endDay + ' 23:59:59' + momentTz;
                }


                var lim = parseInt($scope.recLimit);
                cdrApiHandler.getCDRForTimeRange(startTime, endTime, 0, 0, $scope.agentFilter, $scope.skillFilter, $scope.directionFilter, $scope.recFilter).then(function (cdrResp)
                {
                    if (!cdrResp.Exception && cdrResp.IsSuccess && cdrResp.Result)
                    {
                        if (!isEmpty(cdrResp.Result))
                        {
                            var count = 0;
                            var cdrLen = Object.keys(cdrResp.Result).length;

                            for (cdr in cdrResp.Result)
                            {
                                count++;
                                var cdrAppendObj = {};
                                var outLegProcessed = false;
                                var curCdr = cdrResp.Result[cdr];
                                var isInboundHTTAPI = false;
                                var outLegAnswered = false;

                                var callHangupDirectionA = '';
                                var callHangupDirectionB = '';

                                var len = curCdr.length;


                                //Need to filter out inbound and outbound legs before processing

                                var filteredInb = curCdr.filter(function (item)
                                {
                                    if (item.Direction === 'inbound')
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
                                    if (item.Direction === 'outbound')
                                    {
                                        return true;
                                    }
                                    else
                                    {
                                        return false;
                                    }

                                });


                                //process inbound legs first

                                for (i = 0; i < filteredInb.length; i++)
                                {
                                    var curProcessingLeg = filteredInb[i];

                                    if (curProcessingLeg.DVPCallDirection)
                                    {
                                        callHangupDirectionA = curProcessingLeg.HangupDisposition;
                                    }



                                    cdrAppendObj.Uuid = curProcessingLeg.Uuid;
                                    cdrAppendObj.SipFromUser = curProcessingLeg.SipFromUser;
                                    cdrAppendObj.SipToUser = curProcessingLeg.SipToUser;
                                    cdrAppendObj.IsAnswered = false;

                                    cdrAppendObj.HangupCause = curProcessingLeg.HangupCause;

                                    var localTime = moment(curProcessingLeg.CreatedTime).local().format("YYYY-MM-DD HH:mm:ss");

                                    cdrAppendObj.CreatedTime = localTime;
                                    cdrAppendObj.Duration = curProcessingLeg.Duration;
                                    cdrAppendObj.BillSec = 0;
                                    cdrAppendObj.HoldSec = 0;

                                    cdrAppendObj.DVPCallDirection = curProcessingLeg.DVPCallDirection;

                                    if (cdrAppendObj.DVPCallDirection === 'inbound')
                                    {
                                        var holdSecTemp = curProcessingLeg.HoldSec + curProcessingLeg.WaitSec;
                                        cdrAppendObj.HoldSec = holdSecTemp;
                                    }


                                    cdrAppendObj.QueueSec = curProcessingLeg.QueueSec;
                                    cdrAppendObj.AgentSkill = curProcessingLeg.AgentSkill;


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

                                var transferredParties = '';

                                var transferCallOriginalCallLeg = null;

                                var transferLegB = filteredOutb.filter(function (item)
                                {
                                    if ((item.ObjType === 'ATT_XFER_USER' || item.ObjType === 'ATT_XFER_GATEWAY') && !item.IsTransferredParty)
                                    {
                                        return true;
                                    }
                                    else
                                    {
                                        return false;
                                    }

                                });

                                var actualTransferLegs = filteredOutb.filter(function (item)
                                {
                                    if (item.IsTransferredParty)
                                    {
                                        return true;
                                    }
                                    else
                                    {
                                        return false;
                                    }

                                });

                                if(transferLegB && transferLegB.length > 0)
                                {
                                    transferCallOriginalCallLeg = transferLegB[0];
                                }


                                if(transferCallOriginalCallLeg)
                                {
                                    cdrAppendObj.SipFromUser = transferCallOriginalCallLeg.SipFromUser;
                                    cdrAppendObj.RecievedBy = transferCallOriginalCallLeg.SipToUser;
                                    callHangupDirectionB = transferCallOriginalCallLeg.HangupDisposition;

                                    cdrAppendObj.AnswerSec = transferCallOriginalCallLeg.AnswerSec;

                                    cdrAppendObj.BillSec = transferCallOriginalCallLeg.BillSec;

                                    if (!cdrAppendObj.ObjType)
                                    {
                                        cdrAppendObj.ObjType = transferCallOriginalCallLeg.ObjType;
                                    }

                                    if (!cdrAppendObj.ObjCategory)
                                    {
                                        cdrAppendObj.ObjCategory = transferCallOriginalCallLeg.ObjCategory;
                                    }

                                    outLegProcessed = true;

                                    if (!outLegAnswered)
                                    {
                                        if (curProcessingLeg.BillSec > 0)
                                        {
                                            outLegAnswered = true;
                                        }
                                    }

                                    for(k = 0; k < actualTransferLegs.length; k++)
                                    {
                                        transferredParties = transferredParties + actualTransferLegs[k].SipToUser + ',';
                                    }
                                }
                                else
                                {
                                    var connectedLegs = filteredOutb.filter(function (item)
                                    {
                                        if (item.IsAnswered)
                                        {
                                            return true;
                                        }
                                        else
                                        {
                                            return false;
                                        }

                                    });

                                    var curProcessingLeg = null;

                                    if(connectedLegs && connectedLegs.length > 0)
                                    {
                                        curProcessingLeg = connectedLegs[0];

                                    }
                                    else
                                    {
                                        if(filteredOutb && filteredOutb.length > 0)
                                        {
                                            curProcessingLeg = filteredOutb[0];
                                        }

                                    }

                                    if(curProcessingLeg)
                                    {
                                        callHangupDirectionB = curProcessingLeg.HangupDisposition;

                                        cdrAppendObj.RecievedBy = curProcessingLeg.SipToUser;

                                        cdrAppendObj.AnswerSec = curProcessingLeg.AnswerSec;


                                        if (cdrAppendObj.DVPCallDirection === 'outbound')
                                        {
                                            var holdSecTemp = curProcessingLeg.HoldSec;
                                            cdrAppendObj.HoldSec = holdSecTemp;
                                        }

                                        cdrAppendObj.BillSec = curProcessingLeg.BillSec;

                                        if (!cdrAppendObj.ObjType)
                                        {
                                            cdrAppendObj.ObjType = curProcessingLeg.ObjType;
                                        }

                                        if (!cdrAppendObj.ObjCategory)
                                        {
                                            cdrAppendObj.ObjCategory = curProcessingLeg.ObjCategory;
                                        }

                                        outLegProcessed = true;

                                        if (!outLegAnswered)
                                        {
                                            if (curProcessingLeg.BillSec > 0)
                                            {
                                                outLegAnswered = true;
                                            }
                                        }
                                    }

                                }

                                if (callHangupDirectionA === 'recv_bye')
                                {
                                    cdrAppendObj.HangupParty = 'CALLER';
                                }
                                else if (callHangupDirectionB === 'recv_bye')
                                {
                                    cdrAppendObj.HangupParty = 'CALLEE';
                                }
                                else
                                {
                                    cdrAppendObj.HangupParty = 'SYSTEM';
                                }


                                cdrAppendObj.IsAnswered = outLegAnswered;

                                if (outLegProcessed && cdrAppendObj.BillSec)
                                {
                                    cdrAppendObj.ShowButton = true;
                                }

                                if(transferredParties)
                                {
                                    transferredParties = transferredParties.slice(0, -1);
                                    cdrAppendObj.TransferredParties = transferredParties;
                                }

                                cdrAppendObj.BillSec = convertToMMSS(cdrAppendObj.BillSec);
                                cdrAppendObj.Duration = convertToMMSS(cdrAppendObj.Duration);
                                cdrAppendObj.AnswerSec = convertToMMSS(cdrAppendObj.AnswerSec);
                                cdrAppendObj.QueueSec = convertToMMSS(cdrAppendObj.QueueSec);
                                cdrAppendObj.HoldSec = convertToMMSS(cdrAppendObj.HoldSec);


                                var cdrCsv =
                                {
                                    DVPCallDirection: cdrAppendObj.DVPCallDirection,
                                    SipFromUser: cdrAppendObj.SipFromUser,
                                    SipToUser: cdrAppendObj.SipToUser,
                                    RecievedBy: cdrAppendObj.RecievedBy,
                                    AgentSkill: cdrAppendObj.AgentSkill,
                                    IsAnswered: cdrAppendObj.IsAnswered,
                                    CreatedTime: cdrAppendObj.CreatedTime,
                                    Duration: cdrAppendObj.Duration,
                                    BillSec: cdrAppendObj.BillSec,
                                    AnswerSec: cdrAppendObj.AnswerSec,
                                    QueueSec: cdrAppendObj.QueueSec,
                                    HoldSec: cdrAppendObj.HoldSec,
                                    ObjType: cdrAppendObj.ObjType,
                                    ObjCategory: cdrAppendObj.ObjCategory,
                                    HangupParty: cdrAppendObj.HangupParty,
                                    TransferredParties: cdrAppendObj.TransferredParties
                                };


                                cdrListForCSV.push(cdrCsv);
                            }


                        }
                        else
                        {
                            $scope.showAlert('Info', 'info', 'No records to load');

                            if (pageStack.length > 0)
                            {
                                $scope.isPreviousDisabled = false;
                                $scope.isNextDisabled = true;
                            }
                            $scope.isNextDisabled = true;
                            $scope.isTableLoading = 1;
                        }


                    }
                    else
                    {
                        $scope.showAlert('Error', 'error', 'Error occurred while loading cdr list');
                        $scope.isTableLoading = 1;
                    }





                    deferred.resolve(cdrListForCSV);


                }, function (err)
                {
                    $scope.showAlert('Error', 'error', 'ok', 'Error occurred while loading cdr list');
                    deferred.resolve(cdrListForCSV);
                })
            }
            catch (ex)
            {
                $scope.showAlert('Error', 'error', 'ok', 'Error occurred while loading cdr list')
                deferred.resolve(cdrListForCSV);
            }

            return deferred.promise;
        };


        $scope.getProcessedCDR = function (offset, reset)
        {
            $scope.enableSearchButton = false;

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

                if ($scope.startTimeNow === '00:00' && $scope.endTimeNow === '00:00')
                {
                    //use date only
                    startTime = startYear + '-' + startMonth + '-' + startDay + ' 00:00:00' + momentTz;
                    endTime = endYear + '-' + endMonth + '-' + endDay + ' 23:59:59' + momentTz;
                }


                var lim = parseInt($scope.recLimit);
                $scope.isTableLoading = 0;
                cdrApiHandler.getCDRForTimeRange(startTime, endTime, lim, offset, $scope.agentFilter, $scope.skillFilter, $scope.directionFilter, $scope.recFilter).then(function (cdrResp)
                {
                    if (!cdrResp.Exception && cdrResp.IsSuccess && cdrResp.Result)
                    {
                        if (!isEmpty(cdrResp.Result))
                        {
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
                                var outLegAnswered = false;

                                var callHangupDirectionA = '';
                                var callHangupDirectionB = '';

                                var len = curCdr.length;


                                //Need to filter out inbound and outbound legs before processing

                                var filteredInb = curCdr.filter(function (item)
                                {
                                    if (item.Direction === 'inbound')
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
                                    if (item.Direction === 'outbound')
                                    {
                                        return true;
                                    }
                                    else
                                    {
                                        return false;
                                    }

                                });


                                //process inbound legs first

                                for (i = 0; i < filteredInb.length; i++)
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
                                    cdrAppendObj.IsAnswered = false;

                                    cdrAppendObj.HangupCause = curProcessingLeg.HangupCause;

                                    var localTime = moment(curProcessingLeg.CreatedTime).local().format("YYYY-MM-DD HH:mm:ss");

                                    cdrAppendObj.CreatedTime = localTime;
                                    cdrAppendObj.Duration = curProcessingLeg.Duration;
                                    cdrAppendObj.BillSec = 0;
                                    cdrAppendObj.HoldSec = 0;

                                    cdrAppendObj.DVPCallDirection = curProcessingLeg.DVPCallDirection;

                                    if (cdrAppendObj.DVPCallDirection === 'inbound')
                                    {
                                        var holdSecTemp = curProcessingLeg.HoldSec + curProcessingLeg.WaitSec;
                                        cdrAppendObj.HoldSec = holdSecTemp;
                                    }


                                    cdrAppendObj.QueueSec = curProcessingLeg.QueueSec;
                                    cdrAppendObj.AgentSkill = curProcessingLeg.AgentSkill;


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

                                var transferredParties = '';

                                var transferCallOriginalCallLeg = null;

                                var transferLegB = filteredOutb.filter(function (item)
                                {
                                    if ((item.ObjType === 'ATT_XFER_USER' || item.ObjType === 'ATT_XFER_GATEWAY') && !item.IsTransferredParty)
                                    {
                                        return true;
                                    }
                                    else
                                    {
                                        return false;
                                    }

                                });

                                var actualTransferLegs = filteredOutb.filter(function (item)
                                {
                                    if (item.IsTransferredParty)
                                    {
                                        return true;
                                    }
                                    else
                                    {
                                        return false;
                                    }

                                });

                                if(transferLegB && transferLegB.length > 0)
                                {
                                    transferCallOriginalCallLeg = transferLegB[0];
                                }


                                if(transferCallOriginalCallLeg)
                                {
                                    cdrAppendObj.SipFromUser = transferCallOriginalCallLeg.SipFromUser;
                                    cdrAppendObj.RecievedBy = transferCallOriginalCallLeg.SipToUser;
                                    callHangupDirectionB = transferCallOriginalCallLeg.HangupDisposition;

                                    if (!bottomSet && count === cdrLen)
                                    {
                                        $scope.bottom = transferCallOriginalCallLeg.id;
                                        bottomSet = true;
                                    }

                                    cdrAppendObj.AnswerSec = transferCallOriginalCallLeg.AnswerSec;

                                    cdrAppendObj.BillSec = transferCallOriginalCallLeg.BillSec;

                                    if (!cdrAppendObj.ObjType)
                                    {
                                        cdrAppendObj.ObjType = transferCallOriginalCallLeg.ObjType;
                                    }

                                    if (!cdrAppendObj.ObjCategory)
                                    {
                                        cdrAppendObj.ObjCategory = transferCallOriginalCallLeg.ObjCategory;
                                    }

                                    outLegProcessed = true;

                                    if (!outLegAnswered)
                                    {
                                        if (curProcessingLeg.BillSec > 0)
                                        {
                                            outLegAnswered = true;
                                        }
                                    }

                                    for(k = 0; k < actualTransferLegs.length; k++)
                                    {
                                        transferredParties = transferredParties + actualTransferLegs[k].SipToUser + ',';
                                    }
                                }
                                else
                                {
                                    var connectedLegs = filteredOutb.filter(function (item)
                                    {
                                        if (item.IsAnswered)
                                        {
                                            return true;
                                        }
                                        else
                                        {
                                            return false;
                                        }

                                    });

                                    var curProcessingLeg = null;

                                    if(connectedLegs && connectedLegs.length > 0)
                                    {
                                        curProcessingLeg = connectedLegs[0];

                                    }
                                    else
                                    {
                                        if(filteredOutb && filteredOutb.length > 0)
                                        {
                                            curProcessingLeg = filteredOutb[0];
                                        }

                                    }

                                    if(curProcessingLeg)
                                    {
                                        callHangupDirectionB = curProcessingLeg.HangupDisposition;

                                        if (!bottomSet && count === cdrLen)
                                        {
                                            $scope.bottom = curProcessingLeg.id;
                                            bottomSet = true;
                                        }

                                        cdrAppendObj.RecievedBy = curProcessingLeg.SipToUser;

                                        cdrAppendObj.AnswerSec = curProcessingLeg.AnswerSec;


                                        if (cdrAppendObj.DVPCallDirection === 'outbound')
                                        {
                                            var holdSecTemp = curProcessingLeg.HoldSec;
                                            cdrAppendObj.HoldSec = holdSecTemp;
                                        }

                                        cdrAppendObj.BillSec = curProcessingLeg.BillSec;

                                        if (!cdrAppendObj.ObjType)
                                        {
                                            cdrAppendObj.ObjType = curProcessingLeg.ObjType;
                                        }

                                        if (!cdrAppendObj.ObjCategory)
                                        {
                                            cdrAppendObj.ObjCategory = curProcessingLeg.ObjCategory;
                                        }

                                        outLegProcessed = true;

                                        if (!outLegAnswered)
                                        {
                                            if (curProcessingLeg.BillSec > 0)
                                            {
                                                outLegAnswered = true;
                                            }
                                        }
                                    }

                                }



                                /*for (j = 0; j < filteredOutb.length; j++)
                                {
                                    var curProcessingLeg = filteredOutb[j];

                                    if((curProcessingLeg.ObjType === 'ATT_XFER_USER' || curProcessingLeg.ObjType === 'ATT_XFER_GATEWAY') && !curProcessingLeg.IsTransferredParty)
                                    {
                                        cdrAppendObj.SipFromUser = curProcessingLeg.SipFromUser;
                                        cdrAppendObj.RecievedBy = curProcessingLeg.SipToUser;

                                    }

                                    if(curProcessingLeg.IsTransferredParty)
                                    {
                                        transferredParties = transferredParties + curProcessingLeg.SipToUser + ',';
                                    }

                                    callHangupDirectionB = curProcessingLeg.HangupDisposition;

                                    if (!bottomSet && count === cdrLen)
                                    {
                                        $scope.bottom = curProcessingLeg.id;
                                        bottomSet = true;
                                    }

                                    if(!cdrAppendObj.RecievedBy)
                                    {
                                        cdrAppendObj.RecievedBy = curProcessingLeg.SipToUser;
                                    }


                                    cdrAppendObj.AnswerSec = curProcessingLeg.AnswerSec;


                                    if (cdrAppendObj.DVPCallDirection === 'outbound')
                                    {
                                        var holdSecTemp = curProcessingLeg.HoldSec + curProcessingLeg.WaitSec;
                                        cdrAppendObj.HoldSec = holdSecTemp;
                                    }

                                    cdrAppendObj.BillSec = curProcessingLeg.BillSec;

                                    if (!cdrAppendObj.ObjType)
                                    {
                                        cdrAppendObj.ObjType = curProcessingLeg.ObjType;
                                    }

                                    if (!cdrAppendObj.ObjCategory)
                                    {
                                        cdrAppendObj.ObjCategory = curProcessingLeg.ObjCategory;
                                    }

                                    outLegProcessed = true;

                                    if (!outLegAnswered)
                                    {
                                        if (curProcessingLeg.BillSec > 0)
                                        {
                                            outLegAnswered = true;
                                        }
                                    }
                                }*/

                                if (callHangupDirectionA === 'recv_bye')
                                {
                                    cdrAppendObj.HangupParty = 'CALLER';
                                }
                                else if (callHangupDirectionB === 'recv_bye')
                                {
                                    cdrAppendObj.HangupParty = 'CALLEE';
                                }
                                else
                                {
                                    cdrAppendObj.HangupParty = 'SYSTEM';
                                }


                                cdrAppendObj.IsAnswered = outLegAnswered;

                                if (outLegProcessed && cdrAppendObj.BillSec)
                                {
                                    cdrAppendObj.ShowButton = true;
                                }

                                if(transferredParties)
                                {
                                    transferredParties = transferredParties.slice(0, -1);
                                    cdrAppendObj.TransferredParties = transferredParties;
                                }


                                cdrAppendObj.BillSec = convertToMMSS(cdrAppendObj.BillSec);
                                cdrAppendObj.Duration = convertToMMSS(cdrAppendObj.Duration);
                                cdrAppendObj.AnswerSec = convertToMMSS(cdrAppendObj.AnswerSec);
                                cdrAppendObj.QueueSec = convertToMMSS(cdrAppendObj.QueueSec);
                                cdrAppendObj.HoldSec = convertToMMSS(cdrAppendObj.HoldSec);


                                $scope.cdrList.push(cdrAppendObj);
                            }

                            if (pageStack.length === 0)
                            {
                                $scope.isNextDisabled = false;
                                $scope.isPreviousDisabled = true;
                            }
                            else if (pageStack.length > 0)
                            {
                                $scope.isPreviousDisabled = false;
                                $scope.isNextDisabled = false;
                            }

                            $scope.isTableLoading = 1;

                        }
                        else
                        {
                            $scope.showAlert('Info', 'info', 'No records to load');

                            if (pageStack.length > 0)
                            {
                                $scope.isPreviousDisabled = false;
                                $scope.isNextDisabled = true;
                            }
                            $scope.isNextDisabled = true;
                            $scope.isTableLoading = 1;
                        }


                    }
                    else
                    {
                        $scope.showAlert('Error', 'error', 'Error occurred while loading cdr list');
                        $scope.isTableLoading = 1;
                    }

                    $scope.enableSearchButton = true;


                }, function (err)
                {
                    $scope.showAlert('Error', 'error', 'ok', 'Error occurred while loading cdr list');
                    $scope.isTableLoading = 1;
                    $scope.enableSearchButton = true;
                })
            }
            catch (ex)
            {
                $scope.showAlert('Error', 'error', 'ok', 'Error occurred while loading cdr list');
                $scope.isTableLoading = 1;
            }
        }


    };
    app.controller("cdrCtrl", cdrCtrl);

}());


