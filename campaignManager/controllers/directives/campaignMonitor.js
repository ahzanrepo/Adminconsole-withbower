/**
 * Created by Rajinda on 5/30/2016.
 */
mainApp.directive("campaignmonitor", function ($filter, $uibModal, campaignService) {

    return {
        restrict: "EAA",
        scope: {
            campaign: "="
        },

        template: '<ng-include src="getTemplateUrl()"/>',

        /*templateUrl: 'campaignManager/template/campaignView.html',*/

        link: function (scope, element, attributes) {

            scope.getTemplateUrl = function() {
                //basic handling
                if (scope.campaign.CampCampaignInfo)
                    return "campaignManager/template/ongoingcampaignView.html";
                else
                    return "campaignManager/template/campaignView.html";
            };

            scope.showAlert = function (tittle, type, content) {
                new PNotify({
                    title: tittle,
                    text: content,
                    type: type,
                    styling: 'bootstrap3'
                });
            };

            scope.StartCampaign = function(cam) {
                campaignService.StartCampaign(cam.CampaignId).then(function (response) {
                    if(response) {
                        var index = $scope.pendingCampaign.indexOf(cam);
                        if (index > -1) {
                            $scope.pendingCampaign.splice(index, 1);
                        }
                        $scope.GetOngoingCampaign();
                        $scope.showAlert("Campaign", 'success', "Successfully Start Campaign.");

                    }else{
                        $scope.showAlert("Campaign", 'error',"Fail To Start Campaign.");
                    }
                }, function (error) {
                    $scope.showAlert("Campaign", 'error',"Fail To Start Campaign.");
                });
            };

            scope.SendCommandToCampaign = function(cam,command) {
                campaignService.SendCommandToCampaign(cam.CampaignId,command).then(function (response) {
                    if(response) {
                        $scope.showAlert("Campaign", 'success', "Operation Execute Successfully.");
                    }else{
                        $scope.showAlert("Campaign", 'error',"Fail To Execute Command.");
                    }
                }, function (error) {
                    $scope.showAlert("Campaign", 'error',"Fail To Execute Command.");
                });
            };

        }
    }
});


