mainApp.controller("campaignReportController", function ($scope, $compile, $uibModal, $filter, $location, $log, $anchorScroll, campaignService) {

    $anchorScroll();

    $scope.showAlert = function (tittle, type, content) {
        new PNotify({
            title: tittle,
            text: content,
            type: type,
            styling: 'bootstrap3'
        });
    };

// search
    $scope.StartTime = {
        date: new Date()
    };
    $scope.EndTime = {
        date: new Date()
    };
    $scope.openCalendar = function (name) {
        if (name == 'StartTime') {
            $scope.StartTime.open = true;
        }
        else {
            $scope.EndTime.open = true;
        }

    };
    var d = new Date();
    d.setDate(d.getDate() - 1);
    $scope.campaingSerachData = {};
    $scope.campaingSerachData.StartTime = d;
    $scope.campaingSerachData.EndTime = new Date();
    // search end

    $scope.dtOptions = {paging: false, searching: false, info: false, order: [0, 'desc']};
    $scope.pageSizRange = [10, 500, 1000, 5000, 10000];
    $scope.isLoading = false;
    $scope.noDataToshow = false;
    $scope.showPaging = false;
    $scope.currentPage = "1";
    $scope.pageTotal = "1";
    $scope.pageSize = 10;

    $scope.isLoading = false;
    $scope.campaignSummery = [];
    $scope.GetCampaignSummery = function() {
        $scope.isLoading =true;
        campaignService.GetCampaignSummery($scope.campaingSerachData.StartTime.toUTCString(),$scope.campaingSerachData.EndTime.toUTCString(),$scope.currentPage,$scope.pageSize).then(function (response) {
            $scope.campaignSummery = response;
            $scope.isLoading =false;
        }, function (error) {
            $scope.showAlert("Campaign Report", 'error',"Fail To Load Summery Report.");
            $scope.isLoading =false;
        });
    };
});
