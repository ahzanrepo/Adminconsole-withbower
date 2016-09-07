(function () {
    var app = angular.module("veeryConsoleApp");

    var callSummaryCtrl = function ($scope, $filter, cdrApiHandler) {

        $scope.showAlert = function (tittle, type, content) {

            new PNotify({
                title: tittle,
                text: content,
                type: type,
                styling: 'bootstrap3'
            });
        };




        $scope.obj = {
            dateofmonth : moment().format("YYYY-MM-DD")
        };

        $scope.obj2 = {
            startDay : moment().format("YYYY-MM-DD"),
            endDay : moment().format("YYYY-MM-DD")
        };



        $scope.callSummaryHrList = [];
        $scope.callSummaryDayList = [];


        var isEmpty = function (map) {
            for (var key in map) {
                if (map.hasOwnProperty(key)) {
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




        $scope.getCallSummary = function ()
        {

            try
            {

                var momentTz = moment.parseZone(new Date()).format('Z');
                momentTz = momentTz.replace("+", "%2B");

                $scope.obj.isTableLoadingHr = 0;

                cdrApiHandler.getCallSummaryForHr($scope.obj.dateofmonth, momentTz).then(function (sumResp)
                {
                    if (!sumResp.Exception && sumResp.IsSuccess && sumResp.Result)
                    {
                        if (!isEmpty(sumResp.Result))
                        {
                            var newSummary = sumResp.Result.map(function(sumr) {

                                if(typeof sumr.IvrAverage === "number")
                                {
                                    sumr.IvrAverage = convertToMMSS(sumr.IvrAverage);
                                }

                                if(typeof sumr.HoldAverage === "number")
                                {
                                    sumr.HoldAverage = convertToMMSS(sumr.HoldAverage);
                                }

                                if(typeof sumr.RingAverage === "number")
                                {
                                    sumr.RingAverage = convertToMMSS(sumr.RingAverage);
                                }

                                if(typeof sumr.TalkAverage === "number")
                                {
                                    sumr.TalkAverage = convertToMMSS(sumr.TalkAverage);
                                }

                                return sumr;
                            });

                            $scope.callSummaryHrList = newSummary;
                            $scope.obj.isTableLoadingHr = 1;
                        }
                        else
                        {
                            $scope.showAlert('Info', 'info', 'No records to load');
                            $scope.obj.isTableLoadingHr = 1;

                        }


                    }
                    else
                    {
                        $scope.showAlert('Error', 'error', 'Error occurred while loading call summary');
                        $scope.obj.isTableLoadingHr = 1;
                    }



                }, function (err)
                {
                    $scope.showAlert('Error', 'error', 'ok', 'Error occurred while loading call summary');
                    $scope.obj.isTableLoadingHr = 1;
                })
            }
            catch (ex)
            {
                $scope.showAlert('Error', 'error', 'ok', 'Error occurred while loading call summary');
                $scope.obj.isTableLoadingHr = 1;
            }

        };

        $scope.getCallSummaryDaily = function ()
        {

            try
            {

                var momentTz = moment.parseZone(new Date()).format('Z');
                momentTz = momentTz.replace("+", "%2B");

                $scope.obj.isTableLoadingDay = 0;

                cdrApiHandler.getCallSummaryForDay($scope.obj2.startDay, $scope.obj2.endDay, momentTz).then(function (sumResp)
                {
                    if (!sumResp.Exception && sumResp.IsSuccess && sumResp.Result)
                    {
                        if (!isEmpty(sumResp.Result))
                        {

                            var newSummary = sumResp.Result.map(function(sumr) {

                                if(typeof sumr.IvrAverage === "number")
                                {
                                    sumr.IvrAverage = convertToMMSS(sumr.IvrAverage);
                                }

                                if(typeof sumr.HoldAverage === "number")
                                {
                                    sumr.HoldAverage = convertToMMSS(sumr.HoldAverage);
                                }

                                if(typeof sumr.RingAverage === "number")
                                {
                                    sumr.RingAverage = convertToMMSS(sumr.RingAverage);
                                }

                                if(typeof sumr.TalkAverage === "number")
                                {
                                    sumr.TalkAverage = convertToMMSS(sumr.TalkAverage);
                                }

                                return sumr;
                            });

                            $scope.callSummaryDayList = newSummary;
                            $scope.obj.isTableLoadingDay = 1;
                        }
                        else
                        {
                            $scope.showAlert('Info', 'info', 'No records to load');
                            $scope.obj.isTableLoadingDay = 1;

                        }


                    }
                    else
                    {
                        $scope.showAlert('Error', 'error', 'Error occurred while loading call summary');
                        $scope.obj.isTableLoadingDay = 1;
                    }



                }, function (err)
                {
                    $scope.showAlert('Error', 'error', 'ok', 'Error occurred while loading call summary');
                    $scope.obj.isTableLoadingDay = 1;
                })
            }
            catch (ex)
            {
                $scope.showAlert('Error', 'error', 'ok', 'Error occurred while loading call summary');
                $scope.obj.isTableLoadingDay = 1;
            }

        };



    };
    app.controller("callSummaryCtrl", callSummaryCtrl);

}());


