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
                url: "http://ardsliteservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ARDS/requestmeta",
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
                url: "http://resourceservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ResourceManager/Tasks",
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
                url: "http://resourceservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ResourceManager/Groups",
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
                url: "http://ardsliteservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ARDS/requestmeta",
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
                url: "http://ardsliteservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ARDS/requestmeta",
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
                url: 'http://ardsliteservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/ARDS/requestmeta/'+serverType+'/'+requestType,
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
                url: "http://fileservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/FileService/Files/Info/"+appID,
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
                url: "http://fileservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/FileService/File/"+fileID+"/AssignToApplication/"+appID,
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
                url: "http://fileservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/FileService/File/"+fileID+"/DetachFromApplication",
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
                url: "http://appregistry.104.131.67.21.xip.io/DVP/API/1.0.0.0/APPRegistry/Developers",
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
                url: "http://appregistry.104.131.67.21.xip.io/DVP/API/1.0.0.0/APPRegistry/Application/"+appId+"/AssignToDeveloper/"+devId,
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