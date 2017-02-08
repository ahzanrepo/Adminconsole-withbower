/**
 * Created by Rajinda on 12/31/2015.
 */
'use strict';
mainApp.factory("campaignService", function ($http, $log, $filter, authService, baseUrls) {

    var createCampaign = function (campaign) {

        return $http({
            method: 'POST',
            url: baseUrls.campaignmanagerUrl + "Campaign",
            data: campaign
        }).then(function (response) {
            if (response.data && response.data.IsSuccess) {
                return response.data.Result;
            } else {
                return false;
            }

        });
    };

    var getCampaigns = function () {

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

    var getExtensions = function () {

        return $http({
            method: 'GET',
            url: baseUrls.sipUserendpoint + "ExtensionsByCategory/CAMPAIGN"
        }).then(function (response) {
            if (response.data && response.data.IsSuccess) {

                return response.data.Result;


            } else {

                return [];
            }

        });

    };

    var updateCampaign = function(id, campaign){


        return $http({
            method: 'PUT',
            url: baseUrls.campaignmanagerUrl + "Campaign/"+id,
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

    var deleteCampaign = function(id){
        return $http({
            method: 'DELETE',
            url: baseUrls.campaignmanagerUrl + "Campaign/"+id
        }).then(function(response)
        {
            if(response.data && response.data.IsSuccess) {
                return response.data.Result;
            }else{
                return false;
            }

        });
    };

    return {
        mechanisms: ["BLAST", "PREVIEW", "PREDICTIVE"],
        modes: ["IVR", "AGENT", "FIFO"],
        channels: ["SMS", "Email", "Call"],
        CreateCampaign: createCampaign,
        GetExtensions: getExtensions,
        GetCampaigns: getCampaigns,
        UpdateCampaign:updateCampaign,
        DeleteCampaign:deleteCampaign
    }

});




