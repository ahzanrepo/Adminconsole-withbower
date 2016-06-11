/**
 * Created by Rajinda on 12/31/2015.
 */

mainApp.factory("appAccessManageService", function ($http, $log,authService,baseUrls) {

 var getUserList = function () {

    return $http.get(baseUrls.UserServiceBaseUrl+ "Users",
      {
        headers:{authorization:authService.GloableToken}
      }).then(function (response) {
        if (response.data && response.data.IsSuccess) {
          return response.data.Result;
        } else {
          return {};
        }
      });
  };

    var getOnlineAgents = function () {

        return $http.get(baseUrls.ardsmonitoringBaseUrl+ "MONITORING/resources",
            {
                headers:{authorization:authService.GloableToken}
            }).then(function (response) {
                if (response.data && response.data.IsSuccess) {
                    return response.data.Result;
                } else {
                    return {};
                }
            });
    };

  return {
      GetUserList: getUserList,
      GetOnlineAgents:getOnlineAgents

  }

});
