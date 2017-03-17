mainApp.controller("campaignReportController", function ($scope, $q, $compile, $uibModal, $filter, $location, $log, $anchorScroll, campaignService) {

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
    $scope.pageSizRange = [10, 500, 1000, 5000, 10000];
    $scope.isLoading = false;
    $scope.noDataToshow = false;
    $scope.currentPage = "1";
    $scope.pageTotal = "1";
    $scope.pageSize = 100;

    $scope.isLoading = false;
    $scope.campaignSummery = [];

    $scope.CampaignSummeryReportCount = function () {
        campaignService.CampaignSummeryReportCount($scope.Status).then(function (response) {
            $scope.pageTotal = response;
        }, function (error) {
            $scope.showAlert("Campaign Report", 'error', "Fail To Get Page Count.");
        });
    };


    $scope.getPageData = function (Paging, page, pageSize, total) {
        $scope.isLoading = true;
        campaignService.GetCampaignSummery(page, pageSize,$scope.Status).then(function (response) {
            $scope.campaignSummery = response;
            $scope.isLoading = false;
        }, function (error) {
            $scope.showAlert("Campaign Report", 'error', "Fail To Load Summery Report.");
            $scope.isLoading = false;
        });
    };


    $scope.GetCampaignSummery =function () {
        $scope.CampaignSummeryReportCount();
        $scope.getPageData("", $scope.currentPage, $scope.pageSize, $scope.pageTotal);
    };

    $scope.Status = [];
    $scope.summeryCondition = {
        Create:false,
        Ongoing:false,
        Offline:false,
        Start:false,
        Pause:false,
        Stop:false,
        Done:false,
        All:false,
    };

    $scope.addConditions = function (status) {
        if(status==='All'){
            $scope.summeryCondition = {
                Create:!$scope.summeryCondition.All,
                Ongoing:!$scope.summeryCondition.All,
                Offline:!$scope.summeryCondition.All,
                Start:!$scope.summeryCondition.All,
                Pause:!$scope.summeryCondition.All,
                Stop:!$scope.summeryCondition.All,
                Done:!$scope.summeryCondition.All,
                All:$scope.summeryCondition.All
            };
            $scope.Status = [];
            if(!$scope.summeryCondition.All){
                $scope.Status.push(status);
            }
            return;
        }
        var index = $scope.Status.indexOf(status);
        if (index > -1) {
            $scope.Status.splice(index, 1);
        }
        else{
            $scope.Status.push(status);
        }

    }

});


mainApp.controller("campaignDispositionReportController", function ($scope, $q, $compile, $uibModal, $filter, $location, $log, $anchorScroll, campaignService) {

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
    $scope.pageSizRange = [10, 500, 1000, 5000, 10000];
    $scope.isLoading = false;
    $scope.noDataToshow = false;
    $scope.currentPage = "1";
    $scope.pageTotal = "1";
    $scope.pageSize = 100;

    $scope.isLoading = false;
    $scope.campaign = {};
    $scope.campaigns = [];

    $scope.GetCampaigns = function () {
        $scope.isLoading = true;
        campaignService.GetCampaigns().then(function (response) {
            $scope.campaigns = response;

            $scope.isLoading = false;
        }, function (error) {
            $scope.showAlert("Campaign Report", 'error', "Fail To Get Campaigns.");
            $scope.isLoading = false;
        });
    };
    $scope.GetCampaigns();

    $scope.CampaignDispositionReportCount = function () {
        campaignService.CampaignDispositionReportCount($scope.campaign.CampaignId).then(function (response) {
            $scope.pageTotal = response;
        }, function (error) {
            $scope.showAlert("Campaign Report", 'error', "Fail To Get Page Count.");
        });
    };


    $scope.getPageData = function (Paging, page, pageSize, total) {
        if ($scope.campaign.CampaignId <= 0) {
            $scope.showAlert("Campaign Report", 'error', "Please Select Campaign.");
            return;
        }
        $scope.isLoading = true;
        campaignService.CampaignDispositionReport(page, pageSize, $scope.campaign.CampaignId).then(function (response) {
            $scope.campaignSummery = response;
            $scope.isLoading = false;
        }, function (error) {
            $scope.showAlert("Campaign Report", 'error', "Fail To Load Summery Report.");
            $scope.isLoading = false;
        });
    };

    $scope.loadData = function () {
        $scope.CampaignDispositionReportCount();
        $scope.getPageData("", $scope.currentPage, $scope.pageSize, $scope.pageTotal);
    };


});

mainApp.controller("campaignCallbackReportController", function ($scope, $q, $compile, $uibModal, $filter, $location, $log, $anchorScroll, campaignService) {

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
    $scope.pageSizRange = [10, 500, 1000, 5000, 10000];
    $scope.isLoading = false;
    $scope.noDataToshow = false;
    $scope.currentPage = "1";
    $scope.pageTotal = "1";
    $scope.pageSize = 100;

    $scope.isLoading = false;
    $scope.campaign = {};
    $scope.campaigns = [];

    $scope.GetCampaigns = function () {
        $scope.isLoading = true;
        campaignService.GetCampaigns().then(function (response) {
            $scope.campaigns = response;

            $scope.isLoading = false;
        }, function (error) {
            $scope.showAlert("Campaign Report", 'error', "Fail To Get Campaigns.");
            $scope.isLoading = false;
        });
    };
    $scope.GetCampaigns();

    $scope.CampaignCallbackReportCount = function () {
        campaignService.CampaignCallbackReportCount($scope.campaign.CampaignId).then(function (response) {
            $scope.pageTotal = response;
        }, function (error) {
            $scope.showAlert("Campaign Report", 'error', "Fail To Get Page Count.");
        });
    };


    $scope.getPageData = function (Paging, page, pageSize, total) {
        if ($scope.campaign.CampaignId <= 0) {
            $scope.showAlert("Campaign Report", 'error', "Please Select Campaign.");
            return;
        }
        $scope.isLoading = true;
        campaignService.CampaignCallbackReport(page, pageSize, $scope.campaign.CampaignId).then(function (response) {
            $scope.campaignSummery = response;
            $scope.isLoading = false;
        }, function (error) {
            $scope.showAlert("Campaign Report", 'error', "Fail To Load Summery Report.");
            $scope.isLoading = false;
        });
    };

    $scope.loadData = function () {
        $scope.CampaignCallbackReportCount();
        $scope.getPageData("", $scope.currentPage, $scope.pageSize, $scope.pageTotal);
    };


});