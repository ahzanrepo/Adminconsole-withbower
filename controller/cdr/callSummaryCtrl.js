/**
 * Created by dinusha on 6/15/2016.
 */
/**
 * Created by dinusha on 5/28/2016.
 */

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
            dateofmonth : moment().format("YYYY-MM-DD"),
            startDay : moment().format("YYYY-MM-DD"),
            endDay : moment().format("YYYY-MM-DD")
        };

        $scope.onDateChange = function ()
        {
            console.log($scope.obj.dayofmonth);
        };

        $scope.obj.isTableLoadingHr = 3;
        $scope.callSummaryHrList = [];


        var isEmpty = function (map) {
            for (var key in map) {
                if (map.hasOwnProperty(key)) {
                    return false;
                }
            }
            return true;
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
                            $scope.callSummaryHrList = sumResp.Result;
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

                $scope.obj.isTableLoadingHr = 0;

                cdrApiHandler.getCallSummaryForHr($scope.obj.dateofmonth, momentTz).then(function (sumResp)
                {
                    if (!sumResp.Exception && sumResp.IsSuccess && sumResp.Result)
                    {
                        if (!isEmpty(sumResp.Result))
                        {
                            $scope.callSummaryHrList = sumResp.Result;
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



    };
    app.controller("callSummaryCtrl", callSummaryCtrl);

}());


