mainApp.controller("agentStatusController", function ($scope,$state ,$filter, $stateParams, $timeout, $log,$anchorScroll, agentStatusService) {

    $anchorScroll();
    $scope.summaryText = "Table";
    $scope.changeView = function () {
        $scope.summary =  !$scope.summary;
        $scope.summaryText = $scope.summary ? "Card" : "Table";
    };

    $scope.Productivitys = [];
    $scope.GetProductivity = function () {
        agentStatusService.GetProductivity().then(function (response) {
            $scope.Productivitys = response;
        }, function (error) {
            $log.debug("productivity err");
            $scope.showAlert("Error", "error", "ok", "Fail To Get productivity.");
        });
    };


    var getAllRealTime = function () {
        $scope.GetProductivity();
        getAllRealTimeTimer = $timeout(getAllRealTime, $scope.refreshTime);
    };

    // getAllRealTime();
    var getAllRealTimeTimer = $timeout(getAllRealTime, $scope.refreshTime);


    $scope.$on("$destroy", function () {
        if (getAllRealTimeTimer) {
            $timeout.cancel(getAllRealTimeTimer);
        }
    });

    $scope.refreshTime = 1000;

    $scope.showAlert = function (tittle, type, button, content) {
        new PNotify({
            title: tittle,
            text: content,
            type: type,
            styling: 'bootstrap3'
        });
    };

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

    //update damith
    $scope.viewScroll = function () {
        $scope.safeApply(function () {
            $scope.scrollEnabled = true;
        });

    };
    $scope.hideScroll = function () {
        $scope.safeApply(function () {
            $scope.scrollEnabled = false;
        });
    };


});


