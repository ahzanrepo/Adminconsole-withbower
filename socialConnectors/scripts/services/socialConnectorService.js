/**
 * Created by Rajinda on 10/11/2016.
 */

mainApp.factory("socialConnectorService", function ($http,authService,baseUrls) {

    var addFacebookPageToSystem = function (postData) {
        return $http({
            method: 'POST',
            url: baseUrls.socialConnectorUrl+"Facebook",
            headers: {
                'authorization': authService.GetToken()
            },
            data:postData
        }).then(function (response) {
            if (response.data && response.data.IsSuccess) {
                return response.data.Result;
            } else {
                return false;
            }
        });
    };

    return {
        AddFacebookPageToSystem:addFacebookPageToSystem
    }

});

