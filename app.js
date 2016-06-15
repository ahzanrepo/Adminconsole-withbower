/**
 * Created by Damith on 5/27/2016.
 */


var mainApp = angular.module('veeryConsoleApp', ['ngAnimate', 'ui.bootstrap',
    'ui.router', 'ui.checkbox', 'chart.js', 'angular-flot', 'angularMoment',
    'resourceProductivityServiceModule', 'ngTagsInput', 'authServiceModule', 'jlareau.pnotify',
    'easypiechart', 'mgcrea.ngStrap', 'angular.filter', 'fileServiceModule', 'angularFileUpload', 'download', 'ngMessages', 'ngAudio', 'bw.paging', 'ngDragDrop', 'ui.knob', 'ui-rangeSlider',
    'AngularBootstrapTree',
    'download', 'ngMessages', 'ngAudio', 'bw.paging',
    'ngDragDrop', 'ui.knob', 'ui-rangeSlider',
    'jkuri.slimscroll'
]);


mainApp.constant('moment', moment);

var baseUrls = {
    'monitorrestapi':'http://monitorrestapi.104.131.67.21.xip.io/DVP/API/1.0.0.0/MonitorRestAPI/',
    'UserServiceBaseUrl': 'http://localhost:3636/DVP/API/1.0.0.0/',
    'resourceServiceBaseUrl': 'http://resourceservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ResourceManager/',
    'ardsmonitoringBaseUrl': 'http://ardsmonitoring.104.131.67.21.xip.io/DVP/API/1.0.0.0/ARDS/',
    'fileServiceUrl': 'http://fileservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/FileService/',
    'fileServiceInternalUrl': 'http://fileservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/FileService/'
};

mainApp.constant('baseUrls', baseUrls);

mainApp.config(["$httpProvider", "$stateProvider", "$urlRouterProvider",
    function ($httpProvider, $stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/login');
        $stateProvider.state("console", {
            url: "/console",
            templateUrl: "views/main-home.html"
        }).state('console.dashboard', {
            url: "/dashboard",
            templateUrl: "views/dashboard/dashboard-1.html"
        }).state('console.productivity', {
            url: "/productivity",
            templateUrl: "agent_productivity/view/agentProductivity.html"
        }).state('console.filegallery', {
            url: "/filegallery",
            templateUrl: "file_gallery/view/fileList.html",
            controller: "FileListController"
        }).state('console.fileupload', {
            url: "/fileupload",
            templateUrl: "file_gallery/view/fileAdd.html",
            controller: "FileEditController"
        }).state('console.attributes', {
            url: "/attributes",
            templateUrl: "attribute_application/partials/attributeList.html",
            controller: "attributeListController"
        }).state('console.resources', {
            url: "/resources",
            templateUrl: "resource_application/partials/resourceList.html",
            controller: "resourceController"
        }).state('console.AgentStatus', {
            url: "/AgentStatus",
            templateUrl: "agent_status/view/agentStatusList.html",
            controller:"agentStatusController"
        }).state("console.applicationAccessManager", {
            url: "/applicationAccessManager/:username/:role",
            templateUrl: "application_access_management/view/appAccessManage.html"
        }).state('login', {
            url: "/login",
            templateUrl: "views/login.html"
        }).state("console.cdr", {
            url: "/cdr",
            templateUrl: "views/cdr/call-cdr.html"
        }).state("console.sipuser", {
            url: "/sipuser",
            templateUrl: "views/sipuser/sipuser.html",
            controller: "sipUserCtrl"
        }).state("console.userprofile", {
            url: "/userprofile/:username",
            templateUrl: "views/userprofile/userprofile.html",
            controller: "userProfileCtrl"
        }).state("console.users", {
            url: "/users",
            templateUrl: "views/user/userList.html",
            controller: "userListCtrl"
        }).state("console.pbxuser", {
            url: "/pbxuser",
            templateUrl: "views/pbxuser/pbxuser.html",
            controller: "pbxCtrl"
        }).state("console.ringGroup", {
            url: "/ringGroup",
            templateUrl: "views/ringGroup/ringGroup.html",
            controller: "ringGroupCtrl"
        }).state('console.callmonitor', {
            url: "/call-monitor",
            templateUrl: "views/call-monitor/callMonitor.html",
            controller: "callmonitorcntrl"
        }).state('console.realtime-queued', {
            url: "/realtime-queued",
            templateUrl: "views/real-time/queued.html"
        }).state('console.phone', {
            url: "/call-phone",
            templateUrl: "views/call-monitor/phoneWidget.html"
        }).state('console.rule', {
            url: "/rule/rules",
            templateUrl: "views/rule/ruleList.html",
            controller: "rulelistcontroller"
        }).state('console.newrule', {
            url: "/rule/new-rule",
            templateUrl: "views/rule/newRule.html",
            controller: "newrulecontroller"
        }).state('console.editrule', {
            url: "/rule/edit-rule?id",
            params: {id: null},
            templateUrl: "views/rule/newRule.html",
            controller: "newrulecontroller"
        }).state('console.application', {
            url: "/applications",
            templateUrl: "views/app-registry/applications.html",
            controller: "applicationController"
        }).state('console.holdmusic', {
            url: "/holdmusic",
            templateUrl: "views/hold-music/holdmusic.html",
            controller: "holdMusicController"
        })
        ;
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