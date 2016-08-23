/**
 * Created by Damith on 5/28/2016.
 */

'use strict';
mainApp.controller('mainCtrl', function ($scope, $rootScope, $state, jwtHelper, loginService, authService) {


    //added by pawan

    $scope.CallStatus = null;
    $scope.loginData = {};
    $scope.callListStatus = false;
    $scope.isRegistered = false;
    $scope.inCall = false;

    //check my navigation
    //is can access
    loginService.getNavigationAccess(function (result) {
        $scope.accessNavigation = result;
    });


    $scope.clickDirective = {
        goLogout: function () {

            loginService.Logoff(undefined, function (issuccess) {

                if (issuccess) {

                    $state.go('login');

                } else {

                }

            });
            //loginService.clearCookie("@loginToken");
            //$state.go('login');
        },
        goDashboard: function () {
            $state.go('console.dashboard');
        },
        goProductivity: function () {
            $state.go('console.productivity');
        },
        goFilegallery: function () {
            $state.go('console.filegallery');
        },
        goFileupload: function () {
            $state.go('console.fileupload');
        },
        goAttributeList: function () {
            $state.go('console.attributes');
        },
        goResourceList: function () {
            $state.go('console.resources');
        },
        goRealTimeQueued: function () {
            $state.go('console.realtime-queued');
        },
        goCdrReport: function () {
            $state.go('console.cdr');
        },
        goCallMonitor: function () {
            $state.go('console.callmonitor');
        },
        goSipUser: function () {
            $state.go('console.sipuser');
        },
        goUsers: function () {
            $state.go('console.users');
        },
        goPbxUsers: function () {
            $state.go('console.pbxuser');
        },
        goPbxAdmin: function () {
            $state.go('console.pbxadmin');
        },
        goMyNumbers: function () {
            $state.go('console.myNumbers');
        },
        goRingGroup: function () {
            $state.go('console.ringGroup');
        },
        GoApplicationAccessManager: function () {
            $state.go('console.applicationAccessManager');
        },
        goAgentStatus: function () {
            $state.go('console.AgentStatus');
        },
        goRule: function () {
            $state.go('console.rule');
        },
        goAbandonCallList: function () {
            $state.go('console.abandonCdr');
        },
        goApplications: function () {
            $state.go('console.application');
        },
        goHoldMusic: function () {
            $state.go('console.holdmusic');
        },
        goLimits: function () {
            $state.go('console.limits');
        },
        goConference: function () {
            $state.go('console.conference');
        },
        /*goConferenceMonitor: function () {
         $state.go('console.conferencemonitor');
         },*/
        goQueueSummary: function () {
            $state.go('console.queuesummary');
        },
        goAgentSummary: function () {
            $state.go('console.agentsummary');
        },
        goArdsConfig: function () {
            $state.go('console.ardsconfig');
        },

        goProfile: function () {
            $state.go('console.myprofile');
        },

        goExtension: function () {
            $state.go('console.extension');
        },
        goDID: function () {
            $state.go('console.did');
        },
        goSchedule: function () {
            $state.go('console.scheduler');
        },
        goCompanyConfig: function () {
            $state.go('console.companyconfig');
        },
        goTranslations: function () {
            $state.go('console.translations');
        },
        goTicketTrigger: function ()
        {
            $state.go('console.trigger');
        },
        goTemplateCreater: function () {
            $state.go('console.templatecreater');
        },
        goTriggerConfiguration: function () {
            $state.go('console.trigger.triggerConfiguration');
        },
        goTagManager: function () {
            $state.go('console.tagmanager');
        },
        goCallSummary: function () {
            $state.go('console.callsummary');

        }
    };

    var getUserName = function () {
        var userDetails = loginService.getTokenDecode();
        console.log(userDetails);
        if (userDetails) {
            $scope.userName = userDetails.iss;
        }
    };
    getUserName();


    $scope.scrollEnabled = false;
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
    $scope.scrollEnabled = false;
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


    //update pawan


    var authToken = authService.GetToken();


    var getRegistrationData = function (authToken, password) {

        var decodeData = jwtHelper.decodeToken(authToken);
        console.log("Token Obj " + decodeData);

        if (decodeData.context.veeryaccount) {
            var values = decodeData.context.veeryaccount.contact.split("@");
            var sipUri = "sip:" + decodeData.context.veeryaccount.contact;
            var WSUri = "wss://" + values[1] + ":7443";
            var realm = values[1];
            var username = values[0];
            var displayname = values[0];
            var loginData = {
                realm: realm,
                impi: displayname,
                impu: sipUri,
                display_name: decodeData.iss,
                websocket_proxy_url: WSUri,
                password: password


            }

            return loginData;

        }
        else {
            return false;
        }


    };

    var onRegistrationCompleted = function (response) {
        //console.log(response);
        console.log("Hit registered");
        console.log("Registerd", "Successfully registered", "success");
        $scope.callListStatus = true;
        $scope.$apply(function () {
            $scope.isRegistered = true;
            $rootScope.$emit('register_status', $scope.isRegistered);

        });

    };

    var onUnRegisterCompleted = function (response) {
        //console.log(response);
        console.log("Unregistered", "Registration terminated", "notice");
        $scope.callListStatus = false;
        $scope.$apply(function () {
            $scope.inCall = false;
            $scope.isRegistered = false;
            $rootScope.$emit('register_status', $scope.isRegistered);
        });

    };

    var onCallDisconnected = function () {
        //console.log(response);
        $scope.isToggleMenu = false;
        $('#callWidget').animate({
            right: '-5%'
        });
        console.log("Call disconnected", "Call is disconnected", "notice");
        $scope.clickBtnStateName = "Waiting";
        $scope.$apply(function () {
            $scope.isCallMonitorOption = 0;
            $scope.inCall = false;
        });

        $scope.CallStatus = null;
        $scope.currentSessionID = null;

        $rootScope.$emit('load_calls', true);


    };

    var onCallConnected = function () {
        $scope.isToggleMenu = true;
        $('#callWidget').animate({
            right: '-6px'
        });
        $scope.$apply(function () {
            console.log("onCallConnected");
            $scope.CallStatus = "LISTEN";
            $scope.clickBtnStateName = "Listen";
            $scope.isCallMonitorOption = 1;
            $scope.inCall = true;
        });

    };

    $scope.RegisterPhone = function (password) {
        var loginData = getRegistrationData(authToken, password);
        if (loginData) {
            Initiate(loginData, onRegistrationCompleted, onCallDisconnected, onCallConnected, onUnRegisterCompleted);
        }
        else {
            console.log("registration failed");
        }
    };

    $scope.UnregisterPhone = function () {
        unregister();
    }

    $scope.HangUpCall = function () {
        hangupCall();
        $scope.CallStatus = null;
        $scope.clickBtnStateName = "waiting";
    };

    $scope.ThreeWayCall = function () {
        //alert("barged: "+bargeID);
        //callMonitorSrv.threeWayCall(bargeID,protocol).then(onThreeWayComplete,onError);

        sendDTMF('3');
        $scope.CallStatus = 'THREEWAY';
        $scope.clickBtnStateName = "Conference ";
    };

    $scope.BargeCall = function () {
        //alert("barged: "+bargeID);

        //callMonitorSrv.bargeCalls($scope.currentSessionID,protocol).then(onBargeComplete,onError);
        sendDTMF('2');
        $scope.CallStatus = "BARGED";
        $scope.clickBtnStateName = "Barged";
    };

    $scope.ReturnToListen = function () {
        //alert("barged: "+bargeID);
        //callMonitorSrv.threeWayCall(bargeID,protocol).then(onThreeWayComplete,onError);

        sendDTMF('0');
        $scope.CallStatus = 'LISTEN';
        $scope.clickBtnStateName = "Listen";
    };

    $scope.SwapUser = function () {
        //alert("barged: "+bargeID);
        //callMonitorSrv.threeWayCall(bargeID,protocol).then(onThreeWayComplete,onError);

        sendDTMF('1');
        $scope.CallStatus = "SWAPED";
        $scope.clickBtnStateName = "Client";

    };

    $rootScope.$on("register_phone", function (event, args) {

        Initiate(args, onRegistrationCompleted, onCallDisconnected, onCallConnected, onUnRegisterCompleted);
    });

    $rootScope.$on("check_register", function (event, args) {

        $rootScope.$emit("is_registered", $scope.isRegistered);
    });

    //main toggle panle option
    //toggle widget
    $scope.isToggleMenu = false;
    $scope.toggleWidget = function () {
        if ($scope.isToggleMenu) {
            $('#callWidget').animate({
                right: '-5%'
            });
            $scope.isToggleMenu = false;
        } else {
            $('#callWidget').animate({
                right: '-6px'
            });
            $scope.isToggleMenu = true;
        }
    }


});

