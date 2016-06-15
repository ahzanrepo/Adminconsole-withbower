/**
 * Created by Pawan on 6/14/2016.
 */

mainApp.factory('limitBackendService', function ($http) {
    var authToken = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkaW51c2hhZGNrIiwianRpIjoiMjViZjZmZTItZjZjNC00ZWJhLWFmODgtNmMxNjIxOTU4OGRiIiwic3ViIjoiNTZhOWU3NTlmYjA3MTkwN2EwMDAwMDAxMjVkOWU4MGI1YzdjNGY5ODQ2NmY5MjExNzk2ZWJmNDMiLCJleHAiOjE4OTI0NDE2NzIsInRlbmFudCI6MSwiY29tcGFueSI6Mywic2NvcGUiOlt7InJlc291cmNlIjoiYWxsIiwiYWN0aW9ucyI6ImFsbCJ9XSwiaWF0IjoxNDYwNDM4MDcyfQ.aPoVPiTtoGFgnKmhdLBTzwTrQRTGWWliYujHP5NONqU';
    return {

        getLimits: function () {
            return $http({
                method: 'GET',
                url: 'http://limithandler.104.131.67.21.xip.io/DVP/API/1.0.0.0/LimitAPI/Limit/Info',
                headers: {
                    'authorization': authToken
                }})
                .then(function(response){
                    return response;
                });
        },
        saveNewLimit: function (limitInfo) {
            return $http({
                method: 'POST',
                url: 'http://limithandler.104.131.67.21.xip.io/DVP/API/1.0.0.0/LimitAPI/Limit',
                headers: {
                    'authorization': authToken
                },
                data: limitInfo
            })
                .then(function(response){
                    return response;
                });
        }
        ,
        updateMaxLimit: function (limitId,maxLimit) {
            return $http({
                method: 'PUT',
                url: 'http://limithandler.104.131.67.21.xip.io/DVP/API/1.0.0.0/LimitAPI/Limit/'+limitId+'/Max/'+maxLimit,
                headers: {
                    'authorization': authToken
                }
            })
                .then(function(response){
                    return response;
                });
        },
        setLimitStatus: function (limitId,status) {
            return $http({
                method: 'PUT',
                url: 'http://limithandler.104.131.67.21.xip.io/DVP/API/1.0.0.0/LimitAPI/Limit/'+limitId+'/Activate/'+status,
                headers: {
                    'authorization': authToken
                }
            })
                .then(function(response){
                    return response;
                });
        }

    }
});