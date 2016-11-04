/**
 * Created by Pawan on 8/1/2016.
 * */



mainApp.factory('companyConfigBackendService', function ($http, authService,baseUrls)
{
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
        },

        updateEndUser: function (resource) {
            

            return $http({
                method: 'PUT',
                url: baseUrls.clusterconfigUrl +"CloudEndUser/"+resource.id,
                data:resource

            }).then(function(response)
            {
                return response;
            });
        },
        getClusters: function () {
            
            return $http({
                method: 'GET',
                url: baseUrls.clusterconfigUrl +"Clouds"
            }).then(function(response)
            {
                return response;
            });
        },
        getContexts: function () {
            
            return $http({
                method: 'GET',
                url: baseUrls.sipUserendpoint +"Contexts"
            }).then(function(response)
            {
                return response;
            });
        },
        saveNewContext: function (resource) {
            

            return $http({
                method: 'POST',
                url: baseUrls.sipUserendpoint +"Context",
                data:resource

            }).then(function(response)
            {
                return response;
            });
        },
        deleteContext: function (resource) {
            

            return $http({
                method: 'DELETE',
                url: baseUrls.sipUserendpoint +"Context/"+resource.Context

            }).then(function(response)
            {
                return response;
            });
        }

    }
});