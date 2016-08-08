/**
 * Created by Pawan on 6/18/2016.
 */
/**
 * Created by Pawan on 6/8/2016.
 */

mainApp.factory('ardsBackendService', function ($http, authService) {

    return {

        getArdsRecords: function () {

            var authToken = authService.GetToken();
            return $http({
                method: 'GET',
                url: "http://ardsliteservice.app.veery.cloud/DVP/API/1.0.0.0/ARDS/requestmeta",
                headers: {
                    'authorization':authToken
                }
            }).then(function(response)
            {
                return response;
            });
        },

        getTasks: function () {
            var authToken = authService.GetToken();
            return $http({
                method: 'GET',
                url: "http://resourceservice.app.veery.cloud/DVP/API/1.0.0.0/ResourceManager/Tasks",
                headers: {
                    'authorization':authToken
                }

            }).then(function(response)
            {
                return response;
            });
        },

        getGroups: function () {
            var authToken = authService.GetToken();
            return $http({
                method: 'GET',
                url: "http://resourceservice.app.veery.cloud/DVP/API/1.0.0.0/ResourceManager/Groups",
                headers: {
                    'authorization':authToken
                }

            }).then(function(response)
            {
                return response;
            });
        },

        saveArds: function (resource) {
            var authToken = authService.GetToken();
            return $http({
                method: 'post',
                url: "http://ardsliteservice.app.veery.cloud/DVP/API/1.0.0.0/ARDS/requestmeta",
                headers: {
                    'authorization':authToken
                },
                data:resource

            }).then(function(response)
            {
                return response;
            });
        },

        updateArds: function (resource) {
            var authToken = authService.GetToken();
            return $http({
                method: 'PUT',
                url: "http://ardsliteservice.app.veery.cloud/DVP/API/1.0.0.0/ARDS/requestmeta",
                headers: {
                    'authorization':authToken
                },
                data:resource

            }).then(function(response)
            {
                return response;
            });
        },
        deleteArds: function (serverType,requestType) {
            var authToken = authService.GetToken();
            return $http({
                method: 'DELETE',
                url: 'http://ardsliteservice.app.veery.cloud/DVP/API/1.0.0.0/ARDS/requestmeta/'+serverType+'/'+requestType,
                headers: {
                    'authorization':authToken
                }

            }).then(function(response)
            {
                return response;
            });
        },

        getRequestServers: function () {

            var authToken = authService.GetToken();
            return $http({
                method: 'GET',
                url: "http://ardsliteservice.app.veery.cloud/DVP/API/1.0.0.0/ARDS/requestservers/*/*",
                headers: {
                    'authorization':authToken
                }
            }).then(function(response)
            {
                return response;
            });
        },



    }
});