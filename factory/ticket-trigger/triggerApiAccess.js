/**
 * Created by Heshan.i on 8/12/2016.
 */

(function(){
    var triggerApiAccess = function($http, authService){
//create ticket trigger
        var createTrigger = function(trigger){
            var authToken = authService.GetToken();
            return $http({
                method: 'POST',
                url: 'http://liteticket.app.veery.cloud/DVP/API/1.0.0.0/Trigger',
                headers: {
                    'authorization': authToken,
                    'Content-Type': 'application/json'
                },
                data: trigger
            }).then(function(response){
                    return response.data;
            });
        };

        var updateTrigger = function(trigger){
            var authToken = authService.GetToken();
            return $http({
                method: 'PUT',
                url: 'http://liteticket.app.veery.cloud/DVP/API/1.0.0.0/Trigger',
                headers: {
                    'authorization': authToken,
                    'Content-Type': 'application/json'
                },
                data: trigger
            }).then(function(response){
                return response.data;
            });
        };

        var getTriggers = function(){
            var authToken = authService.GetToken();
            return $http({
                method: 'GET',
                url: 'http://localhost:3636/DVP/API/1.0.0.0/Triggers',
                headers: {
                    'authorization': authToken
                }
            }).then(function(response){
                return response.data;
            });
        };

        var getTrigger = function(triggerId){
            var authToken = authService.GetToken();
            return $http({
                method: 'GET',
                url: 'http://liteticket.app.veery.cloud/DVP/API/1.0.0.0/Trigger/'+triggerId,
                headers: {
                    'authorization': authToken,
                    'Content-Type': 'application/json'
                }
            }).then(function(response){
                return response.data;
            });
        };

        var deleteTrigger = function(triggerId){
            var authToken = authService.GetToken();
            return $http({
                method: 'DELETE',
                url: 'http://liteticket.app.veery.cloud/DVP/API/1.0.0.0/Trigger/'+triggerId,
                headers: {
                    'authorization': authToken,
                    'Content-Type': 'application/json'
                }
            }).then(function(response){
                return response.data;
            });
        };

        var addFilterAll = function(triggerId, filterAll){
            var authToken = authService.GetToken();
            return $http({
                method: 'PUT',
                url: 'http://liteticket.app.veery.cloud/DVP/API/1.0.0.0/Trigger/'+triggerId+'/Filter/All',
                headers: {
                    'authorization': authToken,
                    'Content-Type': 'application/json'
                },
                data: filterAll
            }).then(function(response){
                return response.data;
            });
        };

        var getFiltersAll = function(triggerId){
            var authToken = authService.GetToken();
            return $http({
                method: 'GET',
                url: 'http://liteticket.app.veery.cloud/DVP/API/1.0.0.0/Trigger/'+triggerId+'/Filters/All',
                headers: {
                    'authorization': authToken,
                    'Content-Type': 'application/json'
                }
            }).then(function(response){
                return response.data;
            });
        };

        var removeFilterAll = function(triggerId, filterId){
            var authToken = authService.GetToken();
            return $http({
                method: 'DELETE',
                url: 'http://liteticket.app.veery.cloud/DVP/API/1.0.0.0/Trigger/'+triggerId+'/Filter/All/'+filterId,
                headers: {
                    'authorization': authToken,
                    'Content-Type': 'application/json'
                }
            }).then(function(response){
                return response.data;
            });
        };

        var addFilterAny = function(triggerId, filterAny){
            var authToken = authService.GetToken();
            return $http({
                method: 'PUT',
                url: 'http://liteticket.app.veery.cloud/DVP/API/1.0.0.0/Trigger/'+triggerId+'/Filter/Any',
                headers: {
                    'authorization': authToken,
                    'Content-Type': 'application/json'
                },
                data: filterAny
            }).then(function(response){
                return response.data;
            });
        };

        var getFiltersAny = function(triggerId){
            var authToken = authService.GetToken();
            return $http({
                method: 'GET',
                url: 'http://liteticket.app.veery.cloud/DVP/API/1.0.0.0/Trigger/'+triggerId+'/Filters/Any',
                headers: {
                    'authorization': authToken,
                    'Content-Type': 'application/json'
                }
            }).then(function(response){
                return response.data;
            });
        };

        var removeFilterAny = function(triggerId, filterId){
            var authToken = authService.GetToken();
            return $http({
                method: 'DELETE',
                url: 'http://liteticket.app.veery.cloud/DVP/API/1.0.0.0/Trigger/'+triggerId+'/Filter/Any/'+filterId,
                headers: {
                    'authorization': authToken,
                    'Content-Type': 'application/json'
                }
            }).then(function(response){
                return response.data;
            });
        };

        var addAction = function(triggerId, action){
            var authToken = authService.GetToken();
            return $http({
                method: 'PUT',
                url: 'http://liteticket.app.veery.cloud/DVP/API/1.0.0.0/Trigger/'+triggerId+'/Action',
                headers: {
                    'authorization': authToken,
                    'Content-Type': 'application/json'
                },
                data: action
            }).then(function(response){
                return response.data;
            });
        };

        var getActions = function(triggerId){
            var authToken = authService.GetToken();
            return $http({
                method: 'GET',
                url: 'http://liteticket.app.veery.cloud/DVP/API/1.0.0.0/Trigger/'+triggerId+'/Actions',
                headers: {
                    'authorization': authToken,
                    'Content-Type': 'application/json'
                }
            }).then(function(response){
                return response.data;
            });
        };

        var removeAction = function(triggerId, actionId){
            var authToken = authService.GetToken();
            return $http({
                method: 'DELETE',
                url: 'http://liteticket.app.veery.cloud/DVP/API/1.0.0.0/Trigger/'+triggerId+'/Action/'+actionId,
                headers: {
                    'authorization': authToken,
                    'Content-Type': 'application/json'
                }
            }).then(function(response){
                return response.data;
            });
        };

        var addOperations = function(triggerId, operation){
            var authToken = authService.GetToken();
            return $http({
                method: 'PUT',
                url: 'http://liteticket.app.veery.cloud/DVP/API/1.0.0.0/Trigger/'+triggerId+'/Operation',
                headers: {
                    'authorization': authToken,
                    'Content-Type': 'application/json'
                },
                data: operation
            }).then(function(response){
                return response.data;
            });
        };

        var getOperations = function(triggerId){
            var authToken = authService.GetToken();
            return $http({
                method: 'GET',
                url: 'http://liteticket.app.veery.cloud/DVP/API/1.0.0.0/Trigger/'+triggerId+'/Operations',
                headers: {
                    'authorization': authToken,
                    'Content-Type': 'application/json'
                }
            }).then(function(response){
                return response.data;
            });
        };

        var removeOperations = function(triggerId, operationId){
            var authToken = authService.GetToken();
            return $http({
                method: 'DELETE',
                url: 'http://liteticket.app.veery.cloud/DVP/API/1.0.0.0/Trigger/'+triggerId+'/Operation/'+operationId,
                headers: {
                    'authorization': authToken,
                    'Content-Type': 'application/json'
                }
            }).then(function(response){
                return response.data;
            });
        };

        return{
            createTrigger: createTrigger,
            updateTrigger: updateTrigger,
            getTriggers: getTriggers,
            getTrigger: getTrigger,
            deleteTrigger: deleteTrigger,
            addFilterAll: addFilterAll,
            getFiltersAll: getFiltersAll,
            removeFilterAll: removeFilterAll,
            addFilterAny: addFilterAny,
            getFiltersAny: getFiltersAny,
            removeFilterAny: removeFilterAny,
            addAction: addAction,
            getActions: getActions,
            removeAction: removeAction,
            addOperations: addOperations,
            getOperations: getOperations,
            removeOperations: removeOperations
        };
    };

    var module = angular.module('veeryConsoleApp');
    module.factory('triggerApiAccess', triggerApiAccess);
}());