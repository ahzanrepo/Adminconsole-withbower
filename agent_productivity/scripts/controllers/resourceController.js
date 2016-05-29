var app = angular.module("veeryConsoleApp");

app.controller("resourceController", function ($scope, $filter, $location, $log, resourceService) {

    $scope.productivity = [];
    $scope.getProductivity = function () {

        resourceService.GetProductivity().then(function (response) {

            $log.debug("GetCallServers: response" + response);
            $scope.productivity = response;
            $scope.GetOnlineAgents();
        }, function (error) {
            $log.debug("GetCallServers err");
            $scope.showAlert("Error", "Error", "ok", "There is an error ");
        });

    };

    $scope.OnlineAgents = [];


    $scope.GetOnlineAgents = function () {
        resourceService.GetOnlineAgents().then(function (response) {

            $log.debug("GetOnlineAgents: response" + response);
            $scope.OnlineAgents = response;
            calculateProductivity();
        }, function (error) {
            $log.debug("GetOnlineAgents err");
            $scope.showAlert("Error", "Error", "ok", "There is an error ");
        });

    };
    $scope.getProductivity();

    $scope.Productivitys = [];
    var calculateProductivity = function () {
        if ($scope.OnlineAgents) {
            angular.forEach($scope.OnlineAgents, function (agent) {
                try {
                    if (agent) {
                        var ids = $filter('filter')($scope.productivity, {ResourceId: agent.ResourceId});//"ResourceId":"1"
//<span>{{isLarge ? 'video.large' : 'video.small'}}</span>
                        var agentProductivity = {
                            "data": [ids[0].AcwTime?ids[0].AcwTime:0, ids[0].BreakTime?ids[0].BreakTime:0, ids[0].OnCallTime?ids[0].OnCallTime:0, ids[0].IdleTime?ids[0].IdleTime:0],
                            "ResourceId": agent.ResourceId,
                            "ResourceName": agent.ResourceName,
                            "IncomingCallCount": ids[0].IncomingCallCount?ids[0].IncomingCallCount:0,
                            "MissCallCount": ids[0].MissCallCount?ids[0].MissCallCount:0
                        };
                        $scope.Productivitys.push(agentProductivity);
                    }
                } catch (ex) {
                    console.log(ex);
                }
            });
        }
    };

    $scope.labels = ["After work", "Break", "On Call", "Idle"];
    $scope.data = [300, 500, 100, 100];


    $scope.showAlert = function (tittle, label, button, content) {

        new PNotify({
            title: tittle,
            text: content,
            type: 'notice',
            styling: 'bootstrap3'
        });
    };
});

app.controller("resourceEditController", function ($scope, $routeParams, $location, $log, $filter, clusterService) {


});
