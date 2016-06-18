/**
 * Created by Pawan on 6/17/2016.
 */
/**
 * Created by Pawan on 6/8/2016.
 */

mainApp.factory('extensionBackendService', function ($http) {
    var authToken = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkaW51c2hhZGNrIiwianRpIjoiMjViZjZmZTItZjZjNC00ZWJhLWFmODgtNmMxNjIxOTU4OGRiIiwic3ViIjoiNTZhOWU3NTlmYjA3MTkwN2EwMDAwMDAxMjVkOWU4MGI1YzdjNGY5ODQ2NmY5MjExNzk2ZWJmNDMiLCJleHAiOjE4OTI0NDE2NzIsInRlbmFudCI6MSwiY29tcGFueSI6Mywic2NvcGUiOlt7InJlc291cmNlIjoiYWxsIiwiYWN0aW9ucyI6ImFsbCJ9XSwiaWF0IjoxNDYwNDM4MDcyfQ.aPoVPiTtoGFgnKmhdLBTzwTrQRTGWWliYujHP5NONqU';
    return {

        getExtensions: function () {
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

        saveNewApplication: function (resource) {

            return $http({
                method: 'POST',
                url: "http://appregistry.104.131.67.21.xip.io/DVP/API/1.0.0.0/APPRegistry/Application",
                headers: {
                    'authorization':authToken
                },
                data:resource

            }).then(function(response)
            {
                return response;
            });
        },

        assignMasterApplication: function (masterId,childId) {

            return $http({
                method: 'POST',
                url: "http://appregistry.104.131.67.21.xip.io/DVP/API/1.0.0.0/APPRegistry/Application/"+childId+"/SetAsMasterApp/"+masterId,
                headers: {
                    'authorization':authToken
                }

            }).then(function(response)
            {
                return response;
            });
        },

        updateApplication: function (resource) {

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