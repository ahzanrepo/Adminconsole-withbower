mainApp.controller("campaignReportController", function ($scope,$q, $compile, $uibModal, $filter, $location, $log, $anchorScroll, campaignService) {

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

    $scope.CampaignSummeryReportCount = function() {
        campaignService.CampaignSummeryReportCount().then(function (response) {
            $scope.pageTotal = response;
        }, function (error) {
            $scope.showAlert("Campaign Report", 'error',"Fail To Get Page Count.");
        });
    };
    $scope.CampaignSummeryReportCount();

    $scope.getPageData = function (Paging, page, pageSize, total) {
        $scope.isLoading =true;
        campaignService.GetCampaignSummery(page,pageSize).then(function (response) {
            $scope.campaignSummery = response;
            $scope.isLoading =false;
        }, function (error) {
            $scope.showAlert("Campaign Report", 'error',"Fail To Load Summery Report.");
            $scope.isLoading =false;
        });
    };
    $scope.getPageData("", $scope.currentPage, $scope.pageSize, $scope.pageTotal);


});
