/**
 * Created by Waruna on 9/27/2017.
 */

mainApp.controller("detailsDashBoardController", function ($scope, $rootScope, $filter, $stateParams, $anchorScroll, $timeout, $q, uiGridConstants, queueMonitorService, subscribeServices, agentStatusService, contactService, cdrApiHandler,ShareData) {
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

    $scope.showAlert = function (tittle, type, content) {
        new PNotify({
            title: tittle,
            text: content,
            type: type,
            styling: 'bootstrap3'
        });
    };

    /*------------------------ queue details ------------------------------------*/
    var statusTemplate = '<timer start-time=\"row.entity.MaxWaitingMS\" interval=\"1000\"> {{hhours}}:{{mminutes}}:{{sseconds}}</timer>';
    var maxWaitTimeTemplate = "<div>{{row.entity.MaxWaitTime| secondsToDateTime | date:'HH:mm:ss'}}</div>";

    $scope.gridQOptions = {
        enableSorting: true,
        enableRowSelection: false,
        enableRowHeaderSelection: false,
        multiSelect: false,
        modifierKeysToMultiSelect: false,
        noUnselect: false,
        columnDefs: [
            {
                name: 'QueueName', field: 'QueueName', headerTooltip: 'Queue Name', width: '15%', sort: {
                direction: uiGridConstants.ASC
            }
            },
            {name: 'Cur.Waiting', field: 'CurrentWaiting', headerTooltip: 'Current Waiting', cellClass: 'table-number'},

            {
                name: 'Avg.Wait',
                field: 'AverageWaitTime',
                headerTooltip: 'Average Wait Time',
                cellFilter: " number : 2",
                cellClass: 'table-time',
                cellTemplate: "<div>{{row.entity.AverageWaitTime|secondsToDateTime| date:'HH:mm:ss'}}</div>"
            },
            {
                name: 'Cur.MaxWait',
                field: 'CurrentMaxWaitTime',
                headerTooltip: 'Current MaxWait Time',
                cellTemplate: statusTemplate,
                cellClass: 'table-time'
            },
            {
                name: 'MaxWait',
                field: 'MaxWaitTime',
                headerTooltip: 'Max Waiting Time',
                cellTemplate: maxWaitTimeTemplate,
                cellClass: 'table-time'
            },
            {name: 'Q.Dropped', field: 'QueueDropped', headerTooltip: 'Queue Dropped', cellClass: 'table-number'},
            {name: 'Answered', field: 'TotalAnswered', headerTooltip: 'Total Answered', cellClass: 'table-number'},
            {name: 'Queued', field: 'TotalQueued', headerTooltip: 'Total Queued', cellClass: 'table-number'},
            {name: 'presentage', field: 'presentage', headerTooltip: 'presentage', cellClass: 'presentage'},
            {name: 'Time', field: 'EventTime', headerTooltip: 'Last Event Time', visible: false},
            {name: 'id', field: 'id', visible: false}
        ],
        data: [],
        onRegisterApi: function (gridApi) {
            //$scope.grid1Api = gridApi;
        }
    };

    $scope.queues = {test: "dasdas"};

    subscribeServices.subscribe('queuedetail');
    //subscribe services
    subscribeServices.subscribeDashboard('detaildashboard', function (event) {
        if (event && event.Message && event.Message.businessUnit && ((ShareData.BusinessUnit.toLowerCase() === 'all') || (event.Message.businessUnit.toLowerCase() === ShareData.BusinessUnit.toLowerCase()))) {
            switch (event.roomName) {
                case 'QUEUE:QueueDetail':
                    if (event.Message) {
                        var item = event.Message.queueDetail.QueueInfo;
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
                        item.id = event.Message.queueDetail.QueueId;

                        item.QueueName = event.Message.QueueName;
                        item.AverageWaitTime = Math.round(item.AverageWaitTime * 100) / 100;

                        if (item.TotalQueued > 0) {
                            item.presentage = Math.round((item.TotalAnswered / item.TotalQueued) * 100);
                        }

                        if (!$scope.queues[event.Message.queueDetail.QueueId]) {
                            $scope.queueList.push(item);
                        }
                        $scope.safeApply(function () {
                            item.CurrentMaxWaitTime = (item.CurrentMaxWaitTime === 0) ? undefined : item.CurrentMaxWaitTime;
                            $scope.queues[event.Message.queueDetail.QueueId] = item;
                        });

                        var res = [];
                        for (var x in $scope.queues) {
                            $scope.queues.hasOwnProperty(x) && res.push($scope.queues[x])
                        }
                        $scope.safeApply(function () {
                            $scope.gridQOptions.data = res;
                        });
                    }
                    break;
            }
        }
    });

    $scope.GetAllQueueStatistics = function () {

        queueMonitorService.GetAllQueueStats().then(function (response) {
            $scope.queues = {};
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
                item.CurrentMaxWaitTime = (item.CurrentMaxWaitTime === 0) ? undefined : item.CurrentMaxWaitTime;
                $scope.queues[item.id] = item;
                var res = [];
                for (var x in $scope.queues) {
                    $scope.queues.hasOwnProperty(x) && res.push($scope.queues[x])
                }
                $scope.gridQOptions.data = res;
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
            $scope.showAlert("Error", "error", "Fail To Get Attribute List.");
        });
    };
    $scope.GetAllAttributes();

    var TimeFormatter = function (seconds) {

        var timeStr = '00:00:00';
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

                    timeStr = tempDays + 'd ' + ("00" + durationObj._data.hours).slice(-2) + ':' + ("00" + durationObj._data.minutes).slice(-2) + ':' + ("00" + durationObj._data.seconds).slice(-2);
                } else {

                    timeStr = ("00" + durationObj._data.hours).slice(-2) + ':' + ("00" + durationObj._data.minutes).slice(-2) + ':' + ("00" + durationObj._data.seconds).slice(-2);
                    //(durationObj._data.hours<=9)?('0'+durationObj._data.hours):durationObj._data.hours + ':' + (durationObj._data.minutes<=9)?('0'+durationObj._data.minutes):durationObj._data.minutes  + ':' + (durationObj._data.seconds<=9)?('0'+durationObj._data.seconds):durationObj._data.seconds;
                }
            }
        }
        return timeStr;
    };

    $scope.Productivitys = {Loading: "Loading"};
    var calculateProductivity = function () {

        $scope.showCallDetails = false;
        if ($scope.onlineProfile) {

            angular.forEach($scope.onlineProfile, function (agent) {
                try {

                    if (agent && (agent.BusinessUnit.toLowerCase() === ShareData.BusinessUnit.toLowerCase()||ShareData.BusinessUnit.toLowerCase()==="all")) {


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
        $scope.Productivitys = {};
        var deferred = $q.defer();
        agentStatusService.GetProductivity().then(function (response) {
            $scope.productivity = response;
            deferred.resolve(true);
        }, function (error) {
            $scope.showAlert("Error", "error", "Fail To Get productivity.");
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
        $scope.stopTimer = val;
    };
    var getAllRealTime = function () {
        $rootScope.$emit("load_calls");
        if ($scope.selectedAgent) {
            return;
        }
        $q.all([
            $scope.getProfileDetails(),
            $scope.GetProductivity()
        ]).then(function (value) {

            calculateProductivity();

            var res = [];
            for (var x in $scope.Productivitys) {
                $scope.Productivitys.hasOwnProperty(x) && res.push($scope.Productivitys[x])
            }
            $scope.gridOptions.data = res;
        }, function (reason) {

        });

        getAllRealTimeTimer = $timeout(getAllRealTime, $scope.refreshTime);
    };

    // getAllRealTime();
    var getAllRealTimeTimer = $timeout(getAllRealTime, $scope.refreshTime);

    $scope.gridOptions = {
        enableColumnResizing: true,
        enableRowSelection: true,
        enableRowHeaderSelection: true,
        multiSelect: false,
        modifierKeysToMultiSelect: false,
        noUnselect: false, enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
        columnDefs: [
            {
                name: 'Name',
                field: 'ResourceName',
                headerTooltip: 'Resource Name',
                enableFiltering: true,
                enableCellEdit: false,
                enableSorting: true,
                width: '15%',
                sort: {
                    direction: uiGridConstants.ASC
                }
            },
            {
                name: 'State',
                field: 'slotState',
                headerTooltip: 'Agent State',
                enableFiltering: false,
                enableCellEdit: false,
                enableSorting: true,
                width: '10%'
            },
            {
                name: 'Mode',
                field: 'slotMode',
                headerTooltip: 'Agent Mode',
                enableFiltering: false,
                enableCellEdit: false,
                enableSorting: true,
                width: "*"
            },
            {
                name: 'State Time',
                field: 'slotStateTime',
                headerTooltip: 'State Time',
                enableFiltering: false,
                enableCellEdit: false,
                enableSorting: true,
                width: "*", cellClass: 'table-number'
            },
            {
                name: 'Inc.CallCount',
                field: 'IncomingCallCount',
                headerTooltip: 'Incoming Call Count',
                enableFiltering: false,
                enableCellEdit: false,
                enableSorting: true,
                width: "*", cellClass: 'table-number'
            },
            {
                name: 'Out.CallCount',
                field: 'OutgoingCallCount',
                headerTooltip: 'Outgoing Call Count',
                enableFiltering: false,
                enableCellEdit: false,
                enableSorting: true,
                width: "*", cellClass: 'table-number'
            },
            {
                name: 'MissCallCount',
                field: 'MissCallCount',
                headerTooltip: 'MissCall Count',
                enableFiltering: false,
                enableCellEdit: false,
                enableSorting: true,
                width: "*", cellClass: 'table-number'
            },
            {
                name: 'Tran.CallCount',
                field: 'TransferCallCount',
                headerTooltip: 'Transfer Call Count',
                enableFiltering: false,
                enableCellEdit: false,
                enableSorting: true,
                width: "*", cellClass: 'table-number'
            },
            {
                name: 'AcwTime',
                field: 'AcwTime',
                headerTooltip: 'Acw Time',
                enableFiltering: false,
                enableCellEdit: false,
                enableSorting: true,
                width: "*", cellClass: 'table-time',
                cellTemplate: "<div>{{row.entity.AcwTime| secondsToDateTime | date:'HH:mm:ss'}}</div>"
            },
            {
                name: 'BreakTime',
                field: 'BreakTime',
                headerTooltip: 'Break Time',
                enableFiltering: false,
                enableCellEdit: false,
                enableSorting: true,
                width: "*", cellClass: 'table-time',
                cellTemplate: "<div>{{row.entity.BreakTime| secondsToDateTime | date:'HH:mm:ss'}}</div>"
            },
            {
                name: 'OnCallTime',
                field: 'OnCallTime',
                headerTooltip: 'OnCall Time',
                enableFiltering: false,
                enableCellEdit: false,
                enableSorting: true,
                width: "*", cellClass: 'table-time',
                cellTemplate: "<div>{{row.entity.OnCallTime| secondsToDateTime | date:'HH:mm:ss'}}</div>"
            },
            {
                name: 'HoldTime',
                field: 'HoldTime',
                headerTooltip: 'Hold Time',
                enableFiltering: false,
                enableCellEdit: false,
                enableSorting: true,
                width: "*", cellClass: 'table-time',
                cellTemplate: "<div>{{row.entity.HoldTime| secondsToDateTime | date:'HH:mm:ss'}}</div>"
            },
            {
                name: 'IdleTime',
                field: 'IdleTime',
                headerTooltip: 'Idle Time',
                enableFiltering: false,
                enableCellEdit: false,
                enableSorting: true,
                width: "*", cellClass: 'table-time',
                cellTemplate: "<div>{{row.entity.IdleTime| secondsToDateTime | date:'HH:mm:ss'}}</div>"
            },
            {
                name: 'StaffedTime',
                field: 'StaffedTime',
                headerTooltip: 'Staffed Time',
                enableFiltering: false,
                enableCellEdit: false,
                enableSorting: true,
                width: "*", cellClass: 'table-time',
                cellTemplate: "<div>{{row.entity.StaffedTime| secondsToDateTime | date:'HH:mm:ss'}}</div>"
            },

        ],
        data: [{test: "loading"}],
        onRegisterApi: function (gridApi) {
            $scope.grid1Api = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                $scope.selectedAgent = undefined;
                if (row.isSelected) {
                    $scope.callLogPage = 1;
                    $scope.gridCalllogsOptions.data = [];
                    $scope.gridCalllogsOptions.data.push({
                        callType: 'No Data',
                        number: 'No Data',
                        time: 'No Data'
                    });
                    $scope.selectedAgent = row.entity;
                    $scope.GetCallLogs(1, row.entity.ResourceName);
                    $scope.gridTaskOptions.data = $scope.selectedAgent.taskList;
                    $scope.getAgentStatusList($scope.selectedAgent);
                }
            });
        }
    };

    $scope.$on("$destroy", function () {
        if (getAllRealTimeTimer) {
            $timeout.cancel(getAllRealTimeTimer);
        }


        subscribeServices.unSubscribeDashboard('detaildashboard');

    });

    $scope.refreshTime = 10000;

    $scope.reloadCallDetails = function () {
        $rootScope.$emit("load_calls");
    };

    $scope.selectedAgent = undefined;
    $scope.agentSelected = function (agent) {
        $scope.selectedAgent = agent;
    };


    /*------------------------ Agent Summary ------------------------------------*/

    /*------------------------ Agent info ------------------------------------*/

    $scope.gridTaskOptions = {
        enableSorting: true,
        enableRowSelection: false,
        enableRowHeaderSelection: false,
        multiSelect: false,
        modifierKeysToMultiSelect: false,
        noUnselect: false,
        columnDefs: [
            {name: 'Task Type', field: 'taskType', headerTooltip: 'Task Type'},
            {name: 'Skill', field: 'skill', headerTooltip: 'Skill'},
            {
                name: 'Percentage', field: 'percentage', headerTooltip: 'Percentage', cellClass: 'presentage', sort: {
                direction: uiGridConstants.DESC
            }
            }
        ],
        data: [],
        onRegisterApi: function (gridApi) {
            //$scope.grid1Api = gridApi;
        }
    };

    $scope.callLogPage = 0;
    $scope.gridCalllogsOptions = {
        enableSorting: true,
        enableRowSelection: false,
        enableRowHeaderSelection: false,
        multiSelect: false,
        modifierKeysToMultiSelect: false,
        noUnselect: false,
        columnDefs: [
            {name: 'callType', field: 'callType', headerTooltip: 'Call Type'},
            {name: 'number', field: 'number', headerTooltip: 'Number', cellClass: 'table-number'},
            {name: 'time', field: 'time', headerTooltip: 'Time', cellClass: 'table-number'}
        ],
        data: [{
            callType: 'Loading',
            number: 'Loading',
            time: 'Loading'
        }],
        onRegisterApi: function (gridApi) {
            /*gridApi.pagination.on.paginationChanged($scope, function (pageNumber, pageSize) {

             });*/
            gridApi.core.on.scrollEnd($scope, function (row) {
                if (row.y.percentage > 0) {
                    $scope.callLogPage = $scope.callLogPage + 1;
                    $scope.GetCallLogs($scope.callLogPage, $scope.selectedAgent.ResourceName);
                }

            });
        }
    };

    $scope.callLog = [];
    $scope.GetCallLogs = function (pageNumber, name) {

        contactService.GetCallLogs(pageNumber, new Date(), name).then(function (response) {

            if (response && response.length != 0) {
                response.map(function (item) {
                    if (item) {

                        $scope.gridCalllogsOptions.data.push(item.data);
                    }
                });

            }
            if (pageNumber === 1)
                $scope.gridCalllogsOptions.data.splice(0, 1);
        });
    };


    /*------------------------ Agent info ------------------------------------*/

    /*------------------------ getAgentStatusList ------------------------------------*/

    $scope.gridAgentLogsOptions = {
        enableSorting: true,
        enableRowSelection: false,
        enableRowHeaderSelection: false,
        multiSelect: false,
        modifierKeysToMultiSelect: false,
        noUnselect: false,
        columnDefs: [
            {name: 'Reason', field: 'Reason', headerTooltip: 'Reason'},
            {
                name: 'time',
                field: 'createdAt',
                headerTooltip: 'Time',
                cellFilter: 'date:"dd MMM yyyy hh:mm:ss"',
                cellClass: 'table-time',
                sort: {
                    direction: uiGridConstants.DESC
                }
            }
        ],
        data: [],
        onRegisterApi: function (gridApi) {
            //$scope.grid1Api = gridApi;
        }
    };

    $scope.getAgentStatusList = function (selectedAgent) {
        $scope.gridAgentLogsOptions.data = [];
        var momentTz = moment.parseZone(new Date()).format('Z');
        momentTz = momentTz.replace("+", "%2B");
        var d = moment().format("YYYY-MM-DD");
        var startDate = d + ' 00:00:00' + momentTz;
        var endDate = d + ' 23:59:59' + momentTz;
        var agentFilter = [];
        agentFilter.push(selectedAgent);
        try {
            cdrApiHandler.getAgentStatusList(startDate, endDate, undefined, agentFilter).then(function (agentListResp) {
                for (var key in agentListResp.Result) {
                    $scope.gridAgentLogsOptions.data = agentListResp.Result[key];
                }
            }).catch(function (err) {
                $scope.showAlert('Error', 'error', 'Error occurred while loading agent status events');
            });

        }
        catch (ex) {
            $scope.showAlert('Error', 'error', 'Error occurred while loading agent status events');
        }

    };


    /*------------------------ getAgentStatusList ------------------------------------*/

    $scope.BusinessUnitUsers = [];
    /*Listing For Business Unit Change*/
    $scope.$watch(function () {
        return ShareData.BusinessUnit;
    }, function (newValue, oldValue) {
        if (newValue.toString().toLowerCase() != oldValue.toString().toLowerCase()) {
            $scope.GetAllQueueStatistics();
            getAllRealTime();
            /*ShareData.GetUserByBusinessUnit().then(function (respons) {
                $scope.BusinessUnitUsers = respons;
            }, function (error) {

            });*/
            console.log("Reload Dashboard ****************************************");
        }

    });
});


