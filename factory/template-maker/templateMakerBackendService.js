/**
 * Created by Pawan on 8/11/2016.
 */

mainApp.factory('templateMakerBackendService', function ($http, authService)
{
    return {

        saveTemplate: function (resource) {
            var authToken = authService.GetToken();
            return $http({
                method: 'POST',
                url: "http://127.0.0.1:3638/DVP/API/1.0/RenderService/Template",
                headers: {
                    'authorization':authToken
                },

                data:resource
            }).then(function(response)
            {
                return response;
            });
        },

        pickTemplates: function () {
            var authToken = authService.GetToken();

            return $http({
                method: 'GET',
                url: "http://127.0.0.1:3638/DVP/API/1.0/RenderService/Templates",
                headers: {
                    'authorization':authToken
                }

            }).then(function(response)
            {
                return response;
            });
        },

        renderTemplate: function (templateName,paramData) {
            var authToken = authService.GetToken();

            return $http({
                method: 'POST',
                url: "http://127.0.0.1:3638/DVP/API/1.0/RenderService/RenderTemplate/"+templateName,
                headers: {
                    'authorization':authToken
                },
                data:paramData

            }).then(function(response)
            {
                return response;
            });
        },

        deleteTemplates : function (templateName) {
            var authToken = authService.GetToken();

            return $http({
                method: 'DELETE',
                url: "http://127.0.0.1:3638/DVP/API/1.0/RenderService/Template/"+templateName,
                headers: {
                    'authorization':authToken
                }

            }).then(function(response)
            {
                return response;
            });
        },
        deleteStylesOfTemplate : function (templateId,styleId) {
            var authToken = authService.GetToken();

            return $http({
                method: 'DELETE',
                url: "http://127.0.0.1:3638/DVP/API/1.0/RenderService/Template/"+templateId+"/Style/"+styleId,
                headers: {
                    'authorization':authToken
                }

            }).then(function(response)
            {
                return response;
            });
        },

        updateTemplateContentData: function (templateId,resource) {
            var authToken = authService.GetToken();

            return $http({
                method: 'PUT',
                url: "http://127.0.0.1:3638/DVP/API/1.0/RenderService/Template/"+templateId,
                headers: {
                    'authorization':authToken
                },
                data:resource

            }).then(function(response)
            {
                return response;
            });
        },
        updateTemplateAssignedStyle: function (templateId,styleId,resource) {
            var authToken = authService.GetToken();

            return $http({
                method: 'PUT',
                url: "http://127.0.0.1:3638/DVP/API/1.0/RenderService/Template/"+templateId+"/Style/"+styleId,
                headers: {
                    'authorization':authToken
                },
                data:resource

            }).then(function(response)
            {
                return response;
            });
        },

        deleteApplication: function (resource) {

            var authToken = authService.GetToken();
            return $http({
                method: 'DELETE',
                url: "http://appregistry.app.veery.cloud/DVP/API/1.0.0.0/APPRegistry/Application/"+resource.id,
                headers: {
                    'authorization':authToken
                }

            }).then(function(response)
            {
                return response;
            });
        },
        getUnassignedFiles: function () {

            var authToken = authService.GetToken();
            return $http({
                method: 'GET',
                url: "http://fileservice.app.veery.cloud/DVP/API/1.0.0.0/FileService/Files?fileCategory=IVRCLIPS&fileFormat=audio/wav&assignedState=false",
                headers: {
                    'authorization':authToken
                }

            }).then(function(response)
            {
                return response;
            });
        },
        getFilesOfApplication: function (appID) {

            var authToken = authService.GetToken();
            return $http({
                method: 'GET',
                url: "http://fileservice.app.veery.cloud/DVP/API/1.0.0.0/FileService/Files/Info/"+appID,
                headers: {
                    'authorization':authToken
                }

            }).then(function(response)
            {
                return response;
            });
        },

        attachFilesWithApplication: function (appID,fileID) {

            var authToken = authService.GetToken();
            return $http({
                method: 'POST',
                url: "http://fileservice.app.veery.cloud/DVP/API/1.0.0.0/FileService/File/"+fileID+"/AssignToApplication/"+appID,
                headers: {
                    'authorization':authToken
                }

            }).then(function(response)
            {
                return response;
            });
        } ,
        detachFilesFromApplication: function (fileID) {

            var authToken = authService.GetToken();
            return $http({
                method: 'POST',
                url: "http://fileservice.app.veery.cloud/DVP/API/1.0.0.0/FileService/File/"+fileID+"/DetachFromApplication",
                headers: {
                    'authorization':authToken
                }

            }).then(function(response)
            {
                return response;
            });
        },
        getDevelopers: function () {

            var authToken = authService.GetToken();
            return $http({
                method: 'GET',
                url: "http://appregistry.app.veery.cloud/DVP/API/1.0.0.0/APPRegistry/Developers",
                headers: {
                    'authorization':authToken
                }

            }).then(function(response)
            {
                return response;
            });
        },
        ApplicationAssignToDeveloper: function (appId,devId) {

            var authToken = authService.GetToken();

            return $http({
                method: 'POST',
                url: "http://appregistry.app.veery.cloud/DVP/API/1.0.0.0/APPRegistry/Application/"+appId+"/AssignToDeveloper/"+devId,
                headers: {
                    'authorization':authToken
                }

            }).then(function(response)
            {
                return response;
            });
        }

    }
});