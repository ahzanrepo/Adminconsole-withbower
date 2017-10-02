/**
 * Created by Waruna on 9/27/2017.
 */

mainApp.controller("detailsDashboardController", function ($scope,$rootScope, $filter, $stateParams, $anchorScroll, $timeout, $q, queueMonitorService, subscribeServices, agentStatusService) {
    $anchorScroll();

    $scope.dtOptions = {paging: false, searching: false, info: false, order: [0, 'desc']};

    $scope.safeApply = function (fn) {
        if (this.$root) {
            var phase = this.$root.$$phase;
            if (phase == '$apply' || phase == '$digest') {
                if (fn && (typeof(fn) === 'function')) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        } else {
            this.$apply(fn);
        }
    };

    $scope.showAlert = function (tittle, label, button, content) {
        new PNotify({
            title: tittle,
            text: content,
            type: 'success',
            styling: 'bootstrap3'
        });
    };

    /*------------------------ queue details ------------------------------------*/
    $scope.queues = {};

    subscribeServices.subscribe('queuedetail');
    //subscribe services
    subscribeServices.subscribeDashboard(function (event) {

        switch (event.roomName) {
            case 'QUEUE:QueueDetail':
                if (event.Message) {
                    var item = event.Message.QueueInfo;
                    if (item.CurrentMaxWaitTime) {
                        var d = moment(item.CurrentMaxWaitTime).valueOf();
                        item.MaxWaitingMS = d;

                        if (item.EventTime) {

                            var serverTime = moment(item.EventTime).valueOf();
                            tempMaxWaitingMS = serverTime - d;
                            item.MaxWaitingMS = moment().valueOf() - tempMaxWaitingMS;

                        }

                    }

                    //
                    item.id = event.Message.QueueId;

                    item.QueueName = event.Message.QueueName;
                    item.AverageWaitTime = Math.round(item.AverageWaitTime * 100) / 100;

                    if (item.TotalQueued > 0) {
                        item.presentage = Math.round((item.TotalAnswered / item.TotalQueued) * 100);
                    }

                    if (!$scope.queues[event.Message.QueueName]) {
                        $scope.queueList.push(item);
                    }
                    $scope.safeApply(function () {
                        $scope.queues[event.Message.QueueName] = item;
                    });
                }
                break;
        }
    });

    $scope.GetAllQueueStatistics = function () {

        queueMonitorService.GetAllQueueStats().then(function (response) {

            angular.forEach(response, function (c) {
                // var value = $filter('filter')(updatedQueues, {id: item.id})[0];
                // if (!value) {
                //     $scope.queues.splice($scope.queues.indexOf(item), 1);
                // }


                var item = c.QueueInfo;
                item.id = c.QueueId;
                item.QueueName = c.QueueName;
                item.AverageWaitTime = Math.round(item.AverageWaitTime * 100) / 100;

                if (item.CurrentMaxWaitTime) {
                    var d = moment(item.CurrentMaxWaitTime).valueOf();
                    item.MaxWaitingMS = d;

                    if (item.EventTime) {

                        var serverTime = moment(item.EventTime).valueOf();
                        tempMaxWaitingMS = serverTime - d;
                        item.MaxWaitingMS = moment().valueOf() - tempMaxWaitingMS;

                    }

                }

                if (item.TotalQueued > 0) {
                    item.presentage = Math.round((item.TotalAnswered / item.TotalQueued) * 100);
                }

                // if ($scope.checkQueueAvailability(item.id)) {
                $scope.queues[item.QueueName] = item;
                /*$scope.queueList.push(item);*/
                //}
            });


        });
    };

    $scope.GetAllQueueStatistics();

    /*------------------------ queue details ------------------------------------*/

    /*------------------------ Agent Summary  ------------------------------------*/

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

    var TimeFormatter = function (seconds) {

        var timeStr = '0:0:0';
        if (seconds > 0) {
            var durationObj = moment.duration(seconds * 1000);

            if (durationObj) {
                var tempDays = 0;
                if (durationObj._data.years > 0) {
                    tempDays = tempDays + durationObj._data.years * 365;
                }
                if (durationObj._data.months > 0) {
                    tempDays = tempDays + durationObj._data.months * 30;
                }
                if (durationObj._data.days > 0) {
                    tempDays = tempDays + durationObj._data.days;
                }

                if (tempDays > 0) {

                    timeStr = tempDays + 'd ' + durationObj._data.hours + ':' + durationObj._data.minutes + ':' + durationObj._data.seconds;
                } else {

                    timeStr = durationObj._data.hours + ':' + durationObj._data.minutes + ':' + durationObj._data.seconds;
                }
            }
        }
        return timeStr;
    };

    $scope.Productivitys = {};
    var calculateProductivity = function () {

        $scope.showCallDetails = false;
        if ($scope.onlineProfile) {
            angular.forEach($scope.onlineProfile, function (agent) {
                try {

                    if (agent) {


                        var ids = $filter('filter')($scope.productivity, {ResourceId: agent.ResourceId.toString()}, true);//"ResourceId":"1"

                        if (ids.length > 0) {
                            var agentProductivity = {
                                "data": [{
                                    value: ids[0].AcwTime ? ids[0].AcwTime : 0,
                                    name: 'After work'
                                }, {
                                    value: ids[0].BreakTime ? ids[0].BreakTime : 0,
                                    name: 'Break'
                                }, {
                                    value: ((ids[0].OnCallTime ? ids[0].OnCallTime : 0) + (ids[0].OutboundCallTime ? ids[0].OutboundCallTime : 0)),//OutboundCallTime
                                    name: 'On Call'
                                }, {
                                    value: ids[0].IdleTime ? ids[0].IdleTime : 0,
                                    name: 'Idle'
                                }],
                                "ResourceId": agent.ResourceId,
                                "ResourceName": agent.ResourceName,
                                "IncomingCallCount": ids[0].IncomingCallCount ? ids[0].IncomingCallCount : 0,
                                "OutgoingCallCount": ids[0].OutgoingCallCount ? ids[0].OutgoingCallCount : 0,
                                "OutboundAnswerCount": ids[0].OutboundAnswerCount ? ids[0].OutboundAnswerCount : 0,
                                "MissCallCount": ids[0].MissCallCount ? ids[0].MissCallCount : 0,
                                "Chatid": agent.ResourceId,
                                "AcwTime": ids[0].AcwTime,
                                "BreakTime": ids[0].BreakTime,
                                "HoldTime": ids[0].HoldTime,
                                "TransferCallCount": ids[0].TransferCallCount,
                                "OnCallTime": ((ids[0].OnCallTime ? ids[0].OnCallTime : 0) + (ids[0].OutboundCallTime ? ids[0].OutboundCallTime : 0)),
                                "IdleTime": ids[0].IdleTime,
                                "StaffedTime": ids[0].StaffedTime,
                                "slotState": {},
                                "RemoveProductivity": false
                            };
                            var resonseStatus = null, resonseAvailability = null, resourceMode = null;
                            var reservedDate = "";

                            if (agent.ConcurrencyInfo && agent.ConcurrencyInfo.length > 0) {

                                agent.ConcurrencyInfo.forEach(function (concurrency) {
                                    if (concurrency && concurrency.HandlingType === 'CALL' && concurrency.SlotInfo && concurrency.SlotInfo.length > 0) {

                                        // is user state Reason

                                        if (agent.Status.Reason && agent.Status.State) {
                                            resonseAvailability = agent.Status.State;
                                            resonseStatus = agent.Status.Reason;
                                            resourceMode = agent.Status.Mode;
                                        }


                                        if (concurrency.IsRejectCountExceeded) {
                                            resonseAvailability = "NotAvailable";
                                            resonseStatus = "Suspended";
                                        }

                                        agentProductivity.slotMode = resourceMode;


                                        if (concurrency.SlotInfo[0]) {

                                            reservedDate = concurrency.SlotInfo[0].StateChangeTime;
                                        }


                                        if (resonseAvailability == "NotAvailable" && (resonseStatus == "Reject Count Exceeded" || resonseStatus == "Suspended")) {
                                            agentProductivity.slotState = resonseStatus;
                                            agentProductivity.other = "Reject";
                                        } else if (resonseAvailability == "NotAvailable" && resonseStatus.toLowerCase().indexOf("break") > -1) {
                                            agentProductivity.slotState = resonseStatus;
                                            agentProductivity.other = "Break";
                                            reservedDate = agent.Status.StateChangeTime;
                                        } else {

                                            if (concurrency.SlotInfo[0]) {
                                                agentProductivity.slotState = concurrency.SlotInfo[0].State;
                                            }

                                        }

                                        agentProductivity.LastReservedTimeT = moment(reservedDate).format('DD/MM/YYYY HH:mm:ss');
                                        agentProductivity.slotStateTime = TimeFormatter(moment.utc(moment(moment(), "DD/MM/YYYY HH:mm:ss").diff(moment(reservedDate), 'seconds')));
                                        if (reservedDate == "") {
                                            agentProductivity.LastReservedTime = null;
                                        } else {
                                            agentProductivity.LastReservedTime = moment(reservedDate).format('DD/MM/YYYY HH:mm:ss')
                                            agentProductivity.slotStateTime = TimeFormatter(moment.utc(moment(moment(), "DD/MM/YYYY HH:mm:ss").diff(moment(reservedDate), 'seconds')));
                                        }


                                    }
                                });


                            } else {
                                resourceMode = agent.Status.Mode;
                                resonseAvailability = agent.Status.State;
                                resonseStatus = agent.Status.Reason;
                                agentProductivity.slotState = "Offline";
                                agentProductivity.slotMode = resourceMode;
                                agentProductivity.other = "Offline";
                                reservedDate = agent.Status.StateChangeTime;
                                agentProductivity.LastReservedTimeT = moment(reservedDate).format('DD/MM/YYYY HH:mm:ss');
                                agentProductivity.slotStateTime = TimeFormatter(moment.utc(moment(moment(), "DD/MM/YYYY HH:mm:ss").diff(moment(reservedDate), 'seconds')));

                                if (resonseAvailability == "NotAvailable" && resonseStatus.toLowerCase().indexOf("break") > -1) {
                                    agentProductivity.slotState = resonseStatus;
                                    agentProductivity.other = "Break";
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
                                    var data = $filter('filter')($scope.attributesList, {AttributeId: parseInt(item.Attribute)}, true);
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
                                                $scope.showCallDetails = true;
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

                            agentProductivity.profileName = agent.ResourceName;
                            $scope.Productivitys[agent.ResourceId] = agentProductivity;
                        }

                    }

                } catch (ex) {
                    console.log(ex);
                    //$scope.isLoading = false;
                }

            });
            $scope.isLoading = false;
        }
        else {
            $scope.isLoading = false;
        }

    };

    $scope.productivity = [];
    $scope.productivityData = [];

    $scope.GetProductivity = function () {
        var deferred = $q.defer();
        agentStatusService.GetProductivity().then(function (response) {
            $scope.productivity = response;
            deferred.resolve(true);
        }, function (error) {
            $scope.showAlert("Error", "Error", "ok", "Fail To Get productivity.");
            deferred.resolve(false);
        });
        return deferred.promise;
    };
    $scope.GetProductivity();

    $scope.onlineProfile = [];

    $scope.getProfileDetails = function () {
        var deferred = $q.defer();
        agentStatusService.GetProfileDetails().then(function (response) {
            if (response) {
                $scope.onlineProfile = response;
                deferred.resolve(true);
            }
            else {
                deferred.resolve(false);
            }
        });
        return deferred.promise;
    };
    $scope.stopTimerFn = function (val) {
        $scope.stopTimer =val;
    };
    var getAllRealTime = function () {
        $rootScope.$emit("load_calls");
        if ($scope.stopTimer) {
            return;
        }
        $q.all([
            $scope.getProfileDetails(),
            $scope.GetProductivity()
        ]).then(function (value) {
            calculateProductivity();
        }, function (reason) {

        });

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

    $scope.reloadCallDetails = function () {
        $rootScope.$emit("load_calls");
    };

    $scope.selectedAgent = undefined;
    $scope.agentSelected = function (agent) {
        $scope.selectedAgent =agent;
    };
    /*------------------------ Agent Summary ------------------------------------*/
});


