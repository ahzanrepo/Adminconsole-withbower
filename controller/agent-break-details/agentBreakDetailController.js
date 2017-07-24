/**
 * Created by Heshan.i on 7/20/2017.
 */

(function () {

    mainApp.controller("agentBreakDetailController", function ($scope, $filter, $state, $q, agentSummaryBackendService, acwDetailApiAccess, loginService, $anchorScroll) {

        $anchorScroll();
        $scope.startDate = moment().format("YYYY-MM-DD");
        $scope.endDate = moment().add(1, 'day').format("YYYY-MM-DD");
        $scope.dateValid = true;
        $scope.agentBreakList = [];
        $scope.Agents = [];
        $scope.isTableLoading = 0;

        var AgentDetailsAssignToSummery = function () {


            for (var i = 0; i < $scope.agentBreakList.length; i++) {
                for (var j = 0; j < $scope.Agents.length; j++) {
                    if ($scope.Agents[j].ResourceId == $scope.agentBreakList[i].ResourceId) {
                        $scope.agentBreakList[i].ResourceName = $scope.Agents[j].ResourceName;

                    }
                }
            }
        };


        $scope.showAlert = function (title, content, type) {
            new PNotify({
                title: title,
                text: content,
                type: type,
                styling: 'bootstrap3'
            });
        };

        $scope.onDateChange = function () {
            (moment($scope.startDate, "YYYY-MM-DD").isValid()) ? $scope.dateValid = true : $scope.dateValid = false;
            $scope.endDate = moment($scope.startDate).add(1, 'day').format("YYYY-MM-DD");
        };

        $scope.getAgents = function () {
            agentSummaryBackendService.getAgentDetails().then(function (response) {
                if (response.data.IsSuccess) {
                    console.log("Agents " + response.data.Result);
                    console.log(response.data.Result.length + " Agent records found");
                    $scope.Agents = response.data.Result;
                }
                else {
                    console.log("Error in Agent details picking");
                }
            }, function (error) {
                loginService.isCheckResponse(error);
                console.log("Error in Agent details picking " + error);
            });
        };

        $scope.getBreakDetails = function () {
            $scope.isTableLoading = 1;
            acwDetailApiAccess.getAgentBreakDetails($scope.startDate, $scope.endDate).then(function (response) {
                if (!response.data.IsSuccess) {

                    $scope.showAlert('Break Details', "No data to be loaded for the selected day", 'error');
                    $scope.isTableLoading = 3;

                } else {

                    if (response.data.Result && response.data.Result.length > 0) {
                        $scope.agentBreakList = response.data.Result;
                        AgentDetailsAssignToSummery();
                        $scope.tableHeaders = Object.keys($scope.agentBreakList[0]);
                        $scope.tableHeaders.splice(0, 1);
                        $scope.isTableLoading = 2;
                    } else {
                        $scope.isTableLoading = 3;
                        $scope.showAlert('Break Details', "No data to be loaded for the selected day", 'error');
                    }

                }
            }, function (err) {
                loginService.isCheckResponse(err);
                var errMsg = "Error occurred while loading break details";
                if (err.statusText) {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Break Details', "No data to be loaded for the selected day", 'error');
                $scope.isTableLoading = 3;
            });
        };

        $scope.getBreakDetailsCSV = function () {

            $scope.DownloadFileName = 'AGENT_BREAK_' + $scope.startDate;
            $scope.agentBreakList = [];
            var deferred = $q.defer();
            acwDetailApiAccess.getAgentBreakDetails($scope.startDate, $scope.endDate).then(function (response) {

                if (!response.data.IsSuccess) {

                    $scope.showAlert('Break Details', "No data to be downloaded for the selected date", 'error');
                    $scope.isTableLoading = 3;
                    deferred.reject($scope.agentBreakList);
                }
                else {
                    if (response.data.Result && response.data.Result.length > 0) {
                        $scope.agentBreakList = response.data.Result;
                        AgentDetailsAssignToSummery();
                        $scope.tableHeaders = Object.keys($scope.agentBreakList[0]);
                        $scope.tableHeaders.splice(0, 1);
                        deferred.resolve($scope.agentBreakList);
                    } else {
                        $scope.isTableLoading = 3;
                        $scope.showAlert('Break Details', "No data to be downloaded for the selected date", 'error');
                    }

                }

            }, function (error) {
                loginService.isCheckResponse(err);
                var errMsg = "Error occurred while loading break details";
                if (err.statusText) {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Break Details', "No data to be downloaded for the selected date", 'error');
                $scope.isTableLoading = 3;
                deferred.reject($scope.agentBreakList);
            });

            return deferred.promise;
        };

        $scope.getAgents();

    });

}());