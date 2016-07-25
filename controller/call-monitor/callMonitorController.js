/**
 * Created by Pawan on 5/29/2016.
 */

'use strict';

mainApp.controller('callmonitorcntrl', function ($scope,$uibModal, callMonitorSrv, notificationService,jwtHelper,authService) {

    // Update the dataset at 25FPS for a smoothly-animating chart
    $scope.CallObj = {};
    $scope.CallStatus = null;
    $scope.phoneSatus = false;
    $scope.currentSessionID = null;
    $scope.loginData={};
    $scope.callListStatus=false;

    $scope.showAlert = function (title,content,type) {

        new PNotify({
            title: title,
            text: content,
            type: type,
            styling: 'bootstrap3'
        });
    };

    $scope.pickPassword = function (response) {
        $scope.password=response;
        console.log("Hit");
        console.log("password ",response);

        if($scope.password!=null)
        {
            console.log("Password picked "+$scope.password);
            $scope.loginData.password=$scope.password;
            Initiate($scope.loginData,onRegistrationCompleted, onCallDisconnected, onCallConnected,onUnRegisterCompleted);
        }
    };

    var authToken = authService.GetToken();


    $scope.showModal= function (User) {
        //modal show
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'views/call-monitor/partials/loginModal.html',
            controller: 'loginModalController',
            size: 'sm',
            resolve: {
                user: function () {
                    return User;
                },
                pickPassword : function () {
                    return $scope.pickPassword;
                }
            }
        });
    };



    var getRegistrationData = function (authToken) {

        var decodeData = jwtHelper.decodeToken(authToken);
        console.log("Token Obj "+decodeData);

        if(decodeData.context.veeryaccount)
        {
            var values = decodeData.context.veeryaccount.contact.split("@");
            $scope.sipUri="sip:" + decodeData.context.veeryaccount.contact;
            $scope.WSUri="wss://" + values[1] + ":7443";
            $scope.realm=values[1];
            $scope.username=values[0];
            $scope.displayname=values[0];
            $scope.loginData ={
                realm:$scope.realm,
                impi:$scope.displayname,
                impu:$scope.sipUri,
                display_name:decodeData.iss,
                websocket_proxy_url:$scope.WSUri


            }

            $scope.showModal(decodeData.iss);
        }
        else
        {
            $scope.showAlert("Error","Unauthorized user details to login ","error");
        }




    };



    var onBargeComplete = function (response) {

        console.log(JSON.stringify(response));
        if (response.data.Exception) {
            console.log("Barge Error");
            onError(response.data.Exception.Message);
        }
        else {
            console.log("Barge success");
            $scope.CallStatus = "BARGED";
            //acceptCall();
        }
    };
    var onListenComplete = function (response) {

        console.log(JSON.stringify(response));
        if (response.data.Exception) {
            console.log("Barge Error");
            onError(response.data.Exception.Message);
        }
        else {
            /*console.log("Listen success");
             $scope.CallStatus = "LISTEN";
             $scope.phoneSatus = true;
             $scope.clickBtnStateName = "Listen"*/
            //acceptCall();
        }
    };
    var onThreeWayComplete = function (response) {

        console.log(JSON.stringify(response));
        if (response.data.Exception) {
            console.log("Barge Error");
            onError(response.data.Exception.Message);
        }
        else {
            console.log("Barge success");
            //acceptCall();
        }
    };
    var onCallsDataReceived = function (response) {

        if (response.data.Exception) {
            onError(response.data.Exception.Message);
        }
        else {
            /*notificationService.success({
             title: 'ok',
             text: "ok",
             hide: false
             });*/
            //var callObj=JSON.stringify('{"Exception":null,"CustomMessage":"Operation Successfull","IsSuccess":true,"Result":{"cc392087-76f0-4bac-aebb-caff14d2de6c":[{"Channel-State":"CS_EXCHANGE_MEDIA","FreeSWITCH-Switchname":"1","Channel-Name":"sofia/internal/dave@124.43.64.26:13776","Call-Direction":"outbound","Caller-Destination-Number":"dave","Caller-Unique-ID":"cc392087-76f0-4bac-aebb-caff14d2de6c","variable_sip_auth_realm":"null","variable_dvp_app_id":"3","Caller-Caller-ID-Number":"charlie","Other-Leg-Unique-ID":"dd64403b-35ef-400a-bf36-2d7ef7607dc7","Channel-Call-State":"ACTIVE"},{"Channel-State":"CS_EXECUTE","FreeSWITCH-Switchname":"1","Channel-Name":"sofia/internal/charlie@159.203.160.47","Call-Direction":"inbound","Caller-Destination-Number":"2004","Caller-Unique-ID":"dd64403b-35ef-400a-bf36-2d7ef7607dc7","variable_sip_auth_realm":"159.203.160.47","variable_dvp_app_id":"null","Caller-Caller-ID-Number":"charlie","Channel-Call-State":"ACTIVE","Application-Type":"EXTENDED","Other-Leg-Unique-ID":"cc392087-76f0-4bac-aebb-caff14d2de6c","Bridge-State":"Bridged"}],"d453d7a7-3c19-48e8-9047-e347287a1474":[{"Channel-State":"CS_EXECUTE","FreeSWITCH-Switchname":"1","Channel-Name":"sofia/internal/eve@159.203.160.47","Call-Direction":"inbound","Caller-Destination-Number":"2002","Caller-Unique-ID":"d453d7a7-3c19-48e8-9047-e347287a1474","variable_sip_auth_realm":"159.203.160.47","variable_dvp_app_id":"null","Caller-Caller-ID-Number":"eve","Channel-Call-State":"ACTIVE","Application-Type":"EXTENDED","Other-Leg-Unique-ID":"d3808e91-a5e0-456c-a4bd-39a0003d81e6","Bridge-State":"Bridged"},{"Channel-State":"CS_EXCHANGE_MEDIA","FreeSWITCH-Switchname":"1","Channel-Name":"sofia/internal/bob@124.43.64.26:14490","Call-Direction":"outbound","Caller-Destination-Number":"bob","Caller-Unique-ID":"d3808e91-a5e0-456c-a4bd-39a0003d81e6","variable_sip_auth_realm":"null","variable_dvp_app_id":"3","Caller-Caller-ID-Number":"eve","Other-Leg-Unique-ID":"d453d7a7-3c19-48e8-9047-e347287a1474","Channel-Call-State":"ACTIVE"}],"5fedd42a-7f44-4548-8b18-19613c1fe24b":[{"Channel-State":"CS_EXECUTE","FreeSWITCH-Switchname":"1","Channel-Name":"sofia/external/18705056540@45.55.184.114","Call-Direction":"inbound","Caller-Destination-Number":"94777400400","Caller-Unique-ID":"5fedd42a-7f44-4548-8b18-19613c1fe24b","variable_sip_auth_realm":"null","variable_dvp_app_id":"null","Caller-Caller-ID-Number":"18705056540","Channel-Call-State":"ACTIVE","Application-Type":"HTTAPI"}]}}');
            console.log(JSON.stringify(response.data));
            ValidCallsPicker(response.data);

        }

    };

    var onError = function (error) {
        console.log(error);
    };


    //#is check listen function OK
    var onRegistrationCompleted = function (response) {
        //console.log(response);
        console.log("Hit registered");
        $scope.showAlert("Registerd","Successfully registered","success");
        $scope.callListStatus=true;
        $scope.$apply(function () {
            $scope.phoneSatus = true;
        });
    };
    var onUnRegisterCompleted = function (response) {
        //console.log(response);
        $scope.showAlert("Unregistered","Registration terminated","notice");
        $scope.callListStatus=false;
        $scope.$apply(function () {
            $scope.phoneSatus = false;
        });
    };





    var onCallDisconnected = function () {
        //console.log(response);
        $scope.showAlert("Call disconnected","Call is disconnected","notice");
        $scope.clickBtnStateName = "Waiting";
        $scope.$apply(function () {
            $scope.isCallMonitorOption = 0;
        });

        $scope.CallStatus = null;
        $scope.currentSessionID = null;
        $scope.LoadCurrentCalls();

    };

    var onCallConnected = function () {
        $scope.$apply(function () {
            console.log("onCallConnected");
            $scope.CallStatus = "LISTEN";
            $scope.clickBtnStateName = "Listen"
            $scope.isCallMonitorOption = 1;
        });

    };

    $scope.LoadCurrentCalls = function () {
        callMonitorSrv.getCurrentCalls().then(onCallsDataReceived, onError);
    };


    var protocol = "user";


    $scope.Reregister = function () {
        getRegistrationData(authToken);
        $scope.LoadCurrentCalls();
    }

    $scope.BargeCall = function () {
        //alert("barged: "+bargeID);

        //callMonitorSrv.bargeCalls($scope.currentSessionID,protocol).then(onBargeComplete,onError);
        sendDTMF('2');
        $scope.CallStatus = "BARGED";
        $scope.clickBtnStateName = "Barged";
    };


    $scope.isCallMonitorOption = 0;
    $scope.clickBtnStateName = "waiting";
    $scope.ListenCall = function (callData) {
        //alert("barged: "+bargeID);
        $scope.currentSessionID = callData.BargeID;
        callMonitorSrv.listenCall(callData.BargeID, protocol,$scope.displayname).then(onListenComplete, onError);


    };
    $scope.ThreeWayCall = function () {
        //alert("barged: "+bargeID);
        //callMonitorSrv.threeWayCall(bargeID,protocol).then(onThreeWayComplete,onError);

        sendDTMF('3');
        $scope.CallStatus = 'THREEWAY';
        $scope.clickBtnStateName = "Conference ";
    };

    $scope.SwapUser = function () {
        //alert("barged: "+bargeID);
        //callMonitorSrv.threeWayCall(bargeID,protocol).then(onThreeWayComplete,onError);

        sendDTMF('1');
        $scope.CallStatus = "SWAPED";
        $scope.clickBtnStateName = "Client";

    };

    $scope.ReturnToListen = function () {
        //alert("barged: "+bargeID);
        //callMonitorSrv.threeWayCall(bargeID,protocol).then(onThreeWayComplete,onError);

        sendDTMF('0');
        $scope.CallStatus = 'LISTEN';
        $scope.clickBtnStateName = "Listen";
    };


    var ValidCallsPicker = function (callObj) {

        var curCallArr = [];
        $scope.CallObj = {};

        var callObjLen = Object.keys(callObj.Result).length;
        console.log("DB Call count " + callObjLen);

        for (var i = 0; i < callObjLen; i++) {
            var keyObj = callObj.Result[Object.keys(callObj.Result)[i]];

            if (keyObj.length > 1) {
                var callObject = CallObjectCreator(keyObj);
                if (callObject) {

                    curCallArr.push(callObject);
                    $scope.CallObj = curCallArr;
                    console.log("Call Object " + $scope.CallObj);
                }
                else {
                    $scope.CallObj = {}
                }

            }


            if (i == callObjLen - 1) {
                console.log(curCallArr);
            }
        }

    };

    var CallObjectCreator = function (objKey) {
        var bargeID = "";
        var FromID = "";
        var ToID = "";
        var Direction = "";
        var Receiver = "";
        var Bridged = false;
        var newKeyObj = {};

        for (var j = 0; j < objKey.length; j++) {

            if (objKey[j]["DVP-Call-Direction"]) {
                Direction = objKey[j]["DVP-Call-Direction"];
            }

            if (objKey[j]['Call-Direction'] == "inbound") {
                FromID = objKey[j]['Caller-Caller-ID-Number'];
                ToID = objKey[j]['Caller-Destination-Number'];


            }
            else if (objKey[j]['Call-Direction'] == "outbound") {
                Receiver = objKey[j]['Caller-Destination-Number'];
                bargeID = objKey[j]['Caller-Unique-ID'];
            }

            if (objKey[j]['Bridge-State'] == "Bridged") {
                Bridged = true;
            }

            if (j == objKey.length - 1) {
                if (Bridged) {
                    newKeyObj.FromID = FromID;
                    newKeyObj.ToID = ToID;
                    newKeyObj.BargeID = bargeID;
                    newKeyObj.Direction = Direction;
                    newKeyObj.Receiver = Receiver;

                    return newKeyObj;
                }
                else {
                    return false;
                }

            }

        }
    };

    $scope.answerMe = function () {
        acceptCall();
    };
    $scope.CallMe = function () {
        makeCall('eve');
    };
    $scope.RegMe = function () {
        register();
    };
    $scope.AnzMe = function () {
        acceptCall();
    };

    $scope.HangUpCall = function () {
        hangupCall();
        $scope.CallStatus = null;
        $scope.clickBtnStateName = "waiting";
    };

    $scope.onClosePage = function () {
        console.log("closed");
    };

    $scope.$on("$destroy", function() {
        console.log("closed controller");
        unregister();
        //disconnectAllCalls();
    });

    getRegistrationData(authToken);
    $scope.LoadCurrentCalls();
    //Initiate(onRegistrationCompleted, onCallDisconnected, onCallConnected);

});

mainApp.controller("loginModalController", function ($scope, $uibModalInstance,user,pickPassword) {

    $scope.showModal=true;
    $scope.username=user;

    $scope.ok = function () {
        pickPassword($scope.userPasssword);
        $scope.showModal=false;
        $uibModalInstance.close($scope.password);
    };

    $scope.login= function () {
        pickPassword($scope.userPasssword);
        $scope.showModal=false;
        $uibModalInstance.close($scope.password);
    };

    $scope.closeModal = function () {
        pickPassword(null);
        $scope.showModal=false;
        $uibModalInstance.dismiss('cancel');
    };

    $scope.cancel = function () {
        pickPassword(null);
        $scope.showModal=false;
        $uibModalInstance.dismiss('cancel');
    };



});