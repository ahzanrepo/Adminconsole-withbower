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
                    /*var profile = {
                        name: '',
                        slotState: null,
                        LastReservedTime: 0,
                        LastReservedTimeT: 0,
                        other: null
                    };

                    profile.name = response[i].ResourceName;*/
                    if (response[i].ConcurrencyInfo.length > 0) {

                        for(var j = 0; j < response[i].ConcurrencyInfo.length; j++){
                            var resourceTask = response[i].ConcurrencyInfo[j].HandlingType;

                            var profile = {
                                name: '',
                                slotInfo:[]
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

                                    var slotInfo = {slotState: null, LastReservedTime: 0, other: null};

                                    if (resonseAvailability == "NotAvailable" && resonseStatus == "Reject Count Exceeded") {
                                        slotInfo.slotState = resonseStatus;
                                        slotInfo.other = "Reject";
                                    } else if (resonseAvailability == "NotAvailable") {
                                        slotInfo.slotState = resonseStatus;
                                        slotInfo.other = "Break";
                                        reservedDate = response[i].Status.StateChangeTime;
                                    } else {
                                        slotInfo.slotState = response[i].ConcurrencyInfo[j].SlotInfo[k].State;

                                        if (response[i].ConcurrencyInfo[j].SlotInfo[k].State == "Available") {
                                            var slotStateTime = moment(reservedDate);
                                            var resourceStateTime = moment(response[i].Status.StateChangeTime);
                                            if(slotStateTime.isBefore(resourceStateTime)){
                                                reservedDate = response[i].Status.StateChangeTime;
                                            }
                                        }
                                    }
                                    if (reservedDate == "") {
                                        slotInfo.LastReservedTime = null;
                                    } else {
                                        slotInfo.LastReservedTime = moment(reservedDate).format("h:mm a");
                                    }

                                    profile.slotInfo.push(slotInfo);
                                    if (slotInfo.slotState == 'Reserved') {
                                        $scope.ReservedProfile[resourceTask].push(profile);
                                    }
                                    else if (slotInfo.slotState == 'Available') {
                                        $scope.AvailableProfile[resourceTask].push(profile);
                                    }
                                    else if (slotInfo.slotState == 'Connected') {
                                        $scope.ConnectedProfile[resourceTask].push(profile);
                                    } else if (slotInfo.slotState == 'AfterWork') {
                                        $scope.AfterWorkProfile[resourceTask].push(profile);
                                    } else if (slotInfo.slotState == 'Outbound') {
                                        $scope.OutboundProfile[resourceTask].push(profile);
                                    } else if (slotInfo.slotState == 'Suspended') {
                                        $scope.SuspendedProfile[resourceTask].push(profile);
                                    } else if (slotInfo.slotState == 'Break' ||slotInfo.slotState == 'MeetingBreak' ||
                                        slotInfo.slotState == 'MealBreak' || slotInfo.slotState == 'TrainingBreak' ||
                                        slotInfo.slotState == 'TeaBreak' || slotInfo.slotState == 'OfficialBreak' ||
                                        slotInfo.slotState == 'AUXBreak' ||
                                        slotInfo.slotState == 'ProcessRelatedBreak') {
                                        $scope.BreakProfile[resourceTask].push(profile);
                                    } else {
                                        $scope.profile[resourceTask].push(profile);
                                    }
                                }
                            }
                        }

                        //profile.LastReservedTimeT = reservedDate;
                        //if (reservedDate == "") {
                        //    profile.LastReservedTime = null;
                        //} else {
                        //    profile.LastReservedTime = moment(reservedDate).format("h:mm a");
                        //}
                        //
                        //if (profile.slotState == 'Reserved') {
                        //    $scope.ReservedProfile.push(profile);
                        //}
                        //else if (profile.slotState == 'Available') {
                        //    $scope.AvailableProfile.push(profile);
                        //}
                        //else if (profile.slotState == 'Connected') {
                        //    $scope.ConnectedProfile.push(profile);
                        //} else if (profile.slotState == 'AfterWork') {
                        //    $scope.AfterWorkProfile.push(profile);
                        //} else if (profile.slotState == 'Outbound') {
                        //    $scope.OutboundProfile.push(profile);
                        //} else if (profile.slotState == 'Suspended') {
                        //    $scope.SuspendedProfile.push(profile);
                        //} else if (profile.slotState == 'Break' ||profile.slotState == 'MeetingBreak' ||
                        //    profile.slotState == 'MealBreak' || profile.slotState == 'TrainingBreak' ||
                        //    profile.slotState == 'TeaBreak' || profile.slotState == 'OfficialBreak' ||
                        //    profile.slotState == 'AUXBreak' ||
                        //    profile.slotState == 'ProcessRelatedBreak') {
                        //    $scope.BreakProfile.push(profile);
                        //} else {
                        //    $scope.profile.push(profile);
                        //}

                    }
                }
            }
        });
    };
    $scope.getProfileDetails();
});