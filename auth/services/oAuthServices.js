/**
 * Created by Damith on 6/17/2016.
 */

'use strict';
mainApp.factory('loginService', function ($http) {

});


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
