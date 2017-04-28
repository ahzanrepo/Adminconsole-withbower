/**
 * Created by Rajinda on 9/1/2016.
 */
mainApp.controller('AgentSummaryController', function ($scope, $state, $timeout,
                                                       dashboardService, moment, userImageList, $anchorScroll) {
    $anchorScroll();
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

    $scope.ReservedProfile = [];
    $scope.AvailableProfile = [];
    $scope.ConnectedProfile = [];
    $scope.AfterWorkProfile = [];
    $scope.OutboundProfile = [];
    $scope.SuspendedProfile = [];
    $scope.BreakProfile = [];
    $scope.profile = [];
    $scope.getProfileDetails = function () {
        dashboardService.GetProfileDetails().then(function (response) {
            $scope.ReservedProfile = [];
            $scope.AvailableProfile = [];
            $scope.ConnectedProfile = [];
            $scope.AfterWorkProfile = [];
            $scope.OutboundProfile = [];
            $scope.SuspendedProfile = [];
            $scope.BreakProfile = [];
            $scope.profile = [];
            if (response.length > 0) {
                for (var i = 0; i < response.length; i++) {
                    var profile = {
                        name: '',
                        slotState: null,
                        slotMode: null,
                        LastReservedTime: 0,
                        LastReservedTimeT: 0,
                        other: null
                    };

                    profile.name = response[i].ResourceName;
                    //get current user profile image
                    userImageList.getAvatarByUserName(profile.name, function (res) {
                        profile.avatar = res;
                    });










                    if (response[i].ConcurrencyInfo && response[i].ConcurrencyInfo.length > 0 &&
                        response[i].ConcurrencyInfo[0].SlotInfo.length > 0) {

                        // is user state Reason
                        var resonseStatus = null, resonseAvailability = null, resourceMode = null;
                        if (response[i].Status.Reason && response[i].Status.State) {
                            resonseAvailability = response[i].Status.State;
                            resonseStatus = response[i].Status.Reason;
                            resourceMode = response[i].Status.Mode;
                        }


                        if (response[i].ConcurrencyInfo[0].IsRejectCountExceeded) {
                            resonseAvailability = "NotAvailable";
                            resonseStatus = "Suspended";
                        }

                        profile.slotMode = resourceMode;

                        if(response[i].ConcurrencyInfo[0].SlotInfo[0]) {

                            var reservedDate = response[i].ConcurrencyInfo[0].SlotInfo[0].StateChangeTime;
                        }


                        if (resonseAvailability == "NotAvailable" && (resonseStatus == "Reject Count Exceeded" || resonseStatus == "Suspended")) {
                            profile.slotState = resonseStatus;
                            profile.other = "Reject";
                        } else if (resonseAvailability == "NotAvailable" && resonseStatus.toLowerCase().indexOf("break") > -1) {
                            profile.slotState = resonseStatus;
                            profile.other = "Break";
                            reservedDate = response[i].Status.StateChangeTime;
                        } else {

                            if (response[i].ConcurrencyInfo[0].SlotInfo[0]) {
                                profile.slotState = response[i].ConcurrencyInfo[0].SlotInfo[0].State;
                            }

                            /*if (response[i].ConcurrencyInfo[0].SlotInfo[0].State == "Available") {

                             reservedDate = response[i].Status.StateChangeTime;
                             }*/
                        }

                        profile.LastReservedTimeT = reservedDate;
                        if (reservedDate == "") {
                            profile.LastReservedTime = null;
                        } else {
                            profile.LastReservedTime = moment(reservedDate).format("h:mm a");
                        }




                        // else if (profile.slotState == 'Break' ||profile.slotState == 'MeetingBreak' ||
                        //         profile.slotState == 'MealBreak' || profile.slotState == 'TrainingBreak' ||
                        //         profile.slotState == 'TeaBreak' || profile.slotState == 'OfficialBreak' ||
                        //         profile.slotState == 'AUXBreak' ||
                        //         profile.slotState == 'ProcessRelatedBreak') {
                        //         $scope.BreakProfile.push(profile);
                        //     }

                    }else{
                        resourceMode = response[i].Status.Mode;
                        resonseAvailability = response[i].Status.State;
                        resonseStatus = response[i].Status.Reason;
                        profile.slotState = "Other";
                        profile.slotMode = resourceMode;
                        profile.other = "Offline";
                        reservedDate = response[i].Status.StateChangeTime;
                        profile.LastReservedTimeT = reservedDate;

                        if (resonseAvailability == "NotAvailable" && resonseStatus.toLowerCase().indexOf("break") > -1) {
                            profile.slotState = resonseStatus;
                            profile.other = "Break";
                        }
                    }


                    if (profile.slotState == 'Reserved') {
                        $scope.ReservedProfile.push(profile);
                    }
                    else if (profile.other == 'Break') {
                        $scope.BreakProfile.push(profile);
                    }
                    else if (profile.slotState == 'Connected') {
                        $scope.ConnectedProfile.push(profile);
                    } else if (profile.slotState == 'AfterWork') {
                        $scope.AfterWorkProfile.push(profile);
                    } else if (profile.slotMode == 'Outbound' && profile.other == null) {
                        $scope.OutboundProfile.push(profile);
                    } else if (profile.slotState == 'Suspended') {
                        $scope.SuspendedProfile.push(profile);
                    } else if (profile.slotState == 'Available') {
                        $scope.AvailableProfile.push(profile);
                    } else {
                        $scope.profile.push(profile);
                        //$scope.BreakProfile.push(profile);
                    }
                }
            }
        });
    };
    $scope.getProfileDetails();
});