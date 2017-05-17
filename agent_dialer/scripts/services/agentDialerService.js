/**
 * Created by Rajinda on 05/17/2017.
 */

mainApp.factory("agentStatusService", function ($http, $log, authService, baseUrls) {

    var getProfileDetails = function () {
        return $http({
            method: 'GET',
            url: baseUrls.ardsmonitoringBaseUrl + "MONITORING/resources",

        }).then(function (response) {
            if (response.data && response.data.IsSuccess) {
                return response.data.Result;
            } else {
                return 0;
            }
        });
    };



    return {
        GetProfileDetails: getProfileDetails,

    }

});
