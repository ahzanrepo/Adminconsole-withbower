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

        $scope.isTableLoading = 3;
        $scope.callSummaryHrList = [];

        $scope.date = moment().format("YYYY-MM-DD");

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

                cdrApiHandler.getCallSummaryForHr(date, momentTz).then(function (sumResp)
                {
                    if (!sumResp.Exception && sumResp.IsSuccess && sumResp.Result)
                    {
                        if (!isEmpty(sumResp.ResultsumResp.Result))
                        {
                            $scope.callSummaryHrList = sumResp.Result;
                        }
                        else
                        {
                            $scope.showAlert('Info', 'info', 'No records to load');

                        }


                    }
                    else
                    {
                        $scope.showAlert('Error', 'error', 'Error occurred while loading call summary');
                    }



                }, function (err)
                {
                    $scope.showAlert('Error', 'error', 'ok', 'Error occurred while loading call summary');
                })
            }
            catch (ex)
            {
                $scope.showAlert('Error', 'error', 'ok', 'Error occurred while loading call summary');
            }

        };



    };
    app.controller("callSummaryCtrl", callSummaryCtrl);

}());


