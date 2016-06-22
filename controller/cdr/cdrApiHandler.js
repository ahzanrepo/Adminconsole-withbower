/**
 * Created by dinusha on 5/29/2016.
 */

(function() {

    var cdrApiHandler = function($http, authService)
    {
        var getCDRForTimeRange = function(startDate, endDate, limit, offsetId)
        {
            var authToken = authService.GetToken();
            var url = 'http://cdrprocessor.104.131.67.21.xip.io/DVP/API/1.0.0.0/CallCDR/GetCallDetailsByRange?startTime=' + startDate + '&endTime=' + endDate + '&limit=' + limit;

            if(offsetId)
            {
                url = url + '&offset=' + offsetId;
            }

            return $http({
                method: 'GET',
                url: url,
                headers: {
                    'authorization': authToken
                }
            }).then(function(resp)
            {
                return resp.data;
            })
        };

        var getAbandonCDRForTimeRange = function(startDate, endDate, limit, offsetId)
        {
            var authToken = authService.GetToken();
            var url = 'http://cdrprocessor.104.131.67.21.xip.io/DVP/API/1.0.0.0/CallCDR/GetAbandonCallDetailsByRange?startTime=' + startDate + '&endTime=' + endDate + '&limit=' + limit;

            if(offsetId)
            {
                url = url + '&offset=' + offsetId;
            }

            return $http({
                method: 'GET',
                url: url,
                headers: {
                    'authorization': authToken
                }
            }).then(function(resp)
            {
                return resp.data;
            })
        };

        return {
            getCDRForTimeRange: getCDRForTimeRange,
            getAbandonCDRForTimeRange: getAbandonCDRForTimeRange
        };
    };

    var module = angular.module("veeryConsoleApp");
    module.factory("cdrApiHandler", cdrApiHandler);

}());
