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
                return response.data.IsSuccess;
            }else{
                return false;
            }

        });
    };

    var getReasons = function(){

        return $http({
            method: 'GET',
            url: baseUrls.campaignmanagerUrl + "Campaign/Configuration/callback/Reasons"
        }).then(function(response)
        {
            if(response.data && response.data.IsSuccess) {
                return response.data.Result;
            }else{
                return undefined;
            }
        });
    };

    var updateCallBack = function(id, callback){

        return $http({
            method: 'POST',
            url:baseUrls.campaignmanagerUrl + "Campaign/Configuration/"+id+"/Callback",
            data:callback
        }).then(function(response)
        {
            if(response.data && response.data.IsSuccess) {
                return response.data.Result;
            }else{
                return false;
            }
        });

    };

    var createCampaignConfig = function(id, config){
        return $http({
            method: 'POST',
            url: baseUrls.campaignmanagerUrl + "Campaign/"+id+"/Configuration",
            data:config
        }).then(function(response)
        {
            if(response.data && response.data.IsSuccess) {
                return response.data.Result;
            }else{
                return undefined;
            }
        });
    };

    var updateCampaignConfig = function(id, configId, config){
        return $http({
            method: 'PUT',
            url: baseUrls.campaignmanagerUrl + "Campaign/"+id+"/Configuration/"+configId,
            data:config
        }).then(function(response)
        {
            if(response.data && response.data.IsSuccess) {
                return response.data.Result;
            }else{
                return undefined;
            }
        });
    };

    var getCampaignConfig = function(id){
        return $http({
            method: 'GET',
            url: baseUrls.campaignmanagerUrl + "Campaign/"+id+"/Configurations"
        }).then(function(response)
        {
            if(response.data && response.data.IsSuccess) {

                return response.data.Result;


            }else{

                return undefined;
            }

        });
    };

    var getCallBacks = function(id){
        return $http({
            method: 'GET',
            url: baseUrls.campaignmanagerUrl + "Campaign/Configuration/"+id+"/Callbacks"
        }).then(function(response)
        {
            if(response.data && response.data.IsSuccess) {
                return response.data.Result;
            }else{
                return [];
            }
        });
    };

    var setCallBack = function(id, callback){
        return $http({
            method: 'POST',
            url: baseUrls.campaignmanagerUrl + "Campaign/Configuration/"+id+"/Callback",
            data:callback
        }).then(function(response)
        {
            if(response.data && response.data.IsSuccess) {

                return response.data.Result;


            }else{

                return undefined;
            }

        });
    };

    var deleteCallBack = function(cbId){
        return $http({
            method: 'DELETE',
            url: baseUrls.campaignmanagerUrl + "Campaign/Configuration/Callback/"+cbId
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
        DeleteCampaign:deleteCampaign,
        GetReasons:getReasons,
        UpdateCallBack:updateCallBack,
        CreateCampaignConfig:createCampaignConfig,
        UpdateCampaignConfig:updateCampaignConfig,
        GetCampaignConfig:getCampaignConfig,
        GetCallBacks:getCallBacks,
        SetCallBack:setCallBack,
        DeleteCallBack:deleteCallBack
    }

});




