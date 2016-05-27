/**
 * Created by Damith on 5/27/2016.
 */


var mainApp = angular.module('veeryConsoleApp', ['ngAnimate', 'ui.bootstrap', 'ui.router']);

mainApp.config(["$httpProvider", "$stateProvider", "$urlRouterProvider",
    function ($httpProvider, $stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/login');
        $stateProvider
            .state("console", {
                url: "/console",
                templateUrl: "views/main-home.html",
            }).state('console.dashboard', {
            url: "/dashboard",
            templateUrl: "views/test-app/test.html",
        }).state('login', {
            url: "/login",
            templateUrl: "views/login.html",
        });
    }]);