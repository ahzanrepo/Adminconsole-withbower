/**
 * Created by Pawan on 6/3/2016.
 */

'use strict';

mainApp.controller('rulelistcontroller', function ($scope,$state, ruleconfigservice,$location, notificationService) {

    // Update the dataset at 25FPS for a smoothly-animating chart
    $scope.ruleObj = {};
    var inBtnSt=true;
    var outBtnSt=true;
    $scope.isCallMonitorOption=0;


    var onRuleDeleted = function (response) {
        if (response.data.Exception) {
            onError(response.data.Exception.Message);
        }
        else {

            /*var val = 0;
             for (var i = 0, len = $scope.ruleObj.length; i < len; i++) {

             if($scope.ruleObj[i].id == response.data.id) {
             val = i;

             break;

             }
             }
             $scope.ruleObj.splice(val, 1);*/
            refershPage();



        }

    };

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
            console.log("Only IN selected "+$scope.ruleObj);
        }

    };
    var onOutRulePicked = function (response) {
        if (response.data.Exception) {
            onError(response.data.Exception.Message);
        }
        else {

            $scope.ruleObj =response.data.Result ;
            console.log("Only Out selected "+$scope.ruleObj);
        }

    };

    var onError = function (error) {

    };
    var getAllRules= function () {
        $scope.ruleObj=null;
        ruleconfigservice.allRulePicker().then(onAllRulePicked,onError);
    };

    var getInRules = function () {
        $scope.ruleObj=null;
        ruleconfigservice.inboundRulePicker().then(onInRulePicked,onError);
    };
    var getOutRules = function () {
        $scope.ruleObj=null;
        ruleconfigservice.outboundRulePicker().then(onOutRulePicked,onError);
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
                outBtnSt=false;
            }
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
            setButtonAppearance();
            getOutRules();
        }
        else
        {
            $scope.ruleObj=null;
        }

    };

    var setButtonAppearance = function ()
    {
        document.getElementById("btn_in").style.opacity = "0.5";
    };

    $scope.addNewRule = function () {
        $state.go('console.newrule');
    };

    $scope.deleteRule= function(rule){

        ruleconfigservice.deleteRules(rule).then(onRuleDeleted,onError);

    };

    $scope.editRule = function (rule) {
        //$location.path("/new-rule/"+rule.id);
        $state.go('console.editrule',{id:rule.id});
    };

    var refershPage= function () {
        $scope.ruleObj = null;
        inBtnSt=true;
        outBtnSt=true;
        $scope.isCallMonitorOption=0;
        getAllRules();
    }

    getAllRules();


});


