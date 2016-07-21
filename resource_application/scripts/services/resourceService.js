/**
 * Created by Rajinda on 12/31/2015.
 */
'use strict';
mainApp.factory("resourceService", function ($http, $log, $filter, authService, baseUrls) {

    var showError = function (tittle, label, button, content) {

        new PNotify({
            title: tittle,
            text: content,
            type: 'error',
            styling: 'bootstrap3'
        });
    };

    var setResourceToProfile = function (resourceName, resourceid) {
        return $http({
            method: 'put',
            url: baseUrls.UserServiceBaseUrl + "User/" + resourceName + "/profile/resource/" + resourceid,
            headers: {
                'authorization': authService.GetToken()
            }
        }).then(function (response) {
            if (response.data && response.data.IsSuccess) {
                console.info("Resource Map To Profile..........Done............");
                return response.data.IsSuccess;
            } else {
                console.error("Resource Map To Profile..........Error............");
                return false;
            }
        });
    };


    var resourceNameIsExsists = function (resourceName) {
        return $http({
            method: 'GET',
            url: baseUrls.UserServiceBaseUrl + "User/" + resourceName + "/exsists",
            headers: {
                'authorization': authService.GetToken()
            }
        }).then(function (response) {
            return response.data.Result;
        });

    };

    var getResources = function (rowCount, pageNo) {
        return $http({
            method: 'GET',
            url: baseUrls.resourceServiceBaseUrl + "Resources/" + rowCount + "/" + pageNo,
            headers: {
                'authorization': authService.GetToken()
            }
        }).then(function (response) {
            if (response.data && response.data.IsSuccess) {
                return response.data.Result;
            } else {
                return {};
            }
        });

    };

    var getTaskAttachToResource = function (resourceId) {
        return $http({
            method: 'GET',
            url: baseUrls.resourceServiceBaseUrl + "Resource/" + resourceId + "/Tasks",
            headers: {
                'authorization': authService.GetToken()
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
                'authorization': authService.GetToken()
            },
            data: resource
        }).then(function (response) {
            /*try {
                if (response.data.IsSuccess) {
                    console.info("Resource Map To Profile..........Start............");
                    setResourceToProfile(resource.ResourceName, response.data.Result.ResourceId);
                }
                else{
                    console.error("Fail To Save Resource.");
                    showError("Error", "Error", "ok", "Fail To Save Resource Info.");
                }
            }
            catch (ex) {
                console.error(ex);
            }*/
            return response.data;
        });

    };

    var deleteResource = function (resourceId) {
        return $http({
            method: 'delete',
            url: baseUrls.resourceServiceBaseUrl + "Resource/" + resourceId,
            headers: {
                'authorization': authService.GetToken()
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
                'authorization': authService.GetToken()
            }

        }).then(function (response) {
            return response.data.Result;
        });
    };

    var assignTask = function (resourceId, taskId, concurrency) {
        return $http({
            method: 'POST',
            url: baseUrls.resourceServiceBaseUrl + "Resource/" + resourceId + "/Tasks/" + taskId,
            headers: {
                'authorization': authService.GetToken()
            },
            data: {"Concurrency": concurrency}
        }).then(function (response) {
            return response.data;
        });
    };

    var assignTasksToResource = function (item, resource) {
        angular.forEach(item, function (a) {
            assignTask(resource.ResourceId, a.TaskId, a.Concurrency);
        });

    };

    var deleteTask = function (resourceId, taskId) {
        return $http({
            method: 'DELETE',
            url: baseUrls.resourceServiceBaseUrl + "Resource/" + resourceId + "/Task/" + taskId,
            headers: {
                'authorization': authService.GetToken()
            }
        }).then(function (response) {
            return response.data.IsSuccess;
        });
    };

    var deleteTasksToResource = function (item, resource) {
        angular.forEach(item, function (a) {
            deleteTask(resource.ResourceId, a.TaskId);
        });

    };

    var updateResource = function (resource) {
        return $http({
            method: 'PUT',
            url: baseUrls.resourceServiceBaseUrl + "Resource/" + resource.ResourceId,
            headers: {
                'authorization': authService.GetToken()
            },
            data: resource
        }).then(function (response) {
            return response.data.IsSuccess;

        });

    };

    var updateAttachedTask = function (resourceId, taskId, data) {
        return $http({
            method: 'PUT',
            url: baseUrls.resourceServiceBaseUrl + "Resource/" + resourceId + "/Tasks/" + taskId,
            headers: {
                'authorization': authService.GetToken()
            },
            data: data
        }).then(function (response) {
            return response.data.IsSuccess;

        });

    };

    var getAttributes = function (resource) {
        return $http({
            method: 'get',
            url: baseUrls.resourceServiceBaseUrl + "Attributes",
            headers: {
                'authorization': authService.GetToken()
            },
            data: resource
        }).then(function (response) {
            return response.data.Result;

        });

    };

    var getAttributesAttachToResource = function (resTaskId) {
        return $http({
            method: 'get',
            url: baseUrls.resourceServiceBaseUrl + "ResourceTask/" + resTaskId + "/Attributes",
            headers: {
                'authorization': authService.GetToken()
            }
        }).then(function (response) {
            return response.data.Result;

        });

    };

    var updateAttributesAttachToResource = function (item) {
        return $http({
            method: 'put',
            url: baseUrls.resourceServiceBaseUrl + "ResourceTaskAttribute/" + item.savedObj.ResAttId,
            headers: {
                'authorization': authService.GetToken()
            },
            data: item.savedObj
        }).then(function (response) {
            return response.data.Result;

        });

    };

    var attachAttributeToTask = function (resTaskId, attributeId, percentage, otherData) {
        return $http({
            method: 'post',
            url: baseUrls.resourceServiceBaseUrl + "ResourceTask/" + resTaskId + "/Attribute/" + attributeId,
            headers: {
                'authorization': authService.GetToken()
            },
            data: {'Attribute': attributeId, 'Percentage': percentage, 'OtherData': otherData}
        }).then(function (response) {
            return response.data;

        });

    };

    var deleteAttributeAssignToTask = function (resAttId) {
        return $http({
            method: 'delete',
            url: baseUrls.resourceServiceBaseUrl + "ResourceTaskAttribute/" + resAttId,
            headers: {
                'authorization': authService.GetToken()
            }
        }).then(function (response) {
            return response.data;

        });

    };

    var getResourcesCount = function (resAttId) {
        return $http({
            method: 'get',
            url: baseUrls.resourceServiceBaseUrl + "ResourceCount",
            headers: {
                'authorization': authService.GetToken()
            }
        }).then(function (response) {
            return response.data;

        });

    };

    return {
        GetResources: getResources,
        GetTaskAttachToResource: getTaskAttachToResource,
        SaveResource: saveResource,
        DeleteResource: deleteResource,
        GetTasks: getTasks,
        UpdateResource: updateResource,
        UpdateAttachedTask: updateAttachedTask,
        UpdateAttributesAttachToResource: updateAttributesAttachToResource,
        DeleteTasksToResource: deleteTasksToResource,
        DeleteTaskToResource: deleteTask,
        AssignTasksToResource: assignTasksToResource,
        AssignTaskToResource: assignTask,
        GetAttributes: getAttributes,
        GetAttributesAttachToResource: getAttributesAttachToResource,
        AttachAttributeToTask: attachAttributeToTask,
        DeleteAttributeAssignToTask: deleteAttributeAssignToTask,
        ResourceNameIsExsists: resourceNameIsExsists,
        GetResourcesCount: getResourcesCount,
        SetResourceToProfile:setResourceToProfile
    }

});




