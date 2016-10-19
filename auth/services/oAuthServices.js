/**
 * Created by Damith on 6/17/2016.
 */
(function () {
    'use strict';
    mainApp.factory('loginService', Service);

    function Service($http, localStorageService, jwtHelper, $auth) {
        var service = {};
        service.mynavigations = mynavigations;
        service.Login = Login;
        service.clearCookie = clearCookie;
        service.getToken = getToken;
        service.getTokenDecode = getTokenDecode;
        service.getMyPackages = getMyPackages;
        service.getAllPackages = getAllPackages;
        service.buyMyPackage = buyMyPackage;
        service.getUserNavigation = getUserNavigation;
        service.checkNavigation = checkNavigation;
        service.getNavigationAccess = getNavigationAccess;
        //service.navigations = navigations;
        service.Logoff = Logoff;
        return service;


        //var navigations = [];
        var mynavigations = {};
        //set cookie
        function setCookie(key, val) {
            localStorageService.set(key, val);
        }

        //get token
        function getToken(appname) {
            var token = $auth.getToken();
            if (token ) {
                if (!jwtHelper.isTokenExpired(token)) {
                    return token;
                }
            }
            return undefined;
        };

        //check is owner
        function isOwner(appname) {
            var token = $auth.getToken();
            if (token) {
                if (!jwtHelper.isTokenExpired(token)) {
                    return token.user_meta.role;
                }
            }
            return undefined;
        };



        //check navigation


        function checkNavigation(appname) {

            try
            {
                var navigations = localStorageService.get("@navigations");
                if (navigations.menus && navigations.menus.length > 0) {
                    var obj = navigations.menus.filter(function (item, index) {
                        return item.menuItem == appname;
                    });

                    if (obj && obj.length > 0) {
                        return true;
                    }
                }
                return false;
            }
            catch(ex)
            {
                return false;
            }


        };

        //get token decode

        function getTokenDecode() {
            var token = $auth.getToken();
            if (token) {
                if (!jwtHelper.isTokenExpired(token)) {
                    return jwtHelper.decodeToken(token);
                }
            }
            return undefined;
        }

        //remove cookie
        //http://userservice.app.veery.cloud
        //http://192.168.5.103:3636
        function clearCookie(key) {
            $auth.removeToken();

        }





        //logoff
        function Logoff(parm, callback) {

            var decodeToken = getTokenDecode();
            $http.delete("http://127.0.0.1:3637/oauth/token/revoke/"+decodeToken.jti,  {
                headers: {
                    Authorization: 'Bearer '+getToken()
                }
            }).
                success(function (data, status, headers, config) {
                    localStorageService.remove("@navigations");
                    $auth.removeToken();
                    callback(true);
                }).
                error(function (data, status, headers, config) {
                    //login error
                    callback(false);
                });
        }


        // user login
        //http://userservice.app.veery.cloud
        //http://192.168.5.103:3636
        function Login(parm, callback) {
            $http.post("http://127.0.0.1:3637/oauth/token", {
                grant_type: "password",
                username: parm.userName,
                password: parm.password,
                scope: "all_all profile_veeryaccount"
            }, {
                headers: {
                    Authorization: 'Basic ' + parm.clientID
                }
            }).
            success(function (data, status, headers, config) {
                localStorageService.remove("@navigations");
                $auth.removeToken();
                $auth.setToken(data)
                callback(true);
            }).
            error(function (data, status, headers, config) {
                //login error
                callback(false);
            });
        }


        //get my packages
        //http://userservice.app.veery.cloud
        //http://192.168.5.103:3636
        function getMyPackages(callback) {
            $http.get("http://localhost:3637/DVP/API/1.0.0.0/MyOrganization/mypackages", {
                headers: {
                    Authorization: 'bearer ' + getToken()
                }
            }).
            success(function (data, status, headers, config) {
                if (data && data.Result && data.Result.length > 0) {
                    callback(true,status);
                } else {
                    callback(false,status);
                }
            }).
            error(function (data, status, headers, config) {
                callback(false,status);
            });
        }

        //get package details
        //http://userservice.app.veery.cloud
        //http://192.168.5.103:3636
        function getAllPackages(callback) {
            $http.get("http://127.0.0.1:3637/DVP/API/1.0.0.0/Packages", {
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
        //http://userservice.app.veery.cloud
        //http://192.168.5.103:3636
        function buyMyPackage(packageName, callback) {
            $http.put("http://127.0.0.1:3637/DVP/API/1.0.0.0/Organisation/Package/" + packageName, {}, {
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

        //user login in to console
        //get current user navigation
        function getUserNavigation(callback) {
            $http.get("http://127.0.0.1:3637/DVP/API/1.0.0.0/MyAppScopes/MyAppScopes/SUPERVISOR_CONSOLE", {
                headers: {
                    Authorization: 'bearer ' + getToken()
                }
            }).
            success(function (data, status, headers, config) {
                console.log(data);
                if (data.IsSuccess && data.Result && data.Result.length > 0) {
                    //navigations = data.Result[0];

                    localStorageService.set("@navigations", data.Result[0]);

                }
                callback(true);
            }).
            error(function (data, status, headers, config) {
                callback(false);
            });
        }

        //check my navigation
        //is can access
        function getNavigationAccess(callback) {
            mynavigations = {};
            $http.get("http://127.0.0.1:3637/DVP/API/1.0.0.0/MyAppScopes/MyAppScopes/SUPERVISOR_CONSOLE", {
                headers: {
                    Authorization: 'bearer ' + getToken()
                }
            }).
            success(function (data, status, headers, config) {
                if (data.IsSuccess && data.Result && data.Result.length > 0) {
                    data.Result[0].menus.forEach(function (item) {
                        mynavigations[item.menuItem] = true;
                    });
                }
                callback(mynavigations);
            }).
            error(function (data, status, headers, config) {
                callback(mynavigations);
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
//    var url = "http://127.0.0.1:3637/oauth/token";
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
