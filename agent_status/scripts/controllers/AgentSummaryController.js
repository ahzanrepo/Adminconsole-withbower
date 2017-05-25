/**
 * Created by Rajinda on 9/1/2016.
 */
mainApp.controller('AgentSummaryController', function ($scope, $state, $timeout,
                                                       dashboardService, moment, userImageList, $anchorScroll, subscribeServices) {
    $anchorScroll();
    //var getAllRealTime = function () {
    //    $scope.getProfileDetails();
    //    getAllRealTimeTimer = $timeout(getAllRealTime, $scope.refreshTime);
    //};
    //
    //var getAllRealTimeTimer = $timeout(getAllRealTime, $scope.refreshTime);
    //
    //$scope.$on("$destroy", function () {
    //    if (getAllRealTimeTimer) {
    //        $timeout.cancel(getAllRealTimeTimer);
    //    }
    //});
    //$scope.refreshTime = 1000;





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

                    profile.resourceName = response[i].ResourceName;
                    //get current user profile image
                    userImageList.getAvatarByUserName(profile.resourceName, function (res) {
                        profile.avatar = res;
                    });










                    if (response[i].ConcurrencyInfo && response[i].ConcurrencyInfo.length > 0) {

                        response[i].ConcurrencyInfo.forEach(function (concurrency) {
                            if(concurrency && concurrency.HandlingType === 'CALL' && concurrency.SlotInfo && concurrency.SlotInfo.length >0){

                                // is user state Reason
                                var resonseStatus = null, resonseAvailability = null, resourceMode = null;
                                if (response[i].Status.Reason && response[i].Status.State) {
                                    resonseAvailability = response[i].Status.State;
                                    resonseStatus = response[i].Status.Reason;
                                    resourceMode = response[i].Status.Mode;
                                }


                                if (concurrency.IsRejectCountExceeded) {
                                    resonseAvailability = "NotAvailable";
                                    resonseStatus = "Suspended";
                                }

                                profile.slotMode = resourceMode;

                                var reservedDate ="";
                                if(concurrency.SlotInfo[0]) {

                                    reservedDate = concurrency.SlotInfo[0].StateChangeTime;
                                }


                                if (resonseAvailability == "NotAvailable" && (resonseStatus == "Reject Count Exceeded" || resonseStatus == "Suspended")) {
                                    profile.slotState = resonseStatus;
                                    profile.other = "Reject";
                                } else if (resonseAvailability == "NotAvailable" && resonseStatus.toLowerCase().indexOf("break") > -1) {
                                    profile.slotState = resonseStatus;
                                    profile.other = "Break";
                                    reservedDate = response[i].Status.StateChangeTime;
                                } else {

                                    if (concurrency.SlotInfo[0]) {
                                        profile.slotState = concurrency.SlotInfo[0].State;
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




                            }
                        });


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

    var setResourceData = function (profile) {
        if (profile.slotState == 'Reserved') {
            $scope.ReservedProfile.push(profile);
        } else if (profile.other == 'Break') {
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
        }
    };

    var removeExistingResourceData = function (profile) {
        var stopSearch = false;
        $scope.ReservedProfile.forEach(function (data, i) {
            if(data.resourceName === profile.resourceName){
                $scope.ReservedProfile.splice(i, 1);
                stopSearch = true;
            }
        });

        if(!stopSearch) {
            $scope.AvailableProfile.forEach(function (data, i) {
                if (data.resourceName === profile.resourceName) {
                    $scope.AvailableProfile.splice(i, 1);
                    stopSearch = true;
                }
            });
        }
        if(!stopSearch) {
            $scope.ConnectedProfile.forEach(function (data, i) {
                if (data.resourceName === profile.resourceName) {
                    $scope.ConnectedProfile.splice(i, 1);
                    stopSearch = true;
                }
            });
        }
        if(!stopSearch) {
            $scope.AfterWorkProfile.forEach(function (data, i) {
                if(data.resourceName === profile.resourceName){
                    $scope.AfterWorkProfile.splice(i, 1);
                    stopSearch = true;
                }
            });
        }
        if(!stopSearch) {
            $scope.OutboundProfile.forEach(function (data, i) {
                if(data.resourceName === profile.resourceName){
                    $scope.OutboundProfile.splice(i, 1);
                    stopSearch = true;
                }
            });
        }
        if(!stopSearch) {
            $scope.SuspendedProfile.forEach(function (data, i) {
                if(data.resourceName === profile.resourceName){
                    $scope.SuspendedProfile.splice(i, 1);
                    stopSearch = true;
                }
            });
        }
        if(!stopSearch) {
            $scope.BreakProfile.forEach(function (data, i) {
                if(data.resourceName === profile.resourceName){
                    $scope.BreakProfile.splice(i, 1);
                    stopSearch = true;
                }
            });
        }
        if(!stopSearch) {
            $scope.profile.forEach(function (data, i) {
                if(data.resourceName === profile.resourceName){
                    $scope.profile.splice(i, 1);
                    stopSearch = true;
                }
            });
        }
    };

    subscribeServices.subscribeDashboard(function (event) {
        switch (event.roomName) {
            case 'ARDS:ResourceStatus':
                if (event.Message) {

                    userImageList.getAvatarByUserName(event.Message.userName, function (res) {
                        event.Message.avatar = res;
                    });

                    if(event.Message.task === 'CALL' || !event.Message.task) {
                        removeExistingResourceData(event.Message);
                        setResourceData(event.Message);
                    }

                }
                break;

            default:
                //console.log(event);
                break;

        }
    });



});