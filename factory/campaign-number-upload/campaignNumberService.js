/**
 * Created by Heshan.i on 2/11/2017.
 */

(function(){

    var campaignNumberApiAccess = function($http, $q, baseUrls){

        //----------------Number Category-------------------------------------------

        var createNumberCategory = function(categoryData){
            return $http({
                method: 'POST',
                url: baseUrls.campaignmanagerUrl+'CampaignCategory',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: categoryData
            }).then(function(response){
                return response.data;
            });
        };

        var changeNumberCategoryName = function(categoryData){
            return $http({
                method: 'PUT',
                url: baseUrls.campaignmanagerUrl+'Campaign/Numbers/Category/'+ categoryData.CategoryID,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: categoryData
            }).then(function(response){
                return response.data;
            });
        };

        var getNumberCategories = function(){
            return $http({
                method: 'GET',
                url: baseUrls.campaignmanagerUrl+'CampaignCategorys',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function(response){
                return response.data;
            });
        };

        var getNumbersByCategory = function(categoryId){
            return $http({
                method: 'GET',
                url: baseUrls.campaignmanagerUrl+'Campaign/Numbers/Category/'+categoryId,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function(response){
                return response.data;
            });
        };


        //----------------Number Upload-------------------------------------------

        var uploadNumbers = function(numberData){



            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: baseUrls.campaignmanagerUrl+'CampaignNumbers',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: numberData
            }).then(function(response){

                deferred.resolve(response.data)
            });

            return deferred.promise;
        };

        var deleteNumbersFromCampaign = function(campaignId, numberData){
            return $http({
                method: 'DELETE',
                url: baseUrls.campaignmanagerUrl+'Campaign/'+campaignId+'/Numbers',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: numberData
            }).then(function(response){
                return response.data;
            });
        };

        var getAllNumbers = function(){
            return $http({
                method: 'GET',
                url: baseUrls.campaignmanagerUrl+'Campaign/Numbers/all',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function(response){
                return response.data;
            });
        };

        var getNumbersByCampaign = function(campaignId){
            return $http({
                method: 'GET',
                url: baseUrls.campaignmanagerUrl+'Campaign/'+campaignId+'/Numbers',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function(response){
                return response.data;
            });
        };


        //----------------Campaign-------------------------------------------

        var getNewlyCreatedCampaigns = function(){
            return $http({
                method: 'GET',
                url: baseUrls.campaignmanagerUrl+'Campaigns/State/create/500',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function(response){
                return response.data;
            });
        };



        //----------------Campaign Schedule-------------------------------------------

        var getCampaignSchedule = function(campaignId){
            return $http({
                method: 'GET',
                url: baseUrls.campaignmanagerUrl+'Campaign/'+campaignId+'/Schedule',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function(response){
                return response.data;
            });
        };



        //----------------Dnc List-------------------------------------------

        var addNumbersToDnc = function(dncNumbers){
            return $http({
                method: 'POST',
                url: baseUrls.campaignmanagerUrl+'Dnc',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: dncNumbers
            }).then(function(response){
               return response.data;
            });
        };

        var deleteNumbersFromDnc = function(dncNumbers){
            return $http({
                method: 'DELETE',
                url: baseUrls.campaignmanagerUrl+'Dnc',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: dncNumbers
            }).then(function(response){
               return response.data;
            });
        };

        var getDncNumbers = function(){
            return $http({
                method: 'GET',
                url: baseUrls.campaignmanagerUrl+'Dnc',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function(response){
                return response.data;
            });
        };


        return{
            CreateNumberCategory: createNumberCategory,
            ChangeNumberCategoryName: changeNumberCategoryName,
            GetNumberCategories: getNumberCategories,
            GetNumbersByCategory: getNumbersByCategory,
            UploadNumbers: uploadNumbers,
            DeleteNumbersFromCampaign: deleteNumbersFromCampaign,
            GetAllNumbers: getAllNumbers,
            GetNumbersByCampaign: getNumbersByCampaign,
            GetNewlyCreatedCampaigns: getNewlyCreatedCampaigns,
            GetCampaignSchedule: getCampaignSchedule,
            AddNumbersToDnc: addNumbersToDnc,
            DeleteNumbersFromDnc: deleteNumbersFromDnc,
            GetDncNumbers: getDncNumbers
        };
    };

    var module = angular.module('veeryConsoleApp');
    module.factory('campaignNumberApiAccess', campaignNumberApiAccess)
}());