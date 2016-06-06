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

    var saveAttribute = function (item) {

        return $http({
            method: 'post',
            url: baseUrls.resourceServiceBaseUrl+ 'Attribute',
            headers: {
                'authorization': authService.Token
            },
            data:item
        }).then(function (response) {
            return response.data;
        });
    };

    var updateAttribute = function (item) {

        return $http({
            method: 'put',
            url: baseUrls.resourceServiceBaseUrl+ 'Attribute/'+item.AttributeId,
            headers: {
                'authorization': authService.Token
            },
            data:item
        }).then(function (response) {
            return response.data.IsSuccess;
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

    var deleteAttribute = function (item) {

        return $http({
            method: 'delete',
            url: baseUrls.resourceServiceBaseUrl+ 'Attribute/'+item.AttributeId,
            headers: {
                'authorization': authService.Token
            },
            data:item
        }).then(function (response) {
            return response.data.IsSuccess;
        });
    };

    var getGroups = function () {

        return $http({
            method: 'get',
            url: baseUrls.resourceServiceBaseUrl+ 'Groups',
            headers: {
                'authorization': authService.Token
            }
        }).then(function (response) {
            return response.data.Result;
        });
    };

    var saveGroup = function (item) {

        return $http({
            method: 'post',
            url: baseUrls.resourceServiceBaseUrl+ 'Group',
            headers: {
                'authorization': authService.Token
            },
            data:item
        }).then(function (response) {
            return response.data;
        });
    };

    var updateGroup = function (item) {

        return $http({
            method: 'put',
            url: baseUrls.resourceServiceBaseUrl+ 'Group/'+item.GroupId,
            headers: {
                'authorization': authService.Token
            },
            data:item
        }).then(function (response) {
            return response.data.IsSuccess;
        });
    };

    var deleteGroup = function (item) {

        return $http({
            method: 'delete',
            url: baseUrls.resourceServiceBaseUrl+ 'Group/'+item.GroupId,
            headers: {
                'authorization': authService.Token
            },
            data:item
        }).then(function (response) {
            return response.data.IsSuccess;
        });
    };

    return {
        GetAttributes: getattributes,
        GetAttributeCount:getattributeCount,
        SaveAttribute:saveAttribute,
        UpdateAttribute:updateAttribute,
        DeleteAttribute:deleteAttribute,
        GetGroups:getGroups,
        UpdateGroup:updateGroup,
        SaveGroup:saveGroup,
        DeleteGroup:deleteGroup
    }

});




