/**
 * Created by Rajinda on 12/31/2015.
 */
'use strict';
mainApp.factory("resourceService", function ($http, $log, $filter, authService, baseUrls) {

    var getResources = function (rowCount, pageNo) {
        return $http({
            method: 'GET',
            url: baseUrls.resourceServiceBaseUrl + "Resources/" + rowCount + "/" + pageNo,
            headers: {
                'authorization': authService.Token
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
                'authorization': authService.Token
            },
            data: resource
        }).then(function (response) {
            return response.data;
        });

    };

    var deleteResource = function (resourceId) {
        return $http({
            method: 'delete',
            url: baseUrls.resourceServiceBaseUrl + "Resource/" + resourceId,
            headers: {
                'authorization': authService.Token
            }
        }).then(function (response) {
            return response.data.IsSuccess;
        });

    };

    var getTasks = function () {


        return $http({
            method: 'GET',
            url: baseUrls.resourceServiceBaseUrl + "Tasks",
            headers: {
                'authorization': authService.Token
            }

        }).then(function (response) {
            return response.data.Result;
        });
    };

    var assignTask = function (resourceId, taskId) {
        return $http({
            method: 'POST',
            url: baseUrls.resourceServiceBaseUrl + "Resource/" + resourceId + "/Tasks/" + taskId,
            headers: {
                'authorization': authService.Token
            },
            data:{}
        }).then(function (response) {
            return response.data.IsSuccess;
        });
    };

    var assignTaskToResource = function (item, oldItems, resource) {

        angular.forEach(oldItems, function (a) {
            var items = $filter('filter')(item, {TaskId: a.TaskId});
            if (items) {
                var index = item.indexOf(items[0]);
                item.splice(index, 1);
            }
        });

        angular.forEach(item, function (a) {
            assignTask(resource.ResourceId, a.TaskId);
        });

    };

    var deleteTask = function (resourceId,taskId) {
        return $http({
            method: 'DELETE',
            url: baseUrls.resourceServiceBaseUrl + "Resource/" + resourceId + "/Task/" + taskId,
            headers: {
                'authorization': authService.Token
            }
        }).then(function (response) {
            return response.data.IsSuccess;
        });
    };

    var deleteTaskToResource = function (item, oldItems, resource) {

        var AttributeIds = [];
        angular.forEach(item, function (a) {
            var items = $filter('filter')(oldItems, {TaskId: a.TaskId})
            if (items) {
                var index = oldItems.indexOf(items[0]);
                oldItems.splice(index, 1);
            }
        });

        angular.forEach(oldItems, function (a) {
            AttributeIds.push(a.TaskId)
        });

        angular.forEach(AttributeIds, function (a) {
            deleteTask(resource.ResourceId,a);
        });

    };

    var updateResource = function(resource){
        return $http({
            method: 'PUT',
            url: baseUrls.resourceServiceBaseUrl + "Resource/" + resource.ResourceId,
            headers: {
                'authorization': authService.Token
            },
            data:resource
        }).then(function(response)
        {
            return response.data.IsSuccess;

        });

    };

    return {
        GetResources: getResources,
        SaveResource: saveResource,
        DeleteResource: deleteResource,
        GetTasks: getTasks,
        UpdateResource:updateResource,
        DeleteTaskToResource: deleteTaskToResource,
        AssignTaskToResource: assignTaskToResource
    }

});




