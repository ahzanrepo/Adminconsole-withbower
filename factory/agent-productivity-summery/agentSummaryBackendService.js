/**
 * Created by Pawan on 6/15/2016.
 */

mainApp.factory('agentSummaryBackendService', function ($http, baseUrls) {

    return {

        getAgentSummary: function (fromDate,toDate,resourceId) {

            var urlTemp = baseUrls.resourceServiceBaseUrl+ "Resources/Productivity/Summary/from/"+fromDate+"/to/"+toDate;

            if(resourceId)
            {
                urlTemp = baseUrls.resourceServiceBaseUrl+ "Resources/Productivity/Summary/from/"+fromDate+"/to/"+toDate+"?resourceId=" + resourceId;
            }
            return $http({
                method: 'GET',
                url: urlTemp
            }).then(function(response)
            {
                return response;
            });
        },
        getAgentDetails: function () {
            return $http({
                method: 'GET',
                url: baseUrls.resourceServiceBaseUrl+ "Resources"
            }).then(function(response)
            {
                return response;
            });
        }


    }
});