/**
 * Created by Pawan on 5/28/2016.
 */

mainApp.factory('callMonitorSrv', function ($http, authService) {

    return {

        getCurrentCalls: function () {
            var authToken = authService.GetToken();
            return $http({
                method: 'GET',
                url: "http://monitorrestapi.app.veery.cloud/DVP/API/1.0.0.0/MonitorRestAPI/Calls",
                headers: {
                    'authorization':authToken
                }
            }).then(function(response)
            {
                return response;
            });
        },

        bargeCalls: function (bargeID,protocol) {
            var authToken = authService.GetToken();

            return $http({
                method: 'POST',
                url: "http://monitorrestapi.app.veery.cloud/DVP/API/1.0.0.0/MonitorRestAPI/Dispatch/"+bargeID+"/barge",
                headers: {
                    'authorization':authToken
                },
                data:
                {
                    protocol:protocol,
                    destination:"2003"
                }
            }).then(function(response)
            {
                console.log(JSON.stringify(response));
                return response;
            });
        },

        listenCall: function (bargeID,protocol,destinationKey) {
            var authToken = authService.GetToken();
            return $http({
                method: 'POST',
                url: "http://monitorrestapi.app.veery.cloud/DVP/API/1.0.0.0/MonitorRestAPI/Dispatch/"+bargeID+"/listen",
                headers: {
                    'authorization':authToken
                },
                data:
                {
                    protocol:protocol,
                    destination:destinationKey
                }
            }).then(function(response)
            {
                console.log(JSON.stringify(response));
                return response;
            });
        },
        threeWayCall: function (bargeID,protocol) {
            var authToken = authService.GetToken();
            return $http({
                method: 'POST',
                url: "http://monitorrestapi.app.veery.cloud/DVP/API/1.0.0.0/MonitorRestAPI/Dispatch/"+bargeID+"/threeway",
                headers: {
                    'authorization':authToken
                },
                data:
                {
                    protocol:protocol,
                    destination:"2003"
                }
            }).then(function(response)
            {
                console.log(JSON.stringify(response));
                return response;
            });
        }


    }
});




