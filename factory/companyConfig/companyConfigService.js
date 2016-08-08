/**
 * Created by Pawan on 8/1/2016.
 */

/**
 * Created by Pawan on 6/8/2016.
 */

mainApp.factory('companyConfigBackendService', function ($http, authService)
{
    return {

        getCloudEndUser: function () {
            var authToken = authService.GetToken();
            return $http({
                method: 'GET',
                url: "http://clusterconfig.app.veery.cloud/DVP/API/1.0.0.0/CloudConfiguration/CloudEndUsers",
                headers: {
                    'authorization':authToken
                }
            }).then(function(response)
            {
                return response;
            });
        },

        saveNewEndUser: function (resource) {
            var authToken = authService.GetToken();

            return $http({
                method: 'POST',
                url: "http://clusterconfig.app.veery.cloud/DVP/API/1.0.0.0/CloudConfiguration/CloudEndUser",
                headers: {
                    'authorization':authToken
                },
                data:resource

            }).then(function(response)
            {
                return response;
            });
        },

        updateEndUser: function (resource) {
            var authToken = authService.GetToken();

            return $http({
                method: 'PUT',
                url: "http://clusterconfig.app.veery.cloud/DVP/API/1.0.0.0/CloudConfiguration/CloudEndUser/"+resource.id,
                headers: {
                    'authorization':authToken
                },
                data:resource

            }).then(function(response)
            {
                return response;
            });
        },
        getClusters: function () {
            var authToken = authService.GetToken();
            return $http({
                method: 'GET',
                url: "http://clusterconfig.app.veery.cloud/DVP/API/1.0.0.0/CloudConfiguration/Clouds",
                headers: {
                    'authorization':authToken
                }
            }).then(function(response)
            {
                return response;
            });
        },
        getContexts: function () {
            var authToken = authService.GetToken();
            return $http({
                method: 'GET',
                url: "http://sipuserendpointservice.app.veery.cloud/DVP/API/1.0.0.0/SipUser/Contexts",
                headers: {
                    'authorization':authToken
                }
            }).then(function(response)
            {
                return response;
            });
        },
        saveNewContext: function (resource) {
            var authToken = authService.GetToken();

            return $http({
                method: 'POST',
                url: "http://sipuserendpointservice.app.veery.cloud/DVP/API/1.0.0.0/SipUser/Context",
                headers: {
                    'authorization':authToken
                },
                data:resource

            }).then(function(response)
            {
                return response;
            });
        },
        deleteContext: function (resource) {
            var authToken = authService.GetToken();

            return $http({
                method: 'DELETE',
                url: "http://sipuserendpointservice.app.veery.cloud/DVP/API/1.0.0.0/SipUser/Context/"+resource.Context,
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