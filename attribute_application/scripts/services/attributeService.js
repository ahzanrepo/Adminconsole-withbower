/**
 * Created by Rajinda on 12/31/2015.
 */
'use strict';
mainApp.factory("attributeService", function ($http, $log, $filter, authService, baseUrls) {

    var getattributeCount = function () {

        return $http.get(baseUrls.resourceServiceBaseUrl + "AttributeCount",
            {
                headers: {authorization: authService.GetToken()}
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
            url: baseUrls.resourceServiceBaseUrl + 'Attribute',
            headers: {
                'authorization': authService.GetToken()
            },
            data: item
        }).then(function (response) {
            return response.data;
        });
    };

    var updateAttribute = function (item) {

        return $http({
            method: 'put',
            url: baseUrls.resourceServiceBaseUrl + 'Attribute/' + item.AttributeId,
            headers: {
                'authorization': authService.GetToken()
            },
            data: item
        }).then(function (response) {
            return response.data.IsSuccess;
        });
    };

    var getattributes = function (rowCount,pageNo) {

        return $http.get(baseUrls.resourceServiceBaseUrl + "Attributes/"+rowCount+"/"+pageNo,
            {
                headers: {authorization: authService.GetToken()}
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
            url: baseUrls.resourceServiceBaseUrl + 'Attribute/' + item.AttributeId,
            headers: {
                'authorization': authService.GetToken()
            },
            data: item
        }).then(function (response) {
            return response.data.IsSuccess;
        });
    };

    var getGroups = function (rowCount,pageNo) {

        return $http({
            method: 'get',
            url: baseUrls.resourceServiceBaseUrl + 'Groups/'+rowCount+'/'+pageNo,
            headers: {
                'authorization': authService.GetToken()
            }
        }).then(function (response) {
            return response.data.Result;
        });
    };

    var GroupsCount = function () {

        return $http({
            method: 'get',
            url: baseUrls.resourceServiceBaseUrl + 'GroupsCount',
            headers: {
                'authorization': authService.GetToken()
            }
        }).then(function (response) {
            return response.data.Result;
        });
    };

    var saveGroup = function (item) {

        return $http({
            method: 'post',
            url: baseUrls.resourceServiceBaseUrl + 'Group',
            headers: {
                'authorization': authService.GetToken()
            },
            data: item
        }).then(function (response) {
            return response.data;
        });
    };

    var updateGroup = function (item, oldItems, grpID) {

        angular.forEach(oldItems, function (a) {
            var items = $filter('filter')(item.Attributes, {AttributeId: a.AttributeId});
            if (items) {
                var index = item.Attributes.indexOf(items[0]);
                item.Attributes.splice(index, 1);
            }
            /*AttributeIds.push(a.AttributeId)*/
        });


        return $http({
            method: 'put',
            url: baseUrls.resourceServiceBaseUrl + 'Group/' + grpID + '/Attributes',
            headers: {
                'authorization': authService.GetToken()
            },
            data: item
        }).then(function (response) {
            return response.data.IsSuccess;
        });
    };

    var deleteGroup = function (item) {

        return $http({
            method: 'delete',
            url: baseUrls.resourceServiceBaseUrl + 'Group/' + item.GroupId,
            headers: {
                'authorization': authService.GetToken()
            },
            data: item
        }).then(function (response) {
            return response.data.IsSuccess;
        });
    };

    var deleteAttributeFrmGroup = function (item, oldItems, grpID) {


        /*var items = $filter('filter')($scope.items, {name: '!ted'})*/
        var AttributeIds = [];
        angular.forEach(item, function (a) {
            var items = $filter('filter')(oldItems, {AttributeId: a.AttributeId})
            if (items) {
                var index = oldItems.indexOf(items[0]);
                oldItems.splice(index, 1);
            }
            /*AttributeIds.push(a.AttributeId)*/
        });

        angular.forEach(oldItems, function (a) {
            AttributeIds.push(a.AttributeId)
        });

        if (AttributeIds.length == 0)
            return;

        return $http({
            method: 'delete',
            url: baseUrls.resourceServiceBaseUrl + 'Group/' + grpID + '/DeleteAttributes',
            headers: {
                'authorization': authService.GetToken(),
                'Content-Type': 'application/json'
            },
            data: {"AttributeIds": AttributeIds}
        }).then(function (response) {
            return response.data.IsSuccess;
        });
    };

    var getTasks = function () {


        return $http({
            method: 'GET',
            url: baseUrls.resourceServiceBaseUrl + "Tasks",
            headers: {
                'authorization': authService.GetToken()
            }

        }).then(function (response) {
            return response.data.Result;
        });
    };

    return {
        GetAttributes: getattributes,
        GetAttributeCount: getattributeCount,
        SaveAttribute: saveAttribute,
        UpdateAttribute: updateAttribute,
        DeleteAttribute: deleteAttribute,
        GetGroups: getGroups,
        GroupsCount:GroupsCount,
        UpdateGroup: updateGroup,
        SaveGroup: saveGroup,
        DeleteGroup: deleteGroup,
        DeleteAttributeFrmGroup: deleteAttributeFrmGroup,
        GetTasks: getTasks
    }

});




