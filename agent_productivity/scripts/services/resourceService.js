/**
 * Created by Rajinda on 12/31/2015.
 */

var clusterModule = angular.module("resourceServiceModule", []);

clusterModule.factory("resourceService", function ($http, $log,authService,resourceServiceBaseUrl,ardsmonitoringBaseUrl) {

 var getProductivity = function () {

    return $http.get(resourceServiceBaseUrl+ "Resources/Productivity",
      {
        headers:{authorization:authService.Token}
      }).then(function (response) {
        if (response.data && response.data.IsSuccess) {
          return response.data.Result;
        } else {
          return {};
        }
      });
  };

    var getOnlineAgents = function () {

        return $http.get(ardsmonitoringBaseUrl+ "MONITORING/resources",
            {
                headers:{authorization:authService.Token}
            }).then(function (response) {
                if (response.data && response.data.IsSuccess) {
                    return response.data.Result;
                } else {
                    return {};
                }
            });
    };

  return {
    GetProductivity: getProductivity,
      GetOnlineAgents:getOnlineAgents

  }

});
