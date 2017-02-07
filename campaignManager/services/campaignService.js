/**
 * Created by Rajinda on 12/31/2015.
 */
'use strict';
mainApp.factory("campaignService", function ($http, $log, $filter, authService, baseUrls) {

    var createCampaign = function(campaign){

        return $http({
            method: 'POST',
            url: baseUrls.campaignmanagerUrl + "Campaign",
            data:campaign
        }).then(function(response)
        {
            if(response.data && response.data.IsSuccess) {
                return response.data.Result;
            }else{
                return false;
            }

        });
    };

    var getCampaigns = function() {

        return $http({
            method: 'GET',
            url: baseUrls.campaignmanagerUrl + "Campaigns/0"
        }).then(function (response) {
            if (response.data && response.data.IsSuccess) {

                return response.data.Result;


            } else {

                return [];
            }

        });
    };

    var getExtensions = function(){

        return $http({
            method: 'GET',
            url: baseUrls.sipUserendpoint +"ExtensionsByCategory/CAMPAIGN"
        }).then(function(response)
        {
            if(response.data && response.data.IsSuccess) {

                return response.data.Result;


            }else{

                return [];
            }

        });

    };


    return {
        CreateCampaign: createCampaign,
        GetExtensions:getExtensions,
        GetCampaigns:getCampaigns
    }

});




