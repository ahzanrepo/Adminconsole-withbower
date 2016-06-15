/**
 * Created by Pawan on 6/15/2016.
 */

mainApp.factory('queueSummaryBackendService', function ($http) {
    var authToken = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkaW51c2hhZGNrIiwianRpIjoiMjViZjZmZTItZjZjNC00ZWJhLWFmODgtNmMxNjIxOTU4OGRiIiwic3ViIjoiNTZhOWU3NTlmYjA3MTkwN2EwMDAwMDAxMjVkOWU4MGI1YzdjNGY5ODQ2NmY5MjExNzk2ZWJmNDMiLCJleHAiOjE4OTI0NDE2NzIsInRlbmFudCI6MSwiY29tcGFueSI6Mywic2NvcGUiOlt7InJlc291cmNlIjoiYWxsIiwiYWN0aW9ucyI6ImFsbCJ9XSwiaWF0IjoxNDYwNDM4MDcyfQ.aPoVPiTtoGFgnKmhdLBTzwTrQRTGWWliYujHP5NONqU';
    return {

        getQueueSummary: function (fromDate,toDate) {
            return $http({
                method: 'GET',
                url: "http://ardsmonitoring.104.131.67.21.xip.io/DVP/API/1.0.0.0/ARDS/MONITORING/QUEUE/Summary/from/"+fromDate+"/to/"+toDate,
                headers: {
                    'authorization':authToken
                }
            }).then(function(response)
            {
                return response;
            });
        }


    }
});