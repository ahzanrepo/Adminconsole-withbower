/**
 * Created by Waruna on 7/3/2017.
 * */

mainApp.factory('integrationConfigService', function ($http, authService,baseUrls) {
    return {

        getCloudEndUser: function () {
            return $http({
                method: 'GET',
                url:baseUrls.clusterconfigUrl +"CloudEndUsers"
            }).then(function(response)
            {
                return response;
            });
        },

        saveNewEndUser: function (resource) {
            

            return $http({
                method: 'POST',
                url: baseUrls.clusterconfigUrl +"CloudEndUser",
                data:resource

            }).then(function(response)
            {
                return response;
            });
        }
    }
});