/**
 * Created by Rajinda on 9/1/2016.
 */
mainApp.controller('AgentSummaryController', function ($scope, $state, $timeout,
                                                       dashboardService, moment) {
    var getAllRealTime = function () {
        $scope.getProfileDetails();
        getAllRealTimeTimer = $timeout(getAllRealTime, $scope.refreshTime);
    };

    var getAllRealTimeTimer = $timeout(getAllRealTime, $scope.refreshTime);

    $scope.$on("$destroy", function () {
        if (getAllRealTimeTimer) {
            $timeout.cancel(getAllRealTimeTimer);
        }
    });
    $scope.refreshTime = 1000;

    $scope.ReservedProfile = {CALL: [], CHAT: [], SMS: [], SOCIAL:[], TICKET:[]};
    $scope.AvailableProfile = {CALL: [], CHAT: [], SMS: [], SOCIAL:[], TICKET:[]};
    $scope.ConnectedProfile = {CALL: [], CHAT: [], SMS: [], SOCIAL:[], TICKET:[]};
    $scope.AfterWorkProfile = {CALL: [], CHAT: [], SMS: [], SOCIAL:[], TICKET:[]};
    $scope.OutboundProfile = {CALL: [], CHAT: [], SMS: [], SOCIAL:[], TICKET:[]};
    $scope.SuspendedProfile = {CALL: [], CHAT: [], SMS: [], SOCIAL:[], TICKET:[]};
    $scope.BreakProfile = {CALL: [], CHAT: [], SMS: [], SOCIAL:[], TICKET:[]};
    $scope.profile = {CALL: [], CHAT: [], SMS: [], SOCIAL:[], TICKET:[]};
    $scope.getProfileDetails = function () {
        dashboardService.GetProfileDetails().then(function (response) {
            $scope.ReservedProfile = {CALL: [], CHAT: [], SMS: [], SOCIAL:[], TICKET:[]};
            $scope.AvailableProfile = {CALL: [], CHAT: [], SMS: [], SOCIAL:[], TICKET:[]};
            $scope.ConnectedProfile = {CALL: [], CHAT: [], SMS: [], SOCIAL:[], TICKET:[]};
            $scope.AfterWorkProfile = {CALL: [], CHAT: [], SMS: [], SOCIAL:[], TICKET:[]};
            $scope.OutboundProfile = {CALL: [], CHAT: [], SMS: [], SOCIAL:[], TICKET:[]};
            $scope.SuspendedProfile = {CALL: [], CHAT: [], SMS: [], SOCIAL:[], TICKET:[]};
            $scope.BreakProfile = {CALL: [], CHAT: [], SMS: [], SOCIAL:[], TICKET:[]};
            $scope.profile = {CALL: [], CHAT: [], SMS: [], SOCIAL:[], TICKET:[]};
            if (response.length > 0) {
                for (var i = 0; i < response.length; i++) {

                    if (response[i].ConcurrencyInfo.length > 0) {

                        for(var j = 0; j < response[i].ConcurrencyInfo.length; j++){
                            var resourceTask = response[i].ConcurrencyInfo[j].HandlingType;

                            var profile = {
                                name: '',
                                slotInfo:[{slotState: null,
                                    LastReservedTime: 0,
                                    other: null}]
                            };

                            profile.name = response[i].ResourceName;

                            if(response[i].ConcurrencyInfo[j].SlotInfo.length > 0) {
                                for (var k = 0; k < response[i].ConcurrencyInfo[j].SlotInfo.length; k++) {
                                    var resonseStatus = null,
                                        resonseAvailability = null;
                                    if (response[i].Status.Reason && response[i].Status.State) {
                                        resonseAvailability = response[i].Status.State;
                                        resonseStatus = response[i].Status.Reason;
                                    }
                                    if (response[i].ConcurrencyInfo[j].IsRejectCountExceeded) {
                                        resonseAvailability = "NotAvailable";
                                        resonseStatus = "Suspended";
                                    }


                                    var reservedDate = response[i].ConcurrencyInfo[j].
                                        SlotInfo[k].StateChangeTime;

                                    if (resonseAvailability == "NotAvailable" && resonseStatus == "Reject Count Exceeded") {
                                        profile.slotInfo[k].slotState = resonseStatus;
                                        profile.slotInfo[k].other = "Reject";
                                    } else if (resonseAvailability == "NotAvailable") {
                                        profile.slotInfo[k].slotState = resonseStatus;
                                        profile.slotInfo[k].other = "Break";
                                        reservedDate = response[i].Status.StateChangeTime;
                                    } else {
                                        profile.slotInfo[k].slotState = response[i].ConcurrencyInfo[j].SlotInfo[k].State;

                                        if (response[i].ConcurrencyInfo[j].SlotInfo[k].State == "Available") {

                                            reservedDate = response[i].Status.StateChangeTime;
                                        }
                                    }


                                    if (reservedDate == "") {
                                        profile.slotInfo[k].LastReservedTime = null;
                                    } else {
                                        profile.slotInfo[k].LastReservedTime = moment(reservedDate).format("h:mm a");
                                    }


                                    if (profile.slotInfo[k].slotState == 'Reserved') {
                                        $scope.ReservedProfile[resourceTask].push(profile);
                                    }
                                    else if (profile.slotInfo[k].slotState == 'Available') {
                                        $scope.AvailableProfile[resourceTask].push(profile);
                                    }
                                    else if (profile.slotInfo[k].slotState == 'Connected') {
                                        $scope.ConnectedProfile[resourceTask].push(profile);
                                    } else if (profile.slotInfo[k].slotState == 'AfterWork') {
                                        $scope.AfterWorkProfile[resourceTask].push(profile);
                                    } else if (profile.slotInfo[k].slotState == 'Outbound') {
                                        $scope.OutboundProfile[resourceTask].push(profile);
                                    } else if (profile.slotInfo[k].slotState == 'Suspended') {
                                        $scope.SuspendedProfile[resourceTask].push(profile);
                                    } else if (profile.slotInfo[k].slotState == 'Break' ||profile.slotInfo[k].slotState == 'MeetingBreak' ||
                                        profile.slotInfo[k].slotState == 'MealBreak' || profile.slotInfo[k].slotState == 'TrainingBreak' ||
                                        profile.slotInfo[k].slotState == 'TeaBreak' || profile.slotInfo[k].slotState == 'OfficialBreak' ||
                                        profile.slotInfo[k].slotState == 'AUXBreak' ||
                                        profile.slotInfo[k].slotState == 'ProcessRelatedBreak') {
                                        $scope.BreakProfile[resourceTask].push(profile);
                                    } else {
                                        $scope.profile[resourceTask].push(profile);
                                    }
                                }
                            }
                        }

                        // is user state Reason

                    }
                }
            }
        });
    };
    $scope.getProfileDetails();
});