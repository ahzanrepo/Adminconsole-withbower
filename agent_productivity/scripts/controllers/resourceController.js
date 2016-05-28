var app = angular.module("veeryConsoleApp");

app.controller("resourceController", function ($scope, $routeParams,  $location, $log, resourceService) {

  $scope.productivity = [];
  $scope.getProductivity = function () {

    resourceService.GetProductivity().then(function (response) {

      $log.debug("GetCallServers: response" + response);
      $scope.productivity = response;

    }, function (error) {
      $log.debug("GetCallServers err");
      $scope.showAlert("Error", "Error", "ok", "There is an error ");
    });

  };

});

app.controller("resourceEditController", function ($scope, $routeParams, $location, $log, $filter, clusterService) {


});
