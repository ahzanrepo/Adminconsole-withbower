/**
 * Created by Pawan on 6/14/2016.
 */

mainApp.factory('limitBackendService', function ($http, authService) {

    return {

        getLimits: function () {
            var authToken = authService.GetToken();
            return $http({
                method: 'GET',
                url: 'http://limithandler.app.veery.cloud/DVP/API/1.0.0.0/LimitAPI/Limit/Info',
                headers: {
                    'authorization': authToken
                }})
                .then(function(response){
                    return response;
                });
        },
        saveNewLimit: function (limitInfo) {
            var authToken = authService.GetToken();
            return $http({
                method: 'POST',
                url: 'http://limithandler.app.veery.cloud/DVP/API/1.0.0.0/LimitAPI/Limit',
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
            var authToken = authService.GetToken();
            return $http({
                method: 'PUT',
                url: 'http://limithandler.app.veery.cloud/DVP/API/1.0.0.0/LimitAPI/Limit/'+limitId+'/Max/'+maxLimit,
                headers: {
                    'authorization': authToken
                }
            })
                .then(function(response){
                    return response;
                });
        },
        setLimitStatus: function (limitId,status) {
            var authToken = authService.GetToken();
            return $http({
                method: 'PUT',
                url: 'http://limithandler.app.veery.cloud/DVP/API/1.0.0.0/LimitAPI/Limit/'+limitId+'/Activate/'+status,
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