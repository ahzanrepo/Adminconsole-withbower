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
        }

    }
});