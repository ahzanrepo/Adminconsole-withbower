/**
 * Created by Pawan on 6/13/2016.
 */
mainApp.factory('holdMusicBackendService', function ($http, authService) {

    return {
        getHoldMusic: function () {
            var authToken = authService.GetToken();
            return $http({
                method: 'GET',
                url: "QueueMusic/Profiles",
                headers: {
                    'authorization':authToken
                }
            }).then(function(response)
            {
                return response;
            });
        },

        getHoldMusicFiles: function () {
            var authToken = authService.GetToken();
            return $http({
                method: 'GET',
                url: "http://fileservice.app.veery.cloud/DVP/API/1.0.0.0/FileService/Files?fileCategory=IVRCLIPS&fileFormat=audio/wav",
                headers: {
                    'authorization':authToken
                }
            }).then(function(response)
            {
                return response;
            });
        },
        saveHoldMusicFiles: function (resource) {
            var authToken = authService.GetToken();
            return $http({
                method: 'POST',
                url: "http://queuemusic.app.veery.cloud/DVP/API/1.0.0.0/QueueMusic/Profile",
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
            var authToken = authService.GetToken();
            return $http({
                method: 'DELETE',
                url: "http://queuemusic.app.veery.cloud/DVP/API/1.0.0.0/QueueMusic/Profile/"+resource.Name,
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
            var authToken = authService.GetToken();
            return $http({
                method: 'PUT',
                url: "http://queuemusic.app.veery.cloud/DVP/API/1.0.0.0/QueueMusic/Profile/"+resource.Name,
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