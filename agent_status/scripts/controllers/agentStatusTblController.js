/**
 * Created by Damith on 6/16/2016.
 */


mainApp.controller("agentStatusTblController", function ($scope, $filter, $stateParams, $timeout, $log,
                                                         agentStatusService) {
    $scope.productivity = [];
    $scope.Productivitys = [];
    $scope.profile = [];


    //get productivity
    $scope.GetProductivity = function () {
        agentStatusService.GetProductivity().then(function (response) {
            $scope.productivity = response;
            // calculateProductivity();
        }, function (error) {
            $log.debug("productivity err");
            // $scope.showAlert("Error", "Error", "ok", "Fail To Get productivity.");
        });
    };
    $scope.GetProductivity();

    //get profile details
    $scope.getProfileDetails = function () {
        agentStatusService.GetProfileDetails().then(function (response) {
            $scope.profile = response;
        });
    };
    $scope.getProfileDetails();


});