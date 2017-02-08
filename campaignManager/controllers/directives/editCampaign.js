/**
 * Created by Rajinda on 5/30/2016.
 */
mainApp.directive("editcampaign", function ($filter, $uibModal, campaignService) {

    return {
        restrict: "EAA",
        scope: {
            campaign: "=",
            extensions: "=",
            'reloadCampaign': '&'
        },

        templateUrl: 'campaignManager/template/editCampaign.html',

        link: function (scope, element, attributes) {

            scope.mechanisms = campaignService.mechanisms;
            scope.modes = campaignService.modes;
            scope.channels = campaignService.channels;
            scope.editMode = false;
            scope.editCampaign = function () {
                scope.editMode = !scope.editMode;
            };

            scope.campaign.Extensions = {"Extension": scope.campaign.Extensions};

            scope.showAlert = function (tittle, type, content) {
                new PNotify({
                    title: tittle,
                    text: content,
                    type: type,
                    styling: 'bootstrap3'
                });
            };

            scope.showConfirm = function (tittle, label, okbutton, cancelbutton, content, OkCallback, CancelCallBack, okObj) {

                (new PNotify({
                    title: tittle,
                    text: content,
                    icon: 'glyphicon glyphicon-question-sign',
                    hide: false,
                    confirm: {
                        confirm: true
                    },
                    buttons: {
                        closer: false,
                        sticker: false
                    },
                    history: {
                        history: false
                    }
                })).get().on('pnotify.confirm', function () {
                    OkCallback("confirm");
                }).on('pnotify.cancel', function () {

                });

            };

            scope.updateCampaign = function (campaignx) {
                campaignService.UpdateCampaign(campaignx.CampaignId, campaignx).then(function (response) {
                    if (response) {
                        scope.showAlert("Campaign", 'success', "Campaign Updated successfully ");
                    } else {
                        scope.showAlert("Campaign", 'error', "Fail To Update Campaign");
                    }

                }, function (error) {
                    scope.showAlert("Campaign", 'error', "Fail To Update Campaign");
                });
            };

            scope.deleteCampaign = function (campaign) {

                scope.showConfirm("Delete Campaign", "Delete", "ok", "cancel", "Do you want to delete " + campaign.CampaignName, function (obj) {

                    campaignService.DeleteCampaign(campaign.CampaignId).then(function (response) {
                        if (response) {
                            scope.showAlert("Campaign", 'success', "Delete Successfully ");
                        } else {
                            scope.showAlert("Campaign", 'error', "Fail To Delete Campaign");
                        }

                    }, function (error) {
                        scope.showAlert("Campaign", 'error', "Fail To Delete Campaign");
                    });

                }, function () {

                }, campaign)
            };
        }

    }
});