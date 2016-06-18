/**
 * Created by Damith on 6/18/2016.
 */

(function () {
    'use strict';
    mainApp.factory('signUpServices', Service);
    function Service($http) {
        var service = {};
        service.createNewUser = createNewUser;
        service.createOrganisation = createOrganisation;
        return service;

        //create new user
        function createNewUser(param, callback) {
            $http.post("http://userservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/Organisation/Owner", param).
            success(function (data, status, headers, config) {
                callback(true);
            }).
            error(function (data, status, headers, config) {
                callback(false);
            });
        }

        //create Organisation
        function createOrganisation(param, callback) {
            $http.post("http://userservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/Organisation", param).
            success(function (data, status, headers, config) {
                callback(true);
            }).
            error(function (data, status, headers, config) {
                callback(false);
            });
        }
    }


})();

