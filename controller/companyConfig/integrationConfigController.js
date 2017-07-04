/**
 * Created by Waruna on 7/3/2017.
 */

mainApp.controller("integrationConfigController", function ($scope, $filter, $location, $log, $anchorScroll, resourceProductivityService) {

    $anchorScroll();

    $scope.showAlert = function (tittle, content, type) {

        new PNotify({
            title: tittle,
            text: content,
            type: type,
            styling: 'bootstrap3'
        });
    };

    $scope.integrationDataList = [];
    $scope.integrationData = {method: "GET", parameters:[]};
    $scope.parameters = {parameterLocation: "QUERY"};

    $scope.isProcessing = false;

    $scope.showConfiguration = false;
    $scope.showConfigurations = function () {
        $scope.showConfiguration = !$scope.showConfiguration;
    };

    $scope.showParameter = false;
    $scope.showParameters = function () {
        $scope.showParameter = !$scope.showParameter;
    };

    $scope.addParameters = function (parameters) {
        $scope.integrationData.parameters.push(parameters);
        $scope.parameters = {parameterLocation: "QUERY"};

        var form = $scope["fInner"];
        form.$setUntouched();
        form.$setPristine();

        //$scope.showParameter = false;
    };

    $scope.saveConfig = function (integrationData) {

        var form = $scope["fOuter"];
        form.$setUntouched();
        form.$setPristine();

        $scope.integrationDataList.push(integrationData);
        $scope.isProcessing = true;
        $scope.showConfiguration = false;
        $scope.integrationData = {method: "GET", parameters:[]};
    };

    $scope.deleteParameter = function (parameters) {
        var index = $scope.integrationData.parameters.indexOf(parameters);
        $scope.integrationData.parameters.splice(index, 1);
    }
});