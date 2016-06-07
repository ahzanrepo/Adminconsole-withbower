/**
 * Created by Pawan on 6/6/2016.
 */
'use strict';
mainApp.controller('newrulecontroller', function ($scope, ruleConfSrv, notificationService,$state,$stateParams) {

    $scope.newObj={};
    if($stateParams.id)
    {
        $scope.ruleID=$stateParams.id;
    }


    var onRuleLoad = function (response) {
        if(response.data.Exception){
            onError(response.data.Exception);
        }
        else
        {
            $scope.newObj=response.data.Result;
        }

    };

    var onSaveCompleted = function (response) {
        $scope.backToList();
    };
    var onTrunkLoadCompleted = function (response) {
        if(response.data.Exception)
        {
            onError(response.data.Exception.Message);
        }
        else
        {

            $scope.isDisabled=false;
            $scope.trunkObj= response.data.Result;
        }
    };

    var onError = function (reason) {
        console.log(reason);
    };

    var onContextLoad = function (response) {
        if(response.data.Exception)
        {
            onError(response.data.Exception.Message);
        }
        else
        {

            $scope.isDisabled=false;
            $scope.contextData=response.data.Result;
            loadTrunks();
        }
    };

    var loadTrunks = function () {
        ruleConfSrv.loadTrunks().then(onTrunkLoadCompleted,onError);
    };


    $scope.saveNewRule = function () {
        ruleConfSrv.addNewRule($scope.newObj).then(onSaveCompleted,onError);


    };

    function  loadContexts()
    {
        ruleConfSrv.getContextList().then(onContextLoad,onError);
    };

    $scope.backToList =function()
    {
        $state.go('console.rule');
    };

    //loadContexts();
    function initiateProcess  () {
        if($scope.ruleID)
        {
            ruleConfSrv.getRule($scope.ruleID).then(onRuleLoad,onError);
            loadContexts();
            loadTrunks();
        }
        else
        {
            loadContexts();
        }
    };


    initiateProcess();


});