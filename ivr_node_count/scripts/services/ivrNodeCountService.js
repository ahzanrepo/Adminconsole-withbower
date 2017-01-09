/**
 * Created by Rajinda on 12/31/2015.
 */

mainApp.factory("ivrNodeCountService", function ($http, download,authService,baseUrls) {

    var getApplicationList = function () {
        return $http({
            method: 'GET',
            url: baseUrls.appregistryServiceUrl+ "APPRegistry/Applications"
        }).then(function (response) {
            if (response.data && response.data.IsSuccess) {
                return response.data.Result;
            } else {
                return undefined;
            }
        });
    };

    var getIvrNodeCount = function (appId,startDate,endDate) {
        return $http({
            method: 'GET',
            url: baseUrls.eventserviceUrl+ "EventService/Events/App/"+appId+"/Type/COMMAND/NodeCount?start="+startDate+"&end="+endDate
        }).then(function (response) {
            if (response.data && response.data.IsSuccess) {
                return response.data.Result;
            } else {
                return undefined;
            }
        });
    };



  return {
      GetApplicationList: getApplicationList,
      GetIvrNodeCount:getIvrNodeCount
  }

});

