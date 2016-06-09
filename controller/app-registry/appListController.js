/**
 * Created by Pawan on 6/8/2016.
 */

mainApp.controller("applicationController", function ($scope,$state, appBackendService) {


    /*$scope.safeApply = function (fn) {
     var phase = this.$root.$$phase;
     if (phase == '$apply' || phase == '$digest') {
     if (fn && (typeof(fn) === 'function')) {
     fn();
     }
     } else {
     this.$apply(fn);
     }
     };

     $scope.resource={};
     $scope.resources = [];
     $scope.GetResources = function (rowCount,pageNo) {
     resourceService.GetResources(rowCount,pageNo).then(function (response) {
     $scope.resources = response;
     }, function (error) {
     $log.debug("GetResources err");
     $scope.showAlert("Error", "Error", "ok", "There is an error ");
     });

     };
     $scope.GetResources(50,1);

     $scope.addNew = false;
     $scope.addResource = function () {
     $scope.addNew = !$scope.addNew;
     };

     $scope.saveResource = function (resource) {
     resourceService.SaveResource(resource).then(function (response) {
     $scope.addNew = !response.IsSuccess;
     if(response.IsSuccess){
     $scope.resources.splice(0, 0, response.Result);
     }

     }, function (error) {
     $log.debug("GetResources err");
     $scope.showAlert("Error", "Error", "ok", "There is an error ");
     });

     };

     $scope.GetResourcesCount = function(){

     };

     $scope.removeDeleted = function (item) {

     $scope.safeApply(function () {
     var index = $scope.resources.indexOf(item);
     if (index != -1) {
     $scope.resources.splice(index, 1);
     }
     });
     $scope.GetResourcesCount();

     };

     $scope.tasksList = [];
     $scope.GetTasks = function () {
     resourceService.GetTasks().then(function (response) {
     $scope.tasksList = response
     }, function (error) {
     console.info("GetTasks err" + error);
     });
     };
     $scope.GetTasks();

     $scope.showAlert = function (tittle, label, button, content) {

     new PNotify({
     title: tittle,
     text: content,
     type: 'notice',
     styling: 'bootstrap3'
     });
     };*/


    $scope.AppList=[];
    $scope.newApplication={};
    $scope.addNew = false;
    $scope.MasterAppList=[];


    $scope.saveAplication= function (resource) {
        resource.Availability=true;
        appBackendService.saveNewApplication(resource).then(function (response) {

            if(!response.data.IsSuccess)
            {
                console.info("Error in adding new Application "+response.data.Exception);
            }
            else
            {
                $scope.addNew = !response.data.IsSuccess;

                $scope.AppList.splice(0, 0, response.data.Result);


            }

        }), function (error) {
            console.info("Error in adding new Application "+error);
        }
    };
    $scope.GetResourcesCount = function(){

    };

    $scope.addApplication = function () {
        $scope.addNew = !$scope.addNew;
    };
    $scope.removeDeleted = function (item) {

        $scope.safeApply(function () {
            var index = $scope.AppList.indexOf(item);
            if (index != -1) {
                $scope.AppList.splice(index, 1);
            }
        });
        $scope.GetResourcesCount();

    };
    $scope.reloadPage = function () {
        $state.reload();
    };

    $scope.GetApplications = function () {
        appBackendService.getApplications().then(function (response) {

            if(response.data.Exception)
            {
                console.info("Error in picking App list "+response.data.Exception);
            }
            else
            {
                $scope.AppList = response.data.Result;
                //$scope.MasterAppList = response.data.Result;
            }

        }), function (error) {
            console.info("Error in picking App service "+error);
        }
    };

    $scope.GetApplications();

});



