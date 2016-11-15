/**
 * Created by Pawan on 6/6/2016.
 */
'use strict';
mainApp.controller('newrulecontroller', function ($scope, ruleconfigservice, notificationService,$state,$stateParams) {


    $scope.newObj={};
    $scope.newObj.RegExPattern="STARTWITH";
    $scope.newObj.ANIRegExPattern="STARTWITH";
    $scope.newObj.Direction="INBOUND";
    $scope.editMode=false;
    $scope.advancedViewSt=false;
    $scope.isInbound=false;
    $scope.DNISRequired = true;
    $scope.ANIRequired = true;


    $scope.showAlert = function (title,content,type) {

        new PNotify({
            title: title,
            text: content,
            type: type,
            styling: 'bootstrap3'
        });
    };





    if($stateParams.id)
    {
        $scope.ruleID=$stateParams.id;
        $scope.editMode=true;
    }





    var onAppLoadCompleted = function (response) {
        if(!response.data.IsSuccess){
            onError(response.data.Exception);
        }
        else
        {
            console.log(response.data.Result);
            console.log($scope.newObj);
            $scope.AppObj=response.data.Result;
            console.log("App success");
            console.log("AppID from newOBJ "+$scope.newObj.AppId);
            //$scope.App.id = {id: '3'};
        }
    };

    var onTransLoadCompleted = function (response) {
        if(!response.data.IsSuccess){
            onError(response.data.Exception);
        }
        else
        {
            $scope.TransObj=response.data.Result;
            $scope.newObj.ANITranslationId={id:$scope.newObj.ANITranslationId};
            $scope.newObj.TranslationId={id:$scope.newObj.TranslationId};
        }
    };

    var onRuleLoad = function (response) {
        if(!response.data.IsSuccess){
            onError(response.data.Exception);
        }
        else
        {
            $scope.newObj=response.data.Result;
            console.log(response.data.Result);
            loadContexts();
            loadTranslations();
            $scope.setEnableStatus();

            if($scope.newObj.Direction=="INBOUND")
            {
                loadApplications();
                $scope.isInbound=true;
                console.log($scope.newObj.AppId);
                //$scope.newObj.AppId=$scope.newObj.AppId;
                $scope.newObj.AppId={id:$scope.newObj.AppId};
            }
            else
            {
                $scope.isInbound=false;
                $scope.newObj.AppId=null;
                loadTrunks();
            }



        }

    };

    var onSaveCompleted = function (response) {
        $scope.showAlert("Success","Successfully saved","success");
        $scope.backToList();
    };

    var onTrunkLoadCompleted = function (response) {
        if(!response.data.IsSuccess)
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
        $scope.showAlert("Error","There is an error","error");
        console.log(reason);
    };

    var onContextLoad = function (response) {
        if(!response.data.IsSuccess)
        {
            onError(response.data.Exception.Message);
        }
        else
        {

            $scope.isDisabled=false;
            $scope.contextData=response.data.Result;
            if(!$scope.editMode)
            {
                loadTrunks();
            }


        }
    };

    var onAttachCompleted = function (response) {
        if(!response.data.IsSuccess)
        {
            onError(response.data.Exception.Message);
        }
        else
        {
            $scope.showAlert("Success","Application added to Rule","success");
            console.log("Done attached");
            $scope.backToList();

        }
    };

    var loadTrunks = function () {
        ruleconfigservice.loadTrunks().then(onTrunkLoadCompleted,onError);
    };

    var loadApplications = function () {
        ruleconfigservice.loadApps().then(onAppLoadCompleted,onError);
    };
    var loadTranslations = function () {
        ruleconfigservice.loadTranslations().then(onTransLoadCompleted,onError);
    };


    $scope.saveNewRule = function () {
        //$scope.newObj.Direction=Direction;
        var isValid = true;
        try {
            new RegExp($scope.newObj.CustomRegEx);
        } catch(e) {
            isValid = false;
        }



        if($scope.editMode)
        {
            if(isValid)
            {
                //ruleconfigservice.updateRules($scope.newObj).then(onSaveCompleted, onError);
                ruleconfigservice.updateRules($scope.newObj).then(function (response) {

                    if(response.data.IsSuccess)
                    {
                        if($scope.newObj.id )
                        {
                            if( $scope.newObj.AppId.id)
                            {
                                $scope.AttachAppToRule();
                                $scope.showAlert("Success","Inbound rule successfully saved","success");
                            }
                            else
                            {
                                $scope.showAlert("Success","Outbound rule successfully saved","success");
                            }


                        }
                    }
                    else
                    {
                        $scope.showAlert("Error","Rule updating failed ","error");
                        $scope.backToList();
                    }
                });
            }else
            {
                $scope.showAlert("Error","Invalid fields ","error");
            }
        }

        else
        {

            if(isValid)
            {
                ruleconfigservice.addNewRule($scope.newObj).then(onSaveCompleted,onError);
            }
            else
            {
                $scope.showAlert("Error","Invalid Custom regEx pattern","error");
            }

        }



    };

    $scope.makeContextEmpty = function () {
        $scope.newObj.Context=null;
        console.log("After Remove context "+$scope.newObj.Context);
    };
    $scope.makeTrunkEmpty = function () {
        $scope.newObj.TrunkNumber=null;
        console.log("After Remove TrunkNumber "+$scope.newObj.TrunkNumber);
    };

    function  loadContexts()
    {
        ruleconfigservice.getContextList().then(onContextLoad,onError);
    };

    $scope.backToList =function()
    {
        $state.go('console.rule');
    };

    //loadContexts();
    function initiateProcess  () {
        if($scope.ruleID)
        {
            ruleconfigservice.getRule($scope.ruleID).then(onRuleLoad,onError);

        }
        else
        {
            loadContexts();
        }
    };


    $scope.showAdvanced = function()
    {
        if($scope.advancedViewSt)
        {
            $scope.advancedViewSt=false;
        }
        else
        {
            $scope.advancedViewSt=true;
        }
    };

    $scope.AttachDNISTransToRule = function () {

        if($scope.editMode)
        {
            console.log("Id "+$scope.newObj.id);
            console.log("TId "+$scope.newObj.TranslationId.id);
            ruleconfigservice.attchDNISTransToRule($scope.newObj.id,$scope.newObj.TranslationId.id).then(onAttachCompleted,onError);
        }

    };
    $scope.AttachANITransToRule = function () {

        if($scope.editMode)
        {
            console.log("Id "+$scope.newObj.id);
            console.log("TId "+$scope.newObj.ANITranslationId.id);
            ruleconfigservice.attchANITransToRule($scope.newObj.id,$scope.newObj.ANITranslationId.id).then(onAttachCompleted,onError);
        }

    };

    $scope.AttachAppToRule = function () {

        if($scope.editMode)
        {
            console.log("Id "+$scope.newObj.id);
            console.log("APPId "+$scope.newObj.AppId.id);
            ruleconfigservice.attchAppWithRule($scope.newObj.id,$scope.newObj.AppId.id).then(onAttachCompleted,onError);
        }

    };



    $scope.setEnableStatus = function () {

        if($scope.newObj.ANIRegExPattern=="ANY")
        {
            $scope.ANIRequired=false;
            $scope.newObj.ANI=null;
        }
        else
        {
            $scope.ANIRequired=true;
        }
        if($scope.newObj.RegExPattern=="ANY")
        {
            $scope.DNISRequired=false;
            $scope.newObj.DNIS=null;
        }
        else
        {
            $scope.DNISRequired=true;
        }


    }


    initiateProcess();


});