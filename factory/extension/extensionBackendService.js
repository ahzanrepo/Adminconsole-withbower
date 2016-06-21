/**
 * Created by Pawan on 6/17/2016.
 */
/**
 * Created by Pawan on 6/8/2016.
 */

mainApp.factory('extensionBackendService', function ($http, authService) {

    return {

        getExtensions: function () {
            var authToken = authService.GetToken();
            return $http({
                method: 'GET',
                url: "http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/Extensions",
                headers: {
                    'authorization':authToken
                }
            }).then(function(response)
            {
                return response;
            });
        },

        saveNewExtension: function (resource) {
            var authToken = authService.GetToken();
            return $http({
                method: 'POST',
                url: "http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/Extension",
                headers: {
                    'authorization':authToken
                },
                data:resource

            }).then(function(response)
            {
                return response;
            });
        },

        assignDodToExtension: function (ExtId,DodNum) {
            var dodData =
            {
                ExtId:ExtId, DodNumber:DodNum, DodActive:true
            }
            var authToken = authService.GetToken();
            return $http({
                method: 'POST',
                url: "http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/DodNumber",
                headers: {
                    'authorization':authToken
                },
                data:dodData

            }).then(function(response)
            {
                return response;
            });
        },

        updateApplication: function (resource) {
            var authToken = authService.GetToken();
            return $http({
                method: 'PUT',
                url: "http://appregistry.104.131.67.21.xip.io/DVP/API/1.0.0.0/APPRegistry/Application/"+resource.id,
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
                url: "http://appregistry.104.131.67.21.xip.io/DVP/API/1.0.0.0/APPRegistry/Application/"+resource.id,
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
                url: "http://fileservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/FileService/Files?fileCategory=HOLDMUSIC&fileFormat=audio/wav&assignedState=false",
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