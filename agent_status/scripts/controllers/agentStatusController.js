mainApp.controller("agentStatusController", function ($scope,$state ,$filter, $stateParams, $timeout, $log,$anchorScroll, agentStatusService) {

    $anchorScroll();
    $scope.showCallInfos = false;
    $scope.summaryText = "Table";
    $scope.summary = false;
    $scope.changeView = function () {
        $scope.summary =  !$scope.summary;
        $scope.summaryText = $scope.summary ? "Card" : "Table";
    };
    $scope.showAgentSummary = function () {
        $state.go('console.AgentProfileSummary');
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
    $scope.GetProductivity();
    $scope.showCallDetails = false;
    var calculateProductivity = function () {
        $scope.Productivitys = [];$scope.showCallDetails = false;
        if ($scope.profile) {
            angular.forEach($scope.profile, function (agent) {
                try {
                    if (agent) {
                        var ids = $filter('filter')($scope.productivity, {ResourceId: agent.ResourceId},true);//"ResourceId":"1"

                        /*var agentProductivity = {
                         "data": [{
                         value: 0,
                         name: 'After work'
                         }, {
                         value: 0,
                         name: 'Break'
                         }, {
                         value: 0,
                         name: 'On Call'
                         }, {
                         value: 0,
                         name: 'Idle'
                         }],
                         "ResourceId": agent.ResourceId,
                         "ResourceName": agent.ResourceName,
                         "IncomingCallCount": 0,
                         "MissCallCount": 100,
                         "Chatid": agent.ResourceId
                         };*/

                        if (ids.length > 0) {
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
                                "Chatid": agent.ResourceId,
                                "AcwTime": ids[0].AcwTime,
                                "BreakTime": ids[0].BreakTime,
                                "HoldTime": ids[0].HoldTime,
                                "OnCallTime": ids[0].OnCallTime,
                                "IdleTime": ids[0].IdleTime,
                                "StaffedTime": ids[0].StaffedTime,
                                "slotState":{}
                            };


                        }
                        if (agent.ConcurrencyInfo.length > 0 &&
                            agent.ConcurrencyInfo[0].SlotInfo.length > 0) {

                            // is user state Reason
                            var resonseStatus = null,
                                resonseAvailability = null;
                            if (agent.Status.Reason && agent.Status.State) {
                                resonseAvailability = agent.Status.State;
                                resonseStatus = agent.Status.Reason;
                            }


                            var reservedDate = agent.ConcurrencyInfo[0].SlotInfo[0].StateChangeTime;

                            if (resonseAvailability == "NotAvailable") {
                                agentProductivity.slotState = resonseStatus;
                                agentProductivity.other = "Break";
                                reservedDate = agent.Status.StateChangeTime;
                            } else if(agent.ConcurrencyInfo[0].IsRejectCountExceeded) {
                                agentProductivity.slotState = "Suspended";
                                agentProductivity.other = "Reject";
                            } else {
                                agentProductivity.slotState = agent.ConcurrencyInfo[0].SlotInfo[0].State;

                                if (agent.ConcurrencyInfo[0].SlotInfo[0].State == "Available") {

                                    reservedDate = agent.Status.StateChangeTime;
                                }
                            }


                            if (reservedDate == "") {
                                agentProductivity.LastReservedTime = null;
                            } else {
                                agentProductivity.LastReservedTime = moment(reservedDate).format('DD/MM/YYYY HH:mm:ss');
                                agentProductivity.slotStateTime = moment.utc(moment(moment(), "DD/MM/YYYY HH:mm:ss").diff(moment(reservedDate))).format("HH:mm:ss");
                            }


                        }


                        /* Set Task Info*/
                        agentProductivity.taskList = [];
                        angular.forEach(agent.ResourceAttributeInfo, function (item) {
                            try {
                                var task = {};
                                task.taskType = item.HandlingType;
                                task.percentage = item.Percentage;
                                //$filter('filter')(array, expression, comparator, anyPropertyKey)
                                //var filteredData =  $filter('filter')($scope.gridUserData.data,{ Id: userid },true);
                                var data = $filter('filter')($scope.attributesList, {AttributeId: parseInt(item.Attribute)},true);
                                if (data.length > 0)
                                    task.skill = data[0].Attribute;
                                agentProductivity.taskList.push(task);
                            }
                            catch (ex) {
                                console.info(ex);
                            }
                        });
                        /* Set Task Info*/

                        /* Set ConcurrencyInfo */
                        var sessionIds = [];
                        angular.forEach(agent.ConcurrencyInfo, function (item) {
                            try {
                                var slotInfo = $filter('filter')(item.SlotInfo, {State: "Connected"});
                                if (slotInfo.length > 0) {
                                    var sid = slotInfo[0].HandlingRequest;
                                    sessionIds.push(sid);
                                }
                            }
                            catch (ex) {
                                console.info(ex);
                            }
                        });

                        /*Get Call info base on sid*/
                        agentProductivity.callInfos = [];
                        angular.forEach($scope.activeCalls, function (item) {
                            try {
                                var inboundCalls = $filter('filter')(item, {'Call-Direction': "inbound"});
                                angular.forEach(sessionIds, function (sid) {
                                    try {
                                        var callInfo = $filter('filter')(inboundCalls, {'Unique-ID': sid});
                                        if (callInfo.length > 0) {

                                            agentProductivity.callInfos.push(callInfo[0]);
                                            console.info(callInfo);
                                            $scope.showCallDetails=true;
                                        }
                                    } catch (ex) {
                                        console.info(ex);
                                    }
                                })
                            }
                            catch (ex) {
                                console.info(ex);
                            }
                        });

                        /* Set ConcurrencyInfo*/

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


