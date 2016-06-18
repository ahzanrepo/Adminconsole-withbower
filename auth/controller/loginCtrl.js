/**
 * Created by Damith on 6/1/2016.
 */

mainApp.controller('loginCtrl', function ($scope, $state, $http,
                                          loginService,
                                          config, $base64) {
        var para = {
            userName: null,
            password: null,
            clientID: $base64.encode(config.client_Id_secret),
        };

        var showAlert = function (title, type, content) {
            new PNotify({
                title: title,
                text: content,
                type: type,
                styling: 'bootstrap3'
            });
        };


        $scope.onClickLogin = function () {
            para.userName = $scope.userName;
            para.password = $scope.password;
            //parameter option
            //username
            //password
            //decode clientID
            loginService.Login(para, function (result) {
                if (result) {
                    $state.go('login');
                } else {
                    showAlert('Error', 'error', 'Please check login details...');
                }
            });

            //var data = {
            //    grant_type: "password",
            //    username: para.userName,
            //    password: para.password,
            //    scope: "client_scopes all_all"
            //};


            ////$http.defaults.headers.common.Authorization = 'Basic ' + para.clientID;
            //$http.post("http://userservice.104.131.67.21.xip.io/oauth/token", {
            //    grant_type: "password",
            //    username: para.userName,
            //    password: para.password,
            //    scope: "client_scopes all_all"
            //}, {
            //    headers: {
            //        Authorization: 'Basic ' + para.clientID
            //    }
            //
            //}).
            //success(function (data, status, headers, config) {
            //    console.lo(data);
            //}).
            //error(function (data, status, headers, config) {
            //});
        }
    }
);