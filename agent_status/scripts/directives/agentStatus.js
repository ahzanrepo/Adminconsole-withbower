/**
 * Created by Rajinda on 6/13/2016.
 */

mainApp.directive("agentstatus", function ($filter, moment, agentStatusService) {

    return {
        restrict: "EA",
        scope: {
            resItem: '=',
            attributesList: '=',
            activeCallList: '=',
            productivityList: '=',
            showSummary:'='
        },

        templateUrl: 'agent_status/view/template/agentStatus.html',


        link: function (scope, element, attributes) {


            var productivityData = $filter('filter')(scope.productivityList, {ResourceId: scope.resItem.ResourceId});
            if (productivityData.length > 0)
                scope.productivity = productivityData[0];


            scope.profile = {
                name: '',
                slotState: null,
                LastReservedTime: 0,
                other: null,
                slotStateTime: 0,
            };

            scope.profile.name = scope.resItem.ResourceName;
            if (scope.resItem.ConcurrencyInfo.length > 0 &&
                scope.resItem.ConcurrencyInfo[0].SlotInfo.length > 0) {

                // is user state Reason
                var resonseStatus = null,
                    resonseAvailability = null;
                if (scope.resItem.Status.Reason && scope.resItem.Status.State) {
                    resonseAvailability = scope.resItem.Status.State;
                    resonseStatus = scope.resItem.Status.Reason;
                }


                var reservedDate = scope.resItem.ConcurrencyInfo[0].
                    SlotInfo[0].StateChangeTime;

                if (resonseAvailability == "NotAvailable") {
                    scope.profile.slotState = resonseStatus;
                    scope.profile.other = "Break";
                    reservedDate = scope.resItem.Status.StateChangeTime;
                } else {
                    scope.profile.slotState = scope.resItem.ConcurrencyInfo[0].SlotInfo[0].State;

                    if (scope.resItem.ConcurrencyInfo[0].SlotInfo[0].State == "Available") {

                        reservedDate = scope.resItem.Status.StateChangeTime;
                    }
                }


                if (reservedDate == "") {
                    scope.profile.LastReservedTime = null;
                } else {
                    scope.profile.LastReservedTime = moment(reservedDate).format('DD/MM/YYYY HH:mm:ss');
                    scope.profile.slotStateTime = moment.utc(moment(moment(), "DD/MM/YYYY HH:mm:ss").diff(moment(reservedDate))).format("HH:mm:ss");
                }


            }

            /* Set Task Info*/
            scope.profile.taskList = [];
            angular.forEach(scope.resItem.ResourceAttributeInfo, function (item) {
                try {
                    var task = {};
                    task.taskType = item.HandlingType;
                    task.percentage = item.Percentage;
                    var data = $filter('filter')(scope.attributesList, {AttributeId: item.Attribute});
                    if (data.length > 0)
                        task.skill = data[0].Attribute;
                    scope.profile.taskList.push(task);
                }
                catch (ex) {
                    console.info(ex);
                }
            });
            /* Set Task Info*/

            /* Set ConcurrencyInfo */
            var sessionIds = [];
            angular.forEach(scope.resItem.ConcurrencyInfo, function (item) {
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
            scope.callInfos = [];
            angular.forEach(scope.activeCallList, function (item) {
                try {
                    var inboundCalls = $filter('filter')(item, {'Call-Direction': "inbound"});
                    angular.forEach(sessionIds, function (sid) {
                        try {
                            var callInfo = $filter('filter')(inboundCalls, {'Unique-ID': sid});
                            if (callInfo.length > 0) {

                                scope.callInfos.push(callInfo[0]);
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

            /*update damith */
            scope.safeApply = function (fn) {
                var phase = this.$root.$$phase;
                if (phase == '$apply' || phase == '$digest') {
                    if (fn && (typeof(fn) === 'function')) {
                        fn();
                    }
                } else {
                    this.$apply(fn);
                }
            };
            scope.scrollEnabled = false;
            scope.viewScroll = function () {
                scope.safeApply(function () {
                    scope.scrollEnabled = true;
                });

            };
            scope.hideScroll = function () {
                scope.safeApply(function () {
                    scope.scrollEnabled = false;
                });
            };

            scope.scrollOtherEnabled = false;
            scope.viewOtherScroll = function () {
                scope.safeApply(function () {
                    scope.scrollOtherEnabled = true;
                });

            };
            scope.hideOtherScroll = function () {
                scope.safeApply(function () {
                    scope.scrollOtherEnabled = false;
                });
            };
        }

    }
});

mainApp.filter('secondsToDateTime', [function () {
    return function (seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
}]);

mainApp.filter('millisecondsToDateTime', [function () {
    return function (seconds) {
        return new Date(1970, 0, 1).setMilliseconds(seconds);
    };
}]);