mainApp.controller("agentStatusController", function ($scope, $filter, $stateParams, $timeout, $log, agentStatusService) {

    $scope.summaryText="Table";
    $scope.summary=false;
    $scope.changeView = function(){
        $scope.summary= !$scope.summary;
        $scope.summaryText = $scope.summary?"Card":"Table";
    };

    $scope.productivity = [];
    $scope.Productivitys = [];
    $scope.GetProductivity = function () {
        agentStatusService.GetProductivity().then(function (response) {
            $scope.productivity = response;
            calculateProductivity();
        }, function (error) {
            $log.debug("productivity err");
            $scope.showAlert("Error", "Error", "ok", "Fail To Get productivity.");
        });
    };


    var calculateProductivity = function () {
        if ($scope.profile) {
            angular.forEach($scope.profile, function (agent) {
                try {
                    if (agent) {
                        var ids = $filter('filter')($scope.productivity, {ResourceId: agent.ResourceId});//"ResourceId":"1"
                        var agentProductivity = {
                            "data": [{
                                value: ids[0].AcwTime ? ids[0].AcwTime : 0,
                                name: 'After work'
                            }, {
                                value: ids[0].BreakTime ? ids[0].BreakTime : 0,
                                name: 'Break'
                            }, {
                                value: ids[0].OnCallTime ? ids[0].OnCallTime : 0,
                                name: 'On Call'
                            }, {
                                value: ids[0].IdleTime ? ids[0].IdleTime : 0,
                                name: 'Idle'
                            }],
                            "ResourceId": agent.ResourceId,
                            "ResourceName": agent.ResourceName,
                            "IncomingCallCount": ids[0].IncomingCallCount ? ids[0].IncomingCallCount : 0,
                            "MissCallCount": ids[0].MissCallCount ? ids[0].MissCallCount : 0,
                            "Chatid": agent.ResourceId
                        };

                        $scope.Productivitys.push(agentProductivity);
                    }
                } catch (ex) {
                    console.log(ex);
                }
            });


        }
    };


    $scope.activeCalls = [];
    $scope.GetAllActiveCalls = function () {
        agentStatusService.GetAllActiveCalls().then(function (response) {
            $scope.activeCalls = response;
        }, function (error) {
            $log.debug("getAllActiveCalls err");
            $scope.showAlert("Error", "Error", "ok", "Fail To Get Active Call List.");
        });
    };
    $scope.GetAllActiveCalls();

    $scope.attributesList = [];
    $scope.GetAllAttributes = function () {
        agentStatusService.GetAllAttributes().then(function (response) {
            $scope.attributesList = response;
            $scope.getProfileDetails();
        }, function (error) {
            $log.debug("GetAllAttributes err");
            $scope.showAlert("Error", "Error", "ok", "Fail To Get Attribute List.");
        });
    };
    $scope.GetAllAttributes();

    $scope.profile = [];

    $scope.getProfileDetails = function () {
        agentStatusService.GetProfileDetails().then(function (response) {
            $scope.profile = response;
            /*$scope.profile = [];
             if (response.length > 0) {
             angular.forEach(response,function(resItem){
             var profile = {
             name: '',
             slotState: null,
             LastReservedTime: 0,
             other: null,
             slotStateTime: 0,
             };

             profile.name = resItem.ResourceName;
             if (resItem.ConcurrencyInfo.length > 0 &&
             resItem.ConcurrencyInfo[0].SlotInfo.length > 0) {

             // is user state Reason
             var resonseStatus = null,
             resonseAvailability = null;
             if (resItem.Status.Reason && resItem.Status.State) {
             resonseAvailability = resItem.Status.State;
             resonseStatus = resItem.Status.Reason;
             }


             var reservedDate = resItem.ConcurrencyInfo[0].
             SlotInfo[0].StateChangeTime;

             if (resonseAvailability == "NotAvailable") {
             profile.slotState = resonseStatus;
             profile.other = "Break";
             reservedDate = resItem.Status.StateChangeTime;
             } else {
             profile.slotState = resItem.ConcurrencyInfo[0].SlotInfo[0].State;

             if (resItem.ConcurrencyInfo[0].SlotInfo[0].State == "Available") {

             reservedDate = resItem.Status.StateChangeTime;
             }
             }


             if (reservedDate == "") {
             profile.LastReservedTime = null;
             } else {
             profile.LastReservedTime = moment(reservedDate).format('DD/MM/YYYY HH:mm:ss');
             profile.slotStateTime = moment.utc(moment(moment(), "DD/MM/YYYY HH:mm:ss").diff(moment(reservedDate))).format("HH:mm:ss");
             }

             /!* Set Task Info*!/
             profile.taskList = [];
             angular.forEach(resItem.ResourceAttributeInfo, function (item) {
             try {
             var task = {};
             task.taskType = item.HandlingType;
             task.percentage = item.Percentage;
             var data = $filter('filter')($scope.attributesList, {AttributeId: item.Attribute});
             if (data.length > 0)
             task.skill = data[0].Attribute;
             profile.taskList.push(task);
             }
             catch (ex) {
             console.info(ex);
             }
             });
             /!* Set Task Info*!/

             $scope.profile.push(profile);
             }
             });

             }*/
        });
    };


    var getAllRealTime = function () {
        $scope.getProfileDetails();
        $scope.GetAllActiveCalls();
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

    $scope.refreshTime = 10000;

    $scope.showAlert = function (tittle, label, button, content) {
        new PNotify({
            title: tittle,
            text: content,
            type: 'success',
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


