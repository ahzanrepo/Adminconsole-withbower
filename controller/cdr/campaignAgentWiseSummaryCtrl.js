mainApp.controller("campaignAgentWiseSummaryController", function ($http, $scope, $filter, $location, $log, $q, $anchorScroll, sipUserApiHandler, campaignService, cdrApiHandler) {

    $anchorScroll();


    $scope.showAlert = function (tittle, type, content) {
        new PNotify({
            title: tittle,
            text: content,
            type: type,
            styling: 'bootstrap3'
        });
    };

    $scope.SummaryDetails = [];

    $scope.campaignList = [];
    $scope.AnsweredCalls = 0;
    $scope.QueuedCalls = 0;
    $scope.isError = false;

    var getCampaigns = function()
    {
        campaignService.GetCampaigns().then(function (campaignList) {
            if (campaignList && campaignList.length > 0) {
                $scope.campaignList = campaignList;
            }


        }).catch(function (err) {
        });
    };

    var getUserList = function () {

        sipUserApiHandler.getSIPUsers().then(function (userList) {
            if (userList && userList.Result && userList.Result.length > 0) {
                $scope.userList = userList.Result;
            }


        }).catch(function (err) {
        });
    };

    getUserList();

    getCampaigns();

    $scope.isLoading = false;
    $scope.noDataToshow = false;
    $scope.BatchNames = [];
    $scope.AgentWiseSummary = [];


    $scope.StartDate = moment().format("YYYY-MM-DD");
    $scope.EndDate = moment().format("YYYY-MM-DD");


    $scope.getPageData = function () {
        $scope.isLoading = true;
        var momentTz = moment.parseZone(new Date()).format('Z');
        momentTz = momentTz.replace("+", "%2B");
        var startD = $scope.StartDate + ' 00:00:00' + momentTz;
        var endD  = $scope.EndDate + ' 23:59:59' + momentTz;

        cdrApiHandler.getCampaignAgentSummary(startD, endD, $scope.Campaign, $scope.Agent).then(function (response)
        {
            if(response.Result)
            {
                $scope.SummaryDetails = response.Result;

                $scope.isError = false;
            }
            else
            {
                $scope.isError = true;
            }
            $scope.isLoading = false;
        }, function (error) {
            $scope.showAlert("Campaign Report", 'error', "Fail To Load Summery Report.");
            $scope.isLoading = false
            $scope.isError = true;
        });
    };
});
