/**
 * Created by Pawan on 6/3/2016.
 */

'use strict';

mainApp.controller('rulelistcontroller', function ($scope, ruleConfSrv, notificationService) {

    // Update the dataset at 25FPS for a smoothly-animating chart
    $scope.ruleObj = {};
    var inBtnSt=true;
    var outBtnSt=false;
    var onAllRulePicked = function (response) {
        if (response.data.Exception) {
            onError(response.data.Exception.Message);
        }
        else {



            $scope.ruleObj =response.data.Result ;
            console.log($scope.ruleObj);
        }

    };
    var onInRulePicked = function (response) {
        if (response.data.Exception) {
            onError(response.data.Exception.Message);
        }
        else {



            $scope.ruleObj =response.data.Result ;
            console.log($scope.ruleObj);
        }

    };
    var onOutRulePicked = function (response) {
        if (response.data.Exception) {
            onError(response.data.Exception.Message);
        }
        else {



            $scope.ruleObj =response.data.Result ;
            console.log($scope.ruleObj);
        }

    };

    var onError = function (error) {

    };
    var getAllRules= function () {
        $scope.ruleObj=null;
        ruleConfSrv.allRulePicker().then(onAllRulePicked,onError);
    };

    var getInRules = function () {
        $scope.ruleObj=null;
        ruleConfSrv.inboundRulePicker.then(onInRulePicked,onError);
    };
    var getOutRules = function () {
        $scope.ruleObj=null;
        ruleConfSrv.outboundRulePicker.then(onOutRulePicked,onError);
    };

    $scope.onBtnPressed = function (btnName) {

        if(btnName=="IN")
        {
            if(inBtnSt==true)
            {
                inBtnSt=false;
            }
            else
            {
                inBtnSt=true;
            }
        }
        else
        {
            if(outBtnSt==true)
            {
                outBtnSt            }
            else
            {
                outBtnSt=true;
            }
        }


        fillTable();
    };


    var fillTable = function () {

        if(inBtnSt&& outBtnSt)
        {

            getAllRules();
        }
        else if(inBtnSt && !outBtnSt)
        {
            getInRules();
        }
        else if(!inBtnSt && outBtnSt)
        {
            getOutRules();
        }
        else
        {
            $scope.ruleObj=null;
        }

    };
    getAllRules();

});


