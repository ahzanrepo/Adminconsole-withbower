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

        var addTicketToCase = function(caseId, ticketId){
            return $http({
                method: 'PUT',
                url: baseUrls.ticketUrl+'Case/'+caseId+'/RelatedTicket/'+ticketId,
                headers: {
                    'Content-Type': 'application/json'
                }
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

        return{
            createCaseConfiguration: createCaseConfiguration,
            deleteCaseConfiguration: deleteCaseConfiguration,
            getCaseConfigurations: getCaseConfigurations,
            createCase: createCase,
            getCases: getCases,
            addTicketToCase: addTicketToCase,
            deleteCase: deleteCase
        };
    };

    var module = angular.module('veeryConsoleApp');
    module.factory('caseApiAccess', caseApiAccess);

}());