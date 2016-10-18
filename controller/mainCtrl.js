/**
 * Created by Damith on 5/28/2016.
 */

'use strict';
mainApp.controller('mainCtrl', function ($scope, $rootScope, $state,$timeout, jwtHelper, loginService, authService,notifiSenderService,veeryNotification,$q) {


    //added by pawan

    $scope.CallStatus = null;
    $scope.loginData = {};
    $scope.callListStatus = false;
    $scope.isRegistered = false;
    $scope.inCall = false;

    $scope.newNotifications=[];


// Register for notifications

    $scope.showAlert = function (tittle, type, msg) {
        new PNotify({
            title: tittle,
            text: msg,
            type: type,
            styling: 'bootstrap3',
            icon: false
        });
    };

    $scope.OnMessage = function (data) {
        var objMessage = {
            "id": data.TopicKey,
            "header": data.Message,
            "type": "menu",
            "icon": "main-icon-2-speech-bubble",
            "time": new Date(),
            "read": false
        };
        /*if (data.TopicKey) {
         var audio = new Audio('assets/sounds/notification-1.mp3');
         audio.play();
         $scope.notifications.unshift(objMessage);
         $('#notificationAlarm').addClass('animated swing');
         $scope.unredNotifications = $scope.getCountOfUnredNotifications()
         setTimeout(function () {
         $('#notificationAlarm').removeClass('animated swing');
         }, 500);
         }*/

        if(data.From)
        {
            $scope.newNotifications.push(data);
        }


        //$scope.showAlert("Success","success","Got");
        //console.log(data);


    };

    var notificationEvent = {
        OnMessageReceived: $scope.OnMessage
    };

    $scope.veeryNotification = function () {
        veeryNotification.connectToServer(authService.TokenWithoutBearer(), baseUrls.notification, notificationEvent);
    };

    $scope.veeryNotification();



    // Notification sender
    $scope.agentList = [];


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
        goFacebookApp: function () {
            $state.go('console.facebook');
        },
        goTwitterApp: function () {
            $state.go('console.twitter');
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

        goAutoAttendance: function () {
            $state.go('console.autoattendance');
        },

        goEditAutoAttendance: function () {
            $state.go('console.editautoattendance');
        },

        goNewAutoAttendance: function () {
            $state.go('console.newautoattendance');
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
        goDynamicForm: function () {
            $state.go('console.FormDesign');
        },
        goAgentStatus: function () {
            $state.go('console.AgentStatus');
        },
        goAgentProfileSummary: function () {
            $state.go('console.AgentProfileSummary');
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
        goTicketTrigger: function () {
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
        },
        goTicketSla: function () {
            $state.go('console.sla');
        },
        goAgentStatusEvt: function () {
            $state.go('console.agentstatusevents');
        },
        goTickerAgentDashboard: function () {
            $state.go('console.agentTicketDashboard');
        },
        goTicketSummary: function () {
            $state.go('console.ticketSummary');
        },
        goTicketDetailReport: function () {
            $state.go('console.ticketDetailReport');
        },
        goTimeSheet: function () {
            $state.go('console.timeSheet');
        }, goFilter: function () {
            $state.go('console.createFilter');
        },
        goToFullScreen: function () {

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
    /*$scope.showAlert = function (tittle, type, msg) {
     new PNotify({
     title: tittle,
     text: msg,
     type: type,
     styling: 'bootstrap3',
     icon: false
     });
     };*/

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
    };


    //toggle menu option
    //text function
    var CURRENT_URL = window.location.href.split("?")[0], $BODY = $("body"), $MENU_TOGGLE = $("#menu_toggle"), $SIDEBAR_MENU = $("#sidebar-menu"),
        $SIDEBAR_FOOTER = $(".sidebar-footer"), $LEFT_COL = $(".left_col"), $RIGHT_COL = $(".right_col"), $NAV_MENU = $(".nav_menu"), $FOOTER = $("footer");

    // TODO: This is some kind of easy fix, maybe we can improve this
    var setContentHeight = function () {
        // reset height
        $RIGHT_COL.css('min-height', $(window).height());

        var bodyHeight = $BODY.outerHeight(),
            footerHeight = $BODY.hasClass('footer_fixed') ? 0 : $FOOTER.height(),
            leftColHeight = $LEFT_COL.eq(1).height() + $SIDEBAR_FOOTER.height(),
            contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

        // normalize content
        contentHeight -= $NAV_MENU.height() + footerHeight;

        $RIGHT_COL.css('min-height', contentHeight);
    };


    $SIDEBAR_MENU.find('a').on('click', function (ev) {
        var $li = $(this).parent();

        if ($li.is('.active')) {
            $li.removeClass('active');
            $('ul:first', $li).slideUp(function () {
                setContentHeight();
            });
        } else {
            // prevent closing menu if we are on child menu
            if (!$li.parent().is('.child_menu')) {
                $SIDEBAR_MENU.find('li').removeClass('active');
                $SIDEBAR_MENU.find('li ul').slideUp();
            }

            $li.addClass('active');

            $('ul:first', $li).slideDown(function () {
                setContentHeight();
            });
        }
    });
    // toggle small or large menu
    $MENU_TOGGLE.on('click', function () {
        if ($BODY.hasClass('nav-md')) {
            $BODY.removeClass('nav-md').addClass('nav-sm');

            if ($SIDEBAR_MENU.find('li').hasClass('active')) {
                $SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
            }
        } else {
            $BODY.removeClass('nav-sm').addClass('nav-md');

            if ($SIDEBAR_MENU.find('li').hasClass('active-sm')) {
                $SIDEBAR_MENU.find('li.active-sm').addClass('active').removeClass('active-sm');
            }
        }
        // setContentHeight();
    });

    //get screen height



    var getAllRealTimeTimer = {};



    $scope.users = [];
    $scope.notificationMsg = {};
    $scope.naviSelectedUser={};
    $scope.userGroups = [];
    $scope.loadUserGroups = function () {
        notifiSenderService.getUserGroupList().then(function (response) {
            if (response.data && response.data.IsSuccess) {
                $scope.userGroups = response.data.Result;
            }
        }, function (err) {
            $scope.showAlert("Load User Groups", "error", "Fail To Get User Groups.")
        });
    };
    $scope.loadUserGroups();

    $scope.loadUsers = function () {
        notifiSenderService.getUserList().then(function (response) {
            $scope.users = response;
        }, function (err) {
            $scope.showAlert("Load Users", "error", "Fail To Get User List.")
        });
    };
    $scope.loadUsers();

    var FilterByID = function (array, field, value) {
        if (array) {
            for (var i = array.length - 1; i >= 0; i--) {
                if (array[i].hasOwnProperty(field)) {
                    if (array[i][field] == value) {
                        return array[i];
                    }
                }
            }
            return null;
        } else {
            return null;
        }
    };

    var loadOnlineAgents = function () {
        notifiSenderService.getProfileDetails().then(function (response) {
            if (response) {
                var onlineAgentList = [];
                var offlineAgentList = [];
                $scope.agentList = [];
                var onlineAgents = response.Result;

                if ($scope.users) {
                    for (var i = 0; i < $scope.users.length; i++) {
                        var user = $scope.users[i];
                        user.listType = "User";

                        if (user.resourceid) {
                            var resource = FilterByID(onlineAgents, "ResourceId", user.resourceid);
                            if (resource) {
                                user.status = resource.Status.State;
                                if (user.status === "NotAvailable") {
                                    offlineAgentList.push(user);
                                } else {
                                    onlineAgentList.push(user);
                                }
                            } else {
                                user.status = "NotAvailable";
                                offlineAgentList.push(user);
                            }
                        } else {
                            user.status = "NotAvailable";
                            offlineAgentList.push(user);
                        }
                    }

                    onlineAgentList.sort(function (a, b) {
                        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                        return 0;
                    });
                    offlineAgentList.sort(function (a, b) {
                        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                        return 0;
                    });

                    $scope.agentList = onlineAgentList.concat(offlineAgentList);
                }

                if ($scope.userGroups) {
                    var userGroupList = [];

                    for (var j = 0; j < $scope.userGroups.length; j++) {
                        var userGroup = $scope.userGroups[j];

                        userGroup.status = "Available";
                        userGroup.listType = "Group";
                        userGroupList.push(userGroup);
                    }

                    userGroupList.sort(function (a, b) {
                        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                        return 0;
                    });

                    $scope.agentList = userGroupList.concat($scope.agentList)
                }
            }
            else {
                /*var errMsg = response.CustomMessage;

                 if (response.Exception) {
                 errMsg = response.Exception.Message;
                 }*/
                $scope.showAlert('Error', 'error', "Error");
            }
        }, function (err) {
            var errMsg = "Error occurred while loading online agents";
            if (err.statusText) {
                errMsg = err.statusText;
            }
            $scope.showAlert('Error', 'error', errMsg);
        });
    };



    var getAllRealTime = function () {
        loadOnlineAgents();
        getAllRealTimeTimer = $timeout(getAllRealTime, 1000);
    };

    $scope.showMessageBlock = function (selectedUser) {
        $scope.naviSelectedUser = selectedUser;
        divModel.model('#sendMessage', 'display-block');
    };
    $scope.closeMessage = function () {
        divModel.model('#sendMessage', 'display-none');
    };

    $scope.showRightSideNav=false;

    $scope.openNav = function () {

        if(!$scope.showRightSideNav)
        {
            getAllRealTimeTimer = $timeout(getAllRealTime, 1000);
            document.getElementById("mySidenav").style.width = "300px";
            $scope.showRightSideNav=true;
        }
        else
        {
            if (getAllRealTimeTimer) {
                $timeout.cancel(getAllRealTimeTimer);
            }
            document.getElementById("mySidenav").style.width = "0";
            $scope.showRightSideNav=false;
        }


        //document.getElementById("main").style.marginRight = "285px";
        // document.getElementById("navBar").style.marginRight = "300px";
    };
    /* Set the width of the side navigation to 0 */
    $scope.closeNav = function () {

        //document.getElementById("main").style.marginRight = "0";
        //  document.getElementById("navBar").style.marginRight = "0";
    };


    $scope.sendNotification = function () {

        $scope.loginName=$scope.userName;
        if ($scope.naviSelectedUser) {

            $scope.notificationMsg.From = $scope.loginName;
            $scope.notificationMsg.Direction = "STATELESS";
            if ($scope.naviSelectedUser.listType === "Group") {
                if ($scope.naviSelectedUser.users) {
                    var clients = [];
                    for (var i = 0; i < $scope.naviSelectedUser.users.length; i++) {
                        var gUser = $scope.naviSelectedUser.users[i];
                        if (gUser && gUser.username && gUser.username != $scope.loginName) {
                            clients.push(gUser.username);
                        }
                    }
                    $scope.notificationMsg.clients = clients;

                    notifiSenderService.broadcastNotification($scope.notificationMsg).then(function (response) {
                        $scope.notificationMsg = {};
                        console.log("send notification success :: " + JSON.stringify(clients));
                    }, function (err) {
                        var errMsg = "Send Notification Failed";
                        if (err.statusText) {
                            errMsg = err.statusText;
                        }
                        $scope.showAlert('Error', 'error', errMsg);
                    });
                } else {
                    $scope.showAlert('Error', 'error', "Send Notification Failed");
                }

            } else {

                $scope.notificationMsg.To = $scope.naviSelectedUser.username;

                notifiSenderService.sendNotification($scope.notificationMsg, "message", "").then(function (response) {
                    console.log("send notification success :: " + $scope.notificationMsg.To);
                    $scope.notificationMsg = {};
                }, function (err) {
                    var errMsg = "Send Notification Failed";
                    if (err.statusText) {
                        errMsg = err.statusText;
                    }
                    $scope.showAlert('Error', 'error', errMsg);
                });
            }

        } else {
            $scope.showAlert('Error', 'error', "Send Notification Failed");
        }
    };






    $scope.usersToNotify=[];

    $scope.checkUser = function ($event,agent) {

        if($event.target.checked)
        {
            if($scope.usersToNotify.indexOf(agent.username)==-1)
            {
                $scope.usersToNotify.push(agent.username);
            }

        }
        else
        {
            if($scope.usersToNotify.indexOf(agent.username)==-1)
            {
                $scope.usersToNotify.splice($scope.usersToNotify.indexOf(agent.username),1);
            }
        }
    }



});

