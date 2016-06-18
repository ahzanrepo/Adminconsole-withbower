/**
 * Created by Damith on 6/17/2016.
 */
(function () {
    'use strict';
    mainApp.factory('loginService', Service);

    function Service($http, localStorageService) {
        var service = {};
        service.Login = Login;
        service.clearCookie = clearCookie;
        return service;

        //set cookie
        function setCookie(key, val) {
            localStorageService.set(key, val);
        }

        //remove cookie
        function clearCookie(key) {
            localStorageService.remove(key);
        }

        // user login
        function Login(parm, callback) {
            $http.post("http://userservice.104.131.67.21.xip.io/oauth/token", {
                grant_type: "password",
                username: parm.userName,
                password: parm.password,
                scope: "client_scopes all_all"
            }, {
                headers: {
                    Authorization: 'Basic ' + parm.clientID
                }
            }).
            success(function (data, status, headers, config) {
                setCookie('@loginToken', data);
                callback(true);
            }).
            error(function (data, status, headers, config) {
                //login error
                callback(false);
            });
        }
    }
})();


//$http({
//    method: 'POST',
//    url: Auth_API + "oauth/token",
//    headers: {
//        'Content-Type': 'application/json',
//        'Authorization': 'Basic ' + para.clientID
//    },
//    data: {
//        "grant_type": "password",
//        "username": para.userName,
//        "password": para.password,
//        "scope": "client_scopes all_all"
//    }
//}).
//success(function (data, status, headers, config) {
//    console.lo(data);
//}).
//error(function (data, status, headers, config) {
//});
//});

//$scope.Register = function () {
//
//
//    var url = "http://localhost:3636/oauth/token";
//    var encoded = $base64.encode("ae849240-2c6d-11e6-b274-a9eec7dab26b:6145813102144258048");
//    var config = {
//        headers: {
//            'Authorization': 'Basic ' + encoded
//        }
//    };
//
//    var data = {
//        "grant_type": "password",
//        "username": $scope.profile.userName,
//        "password": $scope.profile.password,
//        "scope": "client_scopes all_all"
//    };
//
//
//    $http.post(url, data, config)
//        .success(function (data, status, headers, config) {
//            $scope.PostDataResponse = data;
//            console.log(data);
//
//            if (data) {
//                var decodeData = jwtHelper.decodeToken(data.access_token);
//
//
//
//            }
//        });
//
//};
