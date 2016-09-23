/**
 * Created by Heshan.i on 9/14/2016.
 */

(function(){
    var slaApiAccess = function($http, authService){
//create ticket trigger
        var createSla = function(sla){
            var authToken = authService.GetToken();
            return $http({
                method: 'POST',
                url: 'http://liteticket.app.veery.cloud/DVP/API/1.0.0.0/SLA',
                headers: {
                    'authorization': authToken,
                    'Content-Type': 'application/json'
                },
                data: sla
            }).then(function(response){
                return response.data;
            });
        };

        var updateSla = function(sla){
            var authToken = authService.GetToken();
            return $http({
                method: 'PUT',
                url: 'http://liteticket.app.veery.cloud/DVP/API/1.0.0.0/SLA/'+sla._id,
                headers: {
                    'authorization': authToken,
                    'Content-Type': 'application/json'
                },
                data: sla
            }).then(function(response){
                return response.data;
            });
        };

        var getAllSla = function(){
            var authToken = authService.GetToken();
            return $http({
                method: 'GET',
                url: 'http://liteticket.app.veery.cloud/DVP/API/1.0.0.0/SLAs',
                headers: {
                    'authorization': authToken
                }
            }).then(function(response){
                return response.data;
            });
        };

        var getSla = function(slaId){
            var authToken = authService.GetToken();
            return $http({
                method: 'GET',
                url: 'http://liteticket.app.veery.cloud/DVP/API/1.0.0.0/SLA/'+slaId,
                headers: {
                    'authorization': authToken,
                    'Content-Type': 'application/json'
                }
            }).then(function(response){
                return response.data;
            });
        };

        var deleteSla = function(slaId){
            var authToken = authService.GetToken();
            return $http({
                method: 'DELETE',
                url: 'http://liteticket.app.veery.cloud/DVP/API/1.0.0.0/SLA/'+slaId,
                headers: {
                    'authorization': authToken,
                    'Content-Type': 'application/json'
                }
            }).then(function(response){
                return response.data;
            });
        };

        var addFilterAll = function(slaId, filterAll){
            var authToken = authService.GetToken();
            return $http({
                method: 'PUT',
                url: 'http://liteticket.app.veery.cloud/DVP/API/1.0.0.0/SLA/'+slaId+'/Filter/All',
                headers: {
                    'authorization': authToken,
                    'Content-Type': 'application/json'
                },
                data: filterAll
            }).then(function(response){
                return response.data;
            });
        };

        var getFiltersAll = function(slaId){
            var authToken = authService.GetToken();
            return $http({
                method: 'GET',
                url: 'http://liteticket.app.veery.cloud/DVP/API/1.0.0.0/SLA/'+slaId+'/Filters/All',
                headers: {
                    'authorization': authToken,
                    'Content-Type': 'application/json'
                }
            }).then(function(response){
                return response.data;
            });
        };

        var removeFilterAll = function(slaId, filterId){
            var authToken = authService.GetToken();
            return $http({
                method: 'DELETE',
                url: 'http://liteticket.app.veery.cloud/DVP/API/1.0.0.0/SLA/'+slaId+'/Filter/All/'+filterId,
                headers: {
                    'authorization': authToken,
                    'Content-Type': 'application/json'
                }
            }).then(function(response){
                return response.data;
            });
        };

        var addFilterAny = function(slaId, filterAny){
            var authToken = authService.GetToken();
            return $http({
                method: 'PUT',
                url: 'http://liteticket.app.veery.cloud/DVP/API/1.0.0.0/SLA/'+slaId+'/Filter/Any',
                headers: {
                    'authorization': authToken,
                    'Content-Type': 'application/json'
                },
                data: filterAny
            }).then(function(response){
                return response.data;
            });
        };

        var getFiltersAny = function(slaId){
            var authToken = authService.GetToken();
            return $http({
                method: 'GET',
                url: 'http://liteticket.app.veery.cloud/DVP/API/1.0.0.0/SLA/'+slaId+'/Filters/Any',
                headers: {
                    'authorization': authToken,
                    'Content-Type': 'application/json'
                }
            }).then(function(response){
                return response.data;
            });
        };

        var removeFilterAny = function(slaId, filterId){
            var authToken = authService.GetToken();
            return $http({
                method: 'DELETE',
                url: 'http://liteticket.app.veery.cloud/DVP/API/1.0.0.0/SLA/'+slaId+'/Filter/Any/'+filterId,
                headers: {
                    'authorization': authToken,
                    'Content-Type': 'application/json'
                }
            }).then(function(response){
                return response.data;
            });
        };

        var addMatrix = function(slaId, matrix){
            var authToken = authService.GetToken();
            return $http({
                method: 'PUT',
                url: 'http://liteticket.app.veery.cloud/DVP/API/1.0.0.0/SLA/'+slaId+'/Matrix',
                headers: {
                    'authorization': authToken,
                    'Content-Type': 'application/json'
                },
                data: matrix
            }).then(function(response){
                return response.data;
            });
        };

        var getMatrices = function(slaId){
            var authToken = authService.GetToken();
            return $http({
                method: 'GET',
                url: 'http://liteticket.app.veery.cloud/DVP/API/1.0.0.0/SLA/'+slaId+'/Matrixs',
                headers: {
                    'authorization': authToken,
                    'Content-Type': 'application/json'
                }
            }).then(function(response){
                return response.data;
            });
        };

        var removeMatrix = function(slaId, matrixId){
            var authToken = authService.GetToken();
            return $http({
                method: 'DELETE',
                url: 'http://liteticket.app.veery.cloud/DVP/API/1.0.0.0/SLA/'+slaId+'/Matrix/'+matrixId,
                headers: {
                    'authorization': authToken,
                    'Content-Type': 'application/json'
                }
            }).then(function(response){
                return response.data;
            });
        };

        return{
            createSla: createSla,
            updateSla: updateSla,
            getAllSla: getAllSla,
            getSla: getSla,
            deleteSla: deleteSla,
            addFilterAll: addFilterAll,
            getFiltersAll: getFiltersAll,
            removeFilterAll: removeFilterAll,
            addFilterAny: addFilterAny,
            getFiltersAny: getFiltersAny,
            removeFilterAny: removeFilterAny,
            addMatrix: addMatrix,
            getMatrices: getMatrices,
            removeMatrix: removeMatrix
        };
    };

    var module = angular.module('veeryConsoleApp');
    module.factory('slaApiAccess', slaApiAccess);
}());