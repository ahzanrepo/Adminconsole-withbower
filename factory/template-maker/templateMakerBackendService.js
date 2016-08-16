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
                url: "http://templates.app.veery.cloud/DVP/API/1.0.0.0/RenderService/Template/"+templateId+"/Style/"+styleId,
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
                url: "http://templates.app.veery.cloud/DVP/API/1.0.0.0/RenderService/Template/"+templateId,
                headers: {
                    'authorization':authToken
                },
                data:resource

            }).then(function(response)
            {
                return response;
            });
        },
        updateTemplateAssignedStyles: function (templateId,resource) {
            var authToken = authService.GetToken();

            return $http({
                method: 'PUT',
                url: "http://templates.app.veery.cloud/DVP/API/1.0.0.0/RenderService/Template/"+templateId+"/AllStyles",
                headers: {
                    'authorization':authToken
                },
                data:resource

            }).then(function(response)
            {
                return response;
            });
        },
        addTemplateNewStyles: function (templateId,resource) {
            var authToken = authService.GetToken();

            return $http({
                method: 'POST',
                url: "http://templates.app.veery.cloud/DVP/API/1.0.0.0/RenderService/Template/"+templateId+"/Styles",
                headers: {
                    'authorization':authToken
                },
                data:resource

            }).then(function(response)
            {
                return response;
            });
        }

    }
});