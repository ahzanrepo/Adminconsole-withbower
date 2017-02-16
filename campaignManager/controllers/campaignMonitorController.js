mainApp.controller("campaignMonitorController", function ($scope, $compile, $uibModal, $filter, $location, $log, $anchorScroll, campaignService) {

    $anchorScroll();
    $scope.showAlert = function (tittle, type, content) {
        new PNotify({
            title: tittle,
            text: content,
            type: type,
            styling: 'bootstrap3'
        });
    };
    $scope.dtOptions = {paging: false, searching: false, info: false, order: [0, 'desc']};
    $scope.isProgress = false;
    $scope.ongoingCampaign =[];
    $scope.GetOngoingCampaign = function() {
        $scope.isProgress =true;
        campaignService.GetOngoingCampaign().then(function (response) {
            if(response) {
                $scope.ongoingCampaign = response;
            }else{
                $scope.showAlert("Campaign", 'error',"Fail To Load Campaign List.");
            }
            $scope.isProgress =false;
        }, function (error) {
            $scope.showAlert("Campaign", 'error',"Fail To Load Campaign List.");
            $scope.isProgress =false;
        });
    };
    $scope.GetOngoingCampaign();

    $scope.pendingCampaign =[];
    $scope.GetCampaignByState = function() {
        campaignService.GetCampaignByState("create").then(function (response) {
            if(response) {
                $scope.pendingCampaign = response;
            }else{
                $scope.showAlert("Campaign", 'error',"Fail To Load Campaign List.");
            }
        }, function (error) {
            $scope.showAlert("Campaign", 'error',"Fail To Load Campaign List.");
        });
    };
    $scope.GetCampaignByState();

    $scope.StartCampaign = function(cam) {
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

    $scope.SendCommandToCampaign = function(cam,command) {
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
});
