/**
 * Created by Rajinda on 12/31/2015.
 */
'use strict';
mainApp.factory("attributeService", function ($http, $log, authService, baseUrls) {

    var getattributeCount = function () {

        return $http.get(baseUrls.resourceServiceBaseUrl + "AttributeCount",
            {
                headers: {authorization: authService.Token}
            }).then(function (response) {
                if (response.data && response.data.IsSuccess) {
                    return response.data.Result;
                } else {
                    return {};
                }
            });
    };

    var updateAttributes = function (item) {

        return $http({
            method: 'put',
            url: baseUrls.resourceServiceBaseUrl+ 'Attribute/'+item.AttributeId,
            headers: {
                'authorization': authService.Token
            },
            data:item
        }).then(function (response) {
            return response.data.Result;
        });
    };

    var getattributes = function (rowCount, pageNo) {

        return $http.get(baseUrls.resourceServiceBaseUrl + "Attributes" ,
            {
                headers: {authorization: authService.Token}
            }).then(function (response) {
                if (response.data && response.data.IsSuccess) {
                    return response.data.Result;
                } else {
                    return {};
                }
            });
    };

    return {
        GetAttributes: getattributes,
        GetAttributeCount:getattributeCount,
        UpdateAttributes:updateAttributes
    }

});




