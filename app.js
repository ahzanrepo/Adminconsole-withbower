/**
 * Created by Damith on 5/27/2016.
 */


var mainApp = angular.module('veeryConsoleApp', ['ngAnimate', 'ui.bootstrap',
    'ui.router', 'ui.checkbox', 'chart.js', 'angular-flot', 'angularMoment',
    'resourceServiceModule', 'authServiceModule', 'jlareau.pnotify',
    'easypiechart', 'mgcrea.ngStrap', 'angular.filter', "fileServiceModule", "angularFileUpload", "download", "ngMessages", "ngAudio","bw.paging"]);

// "fileServiceModule","angularFileUpload","download"
var baseUrls = {
    'resourceServiceBaseUrl': 'http://localhost:8831/DVP/API/6.0/ResourceManager/',
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
        });
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