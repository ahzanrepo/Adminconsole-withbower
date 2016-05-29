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
        angular.forEach($scope.OnlineAgents, function (agent) {

            var ids = $filter('filter')($scope.productivity, {ResourceId: agent.Obj.ResourceId});//"ResourceId":"1"

            var agentProductivity = {
                "data": [ids[0].AcwTime,ids[0].BreakTime,ids[0].OnCallTime,ids[0].IdleTime],
                "ResourceId": agent.Obj.ResourceId,
                "ResourceName": agent.Obj.ResourceName,
                "IncomingCallCount":ids[0].IncomingCallCount,
                "MissCallCount":ids[0].MissCallCount
            };
            $scope.Productivitys.push(agentProductivity);

        });
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
