/**
 * Created by Pawan on 6/15/2016.
 */

mainApp.factory('queueSummaryBackendService', function ($http, authService) {

    return {

        getQueueSummary: function (fromDate,toDate) {
            var authToken = authService.GetToken();
            return $http({
                method: 'GET',
                url: "http://ardsmonitoring.app.veery.cloud/DVP/API/1.0.0.0/ARDS/MONITORING/QUEUE/Summary/from/"+fromDate+"/to/"+toDate,
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