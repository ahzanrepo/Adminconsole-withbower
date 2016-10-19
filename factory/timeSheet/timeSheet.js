/**
 * Created by Heshan.i on 9/29/2016.
 */

(function(){
    var timerServiceAccess = function($http, authService){
        var getTimersByUser = function(userId, from, to){
            var authToken = authService.GetToken();
            return $http({
                method: 'GET',
                url: 'http://liteticket.app.veery.cloud/DVP/API/1.0.0.0/Timers/User/'+userId+'?from='+from+'&to='+to,
                headers: {
                    'authorization': authToken
                }
            }).then(function(response){
                return response.data;
            });
        };

        return{
            getTimersByUser: getTimersByUser
        };
    };

    var module = angular.module('veeryConsoleApp');
    module.factory('timerServiceAccess', timerServiceAccess);

}());