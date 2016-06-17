/**
 * Created by Damith on 6/1/2016.
 */

mainApp.controller('loginCtrl', function ($scope, $state, $http,
                                          config, $base64) {
        var para = {
            userName: null,
            password: null,
            clientID: $base64.encode(config.client_Id_secret),
            auth_API: config.Auth_API
        };


        $scope.onClickLogin = function () {
            para.userName = $scope.userName;
            para.password = $scope.password;
            //loginService.Login(loginData, function (result) {
            //    console.log(result);
            //});

            var data = {
                grant_type: "password",
                username: para.userName,
                password: para.password,
                scope: "client_scopes all_all"
            };


            //$http.defaults.headers.common.Authorization = 'Basic ' + para.clientID;
            $http.post("http://userservice.162.243.230.46.xip.io/oauth/token", {
                grant_type: "password",
                username: para.userName,
                password: para.password,
                scope: "client_scopes all_all"
            }, {
                headers: {
                    Authorization: 'Basic ' + para.clientID
                }

            }).
            success(function (data, status, headers, config) {
                console.lo(data);
            }).
            error(function (data, status, headers, config) {
            });
        }
    }
);