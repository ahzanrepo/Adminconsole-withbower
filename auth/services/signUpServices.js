/**
 * Created by Damith on 6/18/2016.
 */

(function () {
    'use strict';
    mainApp.factory('signUpServices', Service);
    function Service($http, baseUrls) {
        var service = {};
        service.createNewUser = createNewUser;
        service.createOrganisation = createOrganisation;
        service.isCheckOrganization = isCheckOrganization;
        return service;

        //create new user
        //http://192.168.5.103:3636
        //http://userservice.app.veery.cloud
        function createNewUser(param, callback) {
            $http.post(baseUrls.UserServiceBaseUrl + "Organisation/Owner", param).success(function (data, status, headers, config) {
                callback(true);
            }).error(function (data, status, headers, config) {
                callback(false);
            });
        }

        //create Organisation
        function createOrganisation(param, callback) {
            $http.post(baseUrls.UserServiceBaseUrl + "Organisation", param).success(function (data, status, headers, config) {
                callback(true);
            }).error(function (data, status, headers, config) {
                callback(false);
            });
        }

        //is check Organisation name
        function isCheckOrganization(orgName, callback) {
            $http.post(baseUrls.UserServiceBaseUrl + "Organisation/" + orgName + "/exists", param).success(function (data, status, headers, config) {
                callback(true);
            }).error(function (data, status, headers, config) {
                callback(false);
            });
        }
    }


})();

