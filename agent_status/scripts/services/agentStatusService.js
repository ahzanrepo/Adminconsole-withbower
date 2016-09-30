/**
 * Created by Rajinda on 12/31/2015.
 */

mainApp.factory("agentStatusService", function ($http, $log, authService, baseUrls) {

    var getProfileDetails = function () {
        return $http({
            method: 'GET',
            url: baseUrls.ardsmonitoringBaseUrl+"MONITORING/resources",
            headers: {
                'authorization': authService.GetToken()
            }
        }).then(function (response) {
            if (response.data && response.data.IsSuccess) {
                return response.data.Result;
            } else {
                return 0;
            }
        });
    };

    var getAllAttributes = function () {
        return $http({
            method: 'GET',
            url: baseUrls.resourceServiceBaseUrl+"Attributes",
            headers: {
                'authorization': authService.GetToken()
            }
        }).then(function (response) {
            if (response.data && response.data.IsSuccess) {
                return response.data.Result;
            } else {
                return 0;
            }

        });
    };

    var getAllActiveCalls = function () {
        return $http({
            method: 'GET',
            url: baseUrls.monitorrestapi+"Calls",
            headers: {
                'authorization': authService.GetToken()
            }
        }).then(function (response) {
            if (response.data && response.data.IsSuccess) {
                return response.data.Result;
            } else {
                return 0;
            }
        });
    };

    /*var getProductivity = function () {

        return $http.get(baseUrls.resourceServiceBaseUrl+ "Resources/Productivity",
            {
                headers:{authorization:authService.GetToken()}
            }).then(function (response) {
                if (response.data && response.data.IsSuccess) {
                    return response.data.Result;
                } else {
                    return {};
                }
            });
    }; */

    var getProductivity = function () {

        return $http.get(baseUrls.resourceServiceBaseUrl+"Resources/Productivity",
            {
                headers:{authorization:authService.GetToken()}
            }).then(function (response) {
                if (response.data && response.data.IsSuccess) {
                    return response.data.Result;
                } else {
                    return {};
                }
            });
    };


    return {
        GetProfileDetails: getProfileDetails,
        GetAllAttributes:getAllAttributes,
        GetAllActiveCalls:getAllActiveCalls,
        GetProductivity:getProductivity
    }

});
