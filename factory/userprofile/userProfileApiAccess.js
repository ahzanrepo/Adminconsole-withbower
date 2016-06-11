/**
 * Created by dinusha on 6/11/2016.
 */

(function() {

    var userProfileApiAccess = function($http)
    {
        var authToken = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkaW51c2hhZGNrIiwianRpIjoiMjViZjZmZTItZjZjNC00ZWJhLWFmODgtNmMxNjIxOTU4OGRiIiwic3ViIjoiNTZhOWU3NTlmYjA3MTkwN2EwMDAwMDAxMjVkOWU4MGI1YzdjNGY5ODQ2NmY5MjExNzk2ZWJmNDMiLCJleHAiOjE4OTI0NDE2NzIsInRlbmFudCI6MSwiY29tcGFueSI6Mywic2NvcGUiOlt7InJlc291cmNlIjoiYWxsIiwiYWN0aW9ucyI6ImFsbCJ9XSwiaWF0IjoxNDYwNDM4MDcyfQ.aPoVPiTtoGFgnKmhdLBTzwTrQRTGWWliYujHP5NONqU';
        var getProfileByName = function(user)
        {
            return $http({
                method: 'GET',
                url: 'http://localhost:3636/DVP/API/1.0.0.0/User/' + user + '/profile',
                headers: {
                    'authorization': authToken
                }
            }).then(function(resp)
            {
                return resp.data;
            })
        };

        return {
            getProfileByName: getProfileByName
        };
    };

    var module = angular.module("veeryConsoleApp");
    module.factory("userProfileApiAccess", userProfileApiAccess);

}());
