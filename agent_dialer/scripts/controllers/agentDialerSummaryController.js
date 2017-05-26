/**
 * Created by Rajinda on 05/17/2017.
 */

mainApp.controller("agentDialerSummaryController", function ($http, $scope, $filter, $location, $log, $q, $anchorScroll, notifiSenderService, agentDialService) {

    $anchorScroll();

    $scope.safeApply = function (fn) {
        var phase = this.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

    $scope.showAlert = function (tittle, type, content) {
        new PNotify({
            title: tittle,
            text: content,
            type: type,
            styling: 'bootstrap3'
        });
    };

    $scope.isLoading = false;
    $scope.BatchNames = [];
    $scope.DialerStates = [];

    $scope.CheckJobStatus = function () {
        agentDialService.HeaderDetails().then(function (response) {
            if (response) {
                $scope.BatchNames = response.BatchName;
                $scope.DialerStates = response.DialerState;
            }

        }, function (error) {
            $scope.showAlert("Agent Dialer", 'error', "Fail To Get Page Count.");
        });
    };

    $scope.CheckJobStatus();
});
