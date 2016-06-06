/**
 * Created by Rajinda on 12/31/2015.
 */
'use strict';
mainApp.factory("resourceService", function ($http, $log, $filter, authService, baseUrls) {

    var getResources = function (rowCount,pageNo) {
        return $http({
            method: 'GET',
            url: baseUrls.resourceServiceBaseUrl + "Resources/"+rowCount+"/"+pageNo,
            headers: {
                'authorization':  authService.Token
            }
        }).then(function (response) {
            if (response.data && response.data.IsSuccess) {
                return response.data.Result;
            } else {
                return {};
            }
        });

    };

    var saveResource = function (resource) {
        return $http({
            method: 'post',
            url: baseUrls.resourceServiceBaseUrl + "Resource",
            headers: {
                'authorization':  authService.Token
            },
            data:resource
        }).then(function (response) {
            return response.data;
        });

    };

    var deleteResource = function (resourceId) {
        return $http({
            method: 'delete',
            url: baseUrls.resourceServiceBaseUrl + "Resource/"+resourceId,
            headers: {
                'authorization':  authService.Token
            }
        }).then(function (response) {
            return response.data.IsSuccess;
        });

    };

    return {
        GetResources:getResources,
        SaveResource:saveResource,
        DeleteResource:deleteResource
    }

});




