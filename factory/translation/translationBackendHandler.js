/**
 * Created by Pawan on 8/5/2016.
 */

mainApp.factory('transBackendService', function ($http, authService)
{
    return {

        getTranslations: function () {
            var authToken = authService.GetToken();
            return $http({
                method: 'GET',
                url: "http://ruleservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/CallRuleApi/Translations",
                headers: {
                    'authorization':authToken
                }
            }).then(function(response)
            {
                return response;
            });
        },

        saveTranslations: function (resource) {
            var authToken = authService.GetToken();

            return $http({
                method: 'POST',
                url: "http://ruleservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/CallRuleApi/Translation",
                headers: {
                    'authorization':authToken
                },
                data:resource

            }).then(function(response)
            {
                return response;
            });
        },

        deleteTranslation: function (translation) {
            var authToken = authService.GetToken();

            return $http({
                method: 'POST',
                url: "http://ruleservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/CallRuleApi/Translation/"+translation.id,
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