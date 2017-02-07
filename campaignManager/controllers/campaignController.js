mainApp.controller("campaignController", function ($scope, $compile, $uibModal, $filter, $location, $log, $anchorScroll, campaignService) {

    $anchorScroll();
    $scope.mechanisms = campaignService.mechanisms;
    $scope.modes = campaignService.modes;
    $scope.channels = campaignService.channels;
    $scope.campaign = {};
    $scope.isLoading = true;
    $scope.isProgress = false;
    $scope.progressMsg = "Progress";


    $scope.showPaging = false;
    $scope.currentPage = "1";
    $scope.pageTotal = "1";
    $scope.pageSize = "50";


    $scope.showAlert = function (tittle, type, content) {
        new PNotify({
            title: tittle,
            text: content,
            type: type,
            styling: 'bootstrap3'
        });
    };

    $scope.createCampaign = function(campaignx) {
        campaignService.CreateCampaign(campaignx).then(function (response) {
            if(response) {
                $scope.showAlert("Campaign", 'success',"Campaign Create Successfully.");
                $scope.addNewCampaign = false;
                $scope.campaigns.push(response);

            }else{
                $scope.showAlert("Campaign", 'error',"Fail To Create Campaign.");
            }

        }, function (error) {
            $scope.showAlert("Campaign", 'error',"Fail To Create Campaign.");
        });
    };

    $scope.addNewCampaign = false;
    $scope.addCampaign = function () {
        $scope.addNewCampaign = !$scope.addNewCampaign;
    };

    var loadExtentions = function(){
        campaignService.GetExtensions().then(function (response) {
            $scope.extensions = response;
        }, function (error) {
            $scope.showAlert("Campaign","error","Fail To Load Extension List.");
        });
    };
    loadExtentions();

    $scope.campaigns = [];
    $scope.loadCampaign = function() {
        $scope.isLoading = true;
        campaignService.GetCampaigns().then(function (response) {
            if(response) {
                $scope.campaigns = response;

            }else{
                $scope.showAlert("Campaign","error","There is an error, Error on loading campaigns");
            }
            $scope.isLoading = false;
        }, function (error) {
            $scope.showAlert("Campaign","error","There is an error, Error on loading campaigns");
        });
    };
    $scope.loadCampaign();
});
