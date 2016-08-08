/**
 * Created by Damith on 5/27/2016.
 */


var mainApp = angular.module('veeryConsoleApp', ['ngAnimate','ngMessages', 'ui.bootstrap',
    'ui.router', 'ui.checkbox', 'chart.js', 'angular-flot', 'angularMoment',
    'resourceProductivityServiceModule', 'ngTagsInput', 'authServiceModule', 'jlareau.pnotify',
    'easypiechart', 'mgcrea.ngStrap', 'angular.filter', 'fileServiceModule', 'angularFileUpload', 'download',
    'ngMessages', 'ngAudio', 'bw.paging', 'ngDragDrop', 'ui.knob', 'ui-rangeSlider',
    'AngularBootstrapTree',
    'jkuri.slimscroll',
    'base64',
    'dndLists',
    'angular-jwt',
    'angular-sly',
    'LocalStorageModule',
    'ngSanitize',
    'ngCsv',
    'com.2fdevs.videogular',
    'com.2fdevs.videogular.plugins.controls',
    'com.2fdevs.videogular.plugins.overlayplay',
    'com.2fdevs.videogular.plugins.poster','ui.bootstrap.datetimepicker'
]);


mainApp.constant('moment', moment);
mainApp.run(['$anchorScroll', function($anchorScroll) {
    $anchorScroll.yOffset = 50;   // always scroll by 50 extra pixels
}]);

var baseUrls = {
    'monitorrestapi': 'http://monitorrestapi.app.veery.cloud/DVP/API/1.0.0.0/MonitorRestAPI/',
    'UserServiceBaseUrl': 'http://userservice.app.veery.cloud/DVP/API/1.0.0.0/',
    'resourceServiceBaseUrl': 'http://resourceservice.app.veery.cloud/DVP/API/1.0.0.0/ResourceManager/',
    'ardsmonitoringBaseUrl': 'http://ardsmonitoring.app.veery.cloud/DVP/API/1.0.0.0/ARDS/',
    'fileServiceUrl': 'http://fileservice.app.veery.cloud/DVP/API/1.0.0.0/FileService/',
    'fileServiceInternalUrl': 'http://internalfileservice.app.veery.cloud/DVP/API/1.0.0.0/FileService/',
    'clusterconfigUrl':'http://clusterconfig.app.veery.cloud/DVP/API/1.0.0.0/CloudConfiguration/',
    'conferenceUrl':'http://conference.app.veery.cloud/DVP/API/1.0.0.0/',
    'sipUserendpoint': 'http://sipuserendpointservice.app.veery.cloud/DVP/API/1.0.0.0/SipUser/',
    'pbxUrl': 'http://pbxservice.app.veery.cloud/DVP/API/1.0.0.0/PBXService/PBXUser'
};

mainApp.constant('baseUrls', baseUrls);

mainApp.config(["$httpProvider", "$stateProvider", "$urlRouterProvider",
    function ($httpProvider, $stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/login');
        $stateProvider.state("console", {
            url: "/console",
            templateUrl: "views/main-home.html",
            data: {
                requireLogin: true
            }
        }).state('console.dashboard', {
            url: "/dashboard",
            templateUrl: "views/dashboard/dashboard-1.html",
            data: {
                requireLogin: true,
                navigation: "DASHBOARD"

            }
        }).state('console.productivity', {
            url: "/productivity",
            templateUrl: "agent_productivity/view/agentProductivity.html",
            data: {
                requireLogin: true,
                navigation: "AGENT_PRODUCTIVITY"
            }
        }).state('console.filegallery', {
            url: "/filegallery",
            templateUrl: "file_gallery/view/fileList.html",
            controller: "FileListController",
            data: {
                requireLogin: true,
                navigation: "FILE_GALLERY"
            }
        }).state('console.fileupload', {
            url: "/fileupload",
            templateUrl: "file_gallery/view/fileAdd.html",
            controller: "FileEditController",
            data: {
                requireLogin: true,
                navigation: "FILE_UPLOAD"
            }
        }).state('console.attributes', {
            url: "/attributes",
            templateUrl: "attribute_application/partials/attributeList.html",
            controller: "attributeListController",
            data: {
                requireLogin: true,
                navigation: "ATTRIBUTES"
            }
        }).state('console.resources', {
            url: "/resources",
            templateUrl: "resource_application/partials/resourceList.html",
            controller: "resourceController",
            data: {
                requireLogin: true,
                navigation: "RESOURCES"
            }
        }).state('console.AgentStatus', {
            url: "/AgentStatus",
            templateUrl: "agent_status/view/agentStatusList.html",
            controller: "agentStatusController",
            data: {
                requireLogin: true,
                navigation: "RESOURCES"
            }
        }).state("console.applicationAccessManager", {
            url: "/applicationAccessManager/:username/:role",
            templateUrl: "application_access_management/view/appAccessManage.html",
            data: {
                requireLogin: true,
                navigation: "APPLICATIONS"
            }
        }).state('login', {
            url: "/login",
            templateUrl: "auth/login.html",
            data: {
                requireLogin: false,

            }
        }).state('signUp', {
            url: "/signUp",
            templateUrl: "auth/signUp.html",
            data: {
                requireLogin: false
            }
        }).state('pricing', {
            url: "/pricing",
            templateUrl: "auth/pricing.html",
            data: {
                requireLogin: false
            }
        }).state("console.cdr", {
            url: "/cdr",
            templateUrl: "views/cdr/call-cdr.html",
            data: {
                requireLogin: true,
                navigation: "CDR"

            }
        }).state("console.myNumbers", {
            url: "/myNumbers",
            templateUrl: "views/mynumbers/myNumbers.html",
            controller: "myNumbersCtrl",
            data: {
                requireLogin: true,
                navigation: "CDR"
            }
        }).state("console.sipuser", {
            url: "/sipuser",
            templateUrl: "views/sipuser/sipuser.html",
            controller: "sipUserCtrl",

            data: {
                requireLogin: true,
                navigation: "SIPUSER_CONFIGURATION"
            }

        }).state("console.userprofile", {
            url: "/userprofile/:username",
            templateUrl: "views/userprofile/userprofile.html",
            data: {
                requireLogin: true,
                navigation: "PROFILE"

            }
        }).state("console.users", {
            url: "/users",
            templateUrl: "views/user/userList.html",
            controller: "userListCtrl",
            data: {
                requireLogin: true,
                navigation: "USERS"
            }
        }).state("console.pbxuser", {
            url: "/pbxuser",
            templateUrl: "views/pbxuser/pbxuser.html",
            controller: "pbxCtrl",
            data: {
                requireLogin: true,
                navigation: "PABX_USER"
            }
        }).state("console.pbxadmin", {
            url: "/pbxadmin",
            templateUrl: "views/pabxAdmin/pabxCompanyConfig.html",
            controller: "pbxAdminCtrl",
            data: {
                requireLogin: true,
                navigation: "PABX_ADMIN"
            }
        }).state("console.ringGroup", {
            url: "/ringGroup",
            templateUrl: "views/ringGroup/ringGroup.html",
            controller: "ringGroupCtrl",
            data: {
                requireLogin: true,
                navigation: "RING_GROUP_CONFIGURATION"
            }
        }).state('console.callmonitor', {
            url: "/call-monitor",
            templateUrl: "views/call-monitor/callMonitor2.html",
            controller: "callmonitorcntrl2",
            data: {
                requireLogin: true,
                navigation: "CALL_MONITOR"
            }
        }).state('console.abandonCdr', {
            url: "/abandonCallReport",
            templateUrl: "views/cdr/abandonCallReport.html",
            controller: "abandonCallCdrCtrl",
            data: {
                requireLogin: true,
                navigation: "CDR"
            }
        }).state('console.realtime-queued', {
            url: "/realtime-queued",
            templateUrl: "views/real-time/queued.html",
            data: {
                requireLogin: true,
                navigation: "DASHBOARD"
            }
        }).state('console.phone', {
            url: "/call-phone",
            templateUrl: "views/call-monitor/phoneWidget.html",
            data: {
                requireLogin: true,
                navigation: "CALL_MONITOR"
            }
        }).state('console.rule', {
            url: "/rule/rules",
            templateUrl: "views/rule/ruleList.html",
            controller: "rulelistcontroller",
            data: {
                requireLogin: true,
                navigation: "RULES"
            }
        }).state('console.newrule', {
            url: "/rule/new-rule",
            templateUrl: "views/rule/newRule.html",
            controller: "newrulecontroller",
            data: {
                requireLogin: true,
                navigation: "RULES"
            }
        }).state('console.editrule', {
            url: "/rule/edit-rule?id",
            params: {id: null},
            templateUrl: "views/rule/newRule.html",
            controller: "newrulecontroller",
            data: {
                requireLogin: true,
                navigation: "RULES"
            }
        }).state('console.application', {
            url: "/applications",
            templateUrl: "views/app-registry/applications.html",
            controller: "applicationController",
            data: {
                requireLogin: true,
                navigation: "APPLICATIONS"
            }
        }).state('console.holdmusic', {
            url: "/holdmusic",
            templateUrl: "views/hold-music/holdmusic.html",
            controller: "holdMusicController",
            data: {
                requireLogin: true,
                navigation: "HOLD_MUSIC"
            }
        }).state('console.limits', {
            url: "/limits",
            templateUrl: "views/limit/Limits.html",
            controller: "limitController",
            data: {
                requireLogin: true,
                navigation: "LimitHandler"
            }
        }).state('console.conference', {
            url: "/conference",
            templateUrl: "conference_app/views/conferenceList.html",
            controller: "conferenceController",
            data: {
                requireLogin: true,
                navigation: "CONFERENCE"
            }
        })/*.state('console.conferencemonitor', {
            url: "/conference",
            templateUrl: "conference_app/views/conferenceMonitor.html",
            controller: "conferenceMonitorController",
            data: {
                requireLogin: true,
                navigation: "CONFERENCE"
            }
        })*/.state('console.queuesummary', {
            url: "/queuesummary",
            templateUrl: "views/queue-summary/queue-summary.html",
            controller: "queueSummaryController",
            data: {
                requireLogin: true,
                navigation: "CDR"
            }
        }).state('console.agentsummary', {
            url: "/agentsummary",
            templateUrl: "views/agent-productivity-summary/agentSummary.html",
            controller: "agentSummaryController",
            data: {
                requireLogin: true,
                navigation: "CDR"
            }
        }).state('console.AgentTblList', {
            url: "/AgentTblList",
            templateUrl: "agent_status/view/agentStatusTblList.html",
            controller: "agentStatusController",
            data: {
                requireLogin: true,
                navigation: "CDR"
            }
        }).state('console.extension', {
            url: "/extensions",
            templateUrl: "views/extension/extension.html",
            controller: "extensionController",
            data: {
                requireLogin: true,
                navigation: "EXTENSION"
            }
        }).
        state('console.ardsconfig', {
            url: "/ardsconfig",
            templateUrl: "views/ards-config/ardsconfig.html",
            controller: "ardsController",

                data: {
                    requireLogin: true,
                    navigation: "ARDS_CONFIGURATION"
                }

        }).

            state('console.myprofile', {
                url: "/myprofile",
                templateUrl: "views/myUserprofile/myUserprofile.html",

                data: {
                    requireLogin: true,
                    navigation: "MYPROFILE"
                }

            })
            .state('console.did', {
                url: "/didnumbers",
                templateUrl: "views/did/did.html",
                controller: "didController",
                data: {
                    requireLogin: true,
                    navigation: "DID"
                }
            })
            .state('console.scheduler', {
                url: "/schedules",
                templateUrl: "views/scheduler/schedule.html",
                controller: "scheduleController",
                data: {
                    requireLogin: true,
                    navigation: "SCHEDULER"
                }
            }).state('console.companyconfig', {
                url: "/companyconfiguration",
                templateUrl: "views/companyConfig/companyConfigMain.html",
                controller: "companyConfigController",
                data: {
                    requireLogin: true,
                    navigation: "COMPANYCONFIG"
                }
            }).state('console.translations', {
                url: "/translation",
                templateUrl: "views/translation/translations.html",
                controller: "translationController",
                data: {
                    requireLogin: true,
                    navigation: "TRANSLATIONS"
                }
            })


    }]);


//main console directive
//menu Collapse

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

mainApp.directive('menuCollapse', function () {
    return {
        link: function (scope, element, att) {
            var $element = element.find('a');
            $element.on('click', function (ev) {
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
        }
    }
}).directive('navToggle', function () {
    return {
        link: function (scope, element, att) {
            element.on('click', function () {
                var $BODY = $('body');
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
            });
            setContentHeight();
        }
    }
});

mainApp.directive('datepicker', function () {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, elem, attrs, ngModelCtrl) {
            var updateModel = function (dateText) {
                scope.$apply(function () {
                    ngModelCtrl.$setViewValue(dateText);
                });
            };
            var options = {
                dateFormat: "yy-mm-dd",
                onSelect: function (dateText) {
                    updateModel(dateText);
                }
            };
            elem.datepicker(options);
        }
    }
});


mainApp.constant('config', {
    Auth_API: 'http://userservice.162.243.230.46.xip.io/',
    appVersion: 1.0,
    client_Id_secret: 'ae849240-2c6d-11e6-b274-a9eec7dab26b:6145813102144258048'
});


mainApp.run(function ($rootScope, loginService, $location) {

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        var requireLogin = toState.data.requireLogin;

        var navigation = toState.data.navigation;


        if (navigation)
            if (!loginService.checkNavigation(navigation)) {
                event.preventDefault();
                return;

            }


        if (requireLogin) {
            if (!loginService.getToken()) {
                event.preventDefault();
                $location.path("/login");
            }
            // get me a login modal!
        }

    });

});

