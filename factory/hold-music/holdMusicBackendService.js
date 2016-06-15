/**
 * Created by Pawan on 6/13/2016.
 */
mainApp.factory('holdMusicBackendService', function ($http) {

    var authToken = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkaW51c2hhZGNrIiwianRpIjoiMjViZjZmZTItZjZjNC00ZWJhLWFmODgtNmMxNjIxOTU4OGRiIiwic3ViIjoiNTZhOWU3NTlmYjA3MTkwN2EwMDAwMDAxMjVkOWU4MGI1YzdjNGY5ODQ2NmY5MjExNzk2ZWJmNDMiLCJleHAiOjE4OTI0NDE2NzIsInRlbmFudCI6MSwiY29tcGFueSI6Mywic2NvcGUiOlt7InJlc291cmNlIjoiYWxsIiwiYWN0aW9ucyI6ImFsbCJ9XSwiaWF0IjoxNDYwNDM4MDcyfQ.aPoVPiTtoGFgnKmhdLBTzwTrQRTGWWliYujHP5NONqU';

    return {
        getHoldMusic: function () {
            return $http({
                method: 'GET',
                url: "http://queuemusic.104.131.67.21.xip.io/DVP/API/1.0.0.0/QueueMusic/Profiles",
                headers: {
                    'authorization':authToken
                }
            }).then(function(response)
            {
                return response;
            });
        },

        getHoldMusicFiles: function () {
            return $http({
                method: 'GET',
                url: "http://fileservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/FileService/Files?fileCategory=HOLDMUSIC&fileFormat=audio/wav",
                headers: {
                    'authorization':authToken
                }
            }).then(function(response)
            {
                return response;
            });
        },
        saveHoldMusicFiles: function (resource) {
            return $http({
                method: 'POST',
                url: "http://queuemusic.104.131.67.21.xip.io/DVP/API/1.0.0.0/QueueMusic/Profile",
                headers: {
                    'authorization':authToken
                },
                data:resource
            }).then(function(response)
            {
                return response;
            });
        },
        removeHoldMusicFiles: function (resource) {
            return $http({
                method: 'DELETE',
                url: "http://queuemusic.104.131.67.21.xip.io/DVP/API/1.0.0.0/QueueMusic/Profile/"+resource.Name,
                headers: {
                    'authorization':authToken
                },
                data:resource
            }).then(function(response)
            {
                return response;
            });
        },
        updateHoldMusicFiles: function (resource) {
            return $http({
                method: 'PUT',
                url: "http://queuemusic.104.131.67.21.xip.io/DVP/API/1.0.0.0/QueueMusic/Profile/"+resource.Name,
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