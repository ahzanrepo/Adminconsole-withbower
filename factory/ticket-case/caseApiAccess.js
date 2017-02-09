/**
 * Created by Heshan.i on 10/19/2016.
 */

(function(){

    var caseApiAccess = function($http, baseUrls) {

        //----------------------------------Case Configuration----------------------------------------------------------------------

        var createCaseConfiguration = function(caseConfigInfo){
            return $http({
                method: 'POST',
                url: baseUrls.ticketUrl+'CaseConfiguration',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: caseConfigInfo
            }).then(function(response){
                return response.data;
            });
        };

        var deleteCaseConfiguration = function(caseConfigId){
            return $http({
                method: 'DELETE',
                url: baseUrls.ticketUrl+'CaseConfiguration/'+caseConfigId,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function(response){
                return response.data;
            });
        };

        var getCaseConfigurations = function(){
            return $http({
                method: 'GET',
                url: baseUrls.ticketUrl+'CaseConfiguration',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function(response){
                return response.data;
            });
        };

        //----------------------------------Case----------------------------------------------------------------------

        var createCase = function(caseInfo){
            return $http({
                method: 'POST',
                url: baseUrls.ticketUrl+'Case',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: caseInfo
            }).then(function(response){
                return response.data;
            });
        };

        var getCases = function(){
            return $http({
                method: 'GET',
                url: baseUrls.ticketUrl+'Cases',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function(response){
                return response.data;
            });
        };

        var getCase = function(caseId){
            return $http({
                method: 'GET',
                url: baseUrls.ticketUrl+'Case/'+caseId,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function(response){
                return response.data;
            });
        };

        var getTicketsForCase = function(tIds){
            return $http({
                method: 'GET',
                url: baseUrls.ticketUrl+'TicketsByIds',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {ids: tIds}
            }).then(function(response){
                return response.data;
            });
        };

        var addTicketToCase = function(caseId, ticketIds){
            return $http({
                method: 'PUT',
                url: baseUrls.ticketUrl+'Case/'+caseId+'/RelatedTickets',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    "ticketid": ticketIds
                }
            }).then(function(response){
                return response.data;
            });
        };

        var removeTicketFromCase = function(caseId, ticketIds){
            return $http({
                method: 'DELETE',
                url: baseUrls.ticketUrl+'Case/'+caseId+'/RelatedTickets',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    "ticketid": ticketIds
                }
            }).then(function(response){
                return response.data;
            });
        };

        var bulkStatusChangeTickets = function(ticketIds, bulkAction){
            var sendObj = {TicketIds: ticketIds, Status: bulkAction.action, specificOperations: bulkAction.specificOperations};
            return $http({
                method: 'PUT',
                url: baseUrls.ticketUrl+'Ticket/Status/Bulk',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: sendObj
            }).then(function(response){
                return response.data;
            });
        };

        var deleteCase = function(caseId){
            return $http({
                method: 'DELETE',
                url: baseUrls.ticketUrl+'Case/'+caseId,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function(response){
                return response.data;
            });
        };

        var getAllTags = function () {
            return $http({
                method: 'GET',
                url: baseUrls.ticketUrl+"Tags"
            }).then(function (response) {
                if (response.data && response.data.IsSuccess) {
                    return response.data.Result;
                } else {
                    return undefined;
                }
            });
        };

        var getTagCategories = function () {
            return $http({
                method: 'GET',
                url: baseUrls.ticketUrl+"TagCategories"
            }).then(function (response) {
                if (response.data && response.data.IsSuccess) {
                    return response.data.Result;
                } else {
                    return undefined;
                }
            });
        };

        var getStatusFlowTypes = function () {
            return $http({
                method: 'GET',
                url: baseUrls.ticketUrl+"TagCategories"
            }).then(function (response) {
                if (response.data && response.data.IsSuccess) {
                    return response.data.Result;
                } else {
                    return undefined;
                }
            });
        };

        return{
            createCaseConfiguration: createCaseConfiguration,
            deleteCaseConfiguration: deleteCaseConfiguration,
            getCaseConfigurations: getCaseConfigurations,
            createCase: createCase,
            getCases: getCases,
            getCase: getCase,
            getTicketsForCase: getTicketsForCase,
            addTicketToCase: addTicketToCase,
            removeTicketFromCase: removeTicketFromCase,
            bulkStatusChangeTickets: bulkStatusChangeTickets,
            deleteCase: deleteCase,
            getAllTags: getAllTags,
            getTagCategories:getTagCategories
        };
    };

    var module = angular.module('veeryConsoleApp');
    module.factory('caseApiAccess', caseApiAccess);

}());