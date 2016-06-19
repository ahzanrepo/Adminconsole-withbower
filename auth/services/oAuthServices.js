/**
 * Created by Damith on 6/17/2016.
 */
(function () {
    'use strict';
    mainApp.factory('loginService', Service);

    function Service($http, localStorageService, jwtHelper) {
        var service = {};
        service.Login = Login;
        service.clearCookie = clearCookie;
        service.getToken = getToken;
        service.getTokenDecode = getTokenDecode;
        service.getMyPackages = getMyPackages;
        service.getAllPackages = getAllPackages;
        service.buyMyPackage = buyMyPackage;
        return service;

        //set cookie
        function setCookie(key, val) {
            localStorageService.set(key, val);
        }

        //get token
        function getToken(appname) {
            var data = localStorageService.get("@loginToken");
            if (data && data.access_token) {
                if (!jwtHelper.isTokenExpired(data.access_token)) {
                    return data.access_token;
                }
            }
            return undefined;
        };

        //get token decode
        function getTokenDecode() {
            var data = localStorageService.get("@loginToken");
            if (data && data.access_token) {
                if (!jwtHelper.isTokenExpired(data.access_token)) {
                    return jwtHelper.decodeToken(data.access_token);
                }
            }
            return undefined;
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
                scope: "all_all"
            }, {
                headers: {
                    Authorization: 'Basic ' + parm.clientID
                }
            }).
            success(function (data, status, headers, config) {
                clearCookie('@loginToken');
                setCookie('@loginToken', data);
                callback(true);
            }).
            error(function (data, status, headers, config) {
                //login error
                callback(false);
            });
        }


        //get my packages
        function getMyPackages(callback) {
            $http.get("http://userservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/MyOrganization/mypackages", {
                headers: {
                    Authorization: 'bearer ' + getToken()
                }
            }).
            success(function (data, status, headers, config) {
                if (data && data.Result && data.Result.length > 0) {
                    callback(true);
                } else {
                    callback(false);
                }
            }).
            error(function (data, status, headers, config) {
                callback(false);
            });
        }

        //get package details
        function getAllPackages(callback) {
            $http.get("http://userservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/Packages", {
                headers: {
                    Authorization: 'bearer ' + getToken()
                }
            }).
            success(function (data, status, headers, config) {
                callback(data.Result);

            }).
            error(function (data, status, headers, config) {
                callback(data.Result);
            });
        }

        //buy my package details
        function buyMyPackage(packageName, callback) {
            $http.put("http://userservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/Organisation/Package/" + packageName, {}, {
                headers: {
                    Authorization: 'bearer ' + getToken()
                }
            }).
            success(function (data, status, headers, config) {
                callback(true);
            }).
            error(function (data, status, headers, config) {
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
