/**
 * Created by Pawan on 6/8/2016.
 */

mainApp.factory('appBackendService', function ($http) {
    var authToken = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkaW51c2hhZGNrIiwianRpIjoiMjViZjZmZTItZjZjNC00ZWJhLWFmODgtNmMxNjIxOTU4OGRiIiwic3ViIjoiNTZhOWU3NTlmYjA3MTkwN2EwMDAwMDAxMjVkOWU4MGI1YzdjNGY5ODQ2NmY5MjExNzk2ZWJmNDMiLCJleHAiOjE4OTI0NDE2NzIsInRlbmFudCI6MSwiY29tcGFueSI6Mywic2NvcGUiOlt7InJlc291cmNlIjoiYWxsIiwiYWN0aW9ucyI6ImFsbCJ9XSwiaWF0IjoxNDYwNDM4MDcyfQ.aPoVPiTtoGFgnKmhdLBTzwTrQRTGWWliYujHP5NONqU';
    return {

        getApplications: function () {
            return $http({
                method: 'GET',
                url: "http://127.0.0.1:8016/DVP/API/1.0.0.0/APPRegistry/Applications",
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
                url: "http://127.0.0.1:8016/DVP/API/1.0.0.0/APPRegistry/Application/"+resource.id,
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
                url: "http://127.0.0.1:8016/DVP/API/1.0.0.0/APPRegistry/Application/"+resource.id,
                headers: {
                    'authorization':authToken
                }

            }).then(function(response)
            {
                return response;
            });
        },




        listenCall: function (bargeID,protocol) {

            return $http({
                method: 'POST',
                url: "http://monitorrestapi.104.131.67.21.xip.io/DVP/API/1.0.0.0/MonitorRestAPI/Dispatch/"+bargeID+"/listen",
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
        threeWayCall: function (bargeID,protocol) {

            return $http({
                method: 'POST',
                url: "http://monitorrestapi.104.131.67.21.xip.io/DVP/API/1.0.0.0/MonitorRestAPI/Dispatch/"+bargeID+"/threeway",
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