/**
 * Created by Pawan on 6/17/2016.
 */

mainApp.controller("extensionController", function ($scope,$state, extensionBackendService) {


    $scope.Extensions=[];
    $scope.AppList=[];
    $scope.newApplication={};
    $scope.addNew = false;
    $scope.MasterAppList=[];
    $scope.IsDeveloper=false;
    $scope.Developers=[];





    $scope.saveAplication= function (resource) {
        resource.Availability=true;
        if(resource.ObjClass=="DEVELOPER")
        {
            resource.IsDeveloper=true;
        }
        appBackendService.saveNewApplication(resource).then(function (response) {

            if(!response.data.IsSuccess)
            {
                console.info("Error in adding new Application "+response.data.Exception);
            }
            else
            {
                $scope.addNew = !response.data.IsSuccess;

                $scope.AppList.splice(0, 0, response.data.Result);
                $scope.newApplication={};


            }

        }), function (error) {
            console.info("Error in adding new Application "+error);
        }
    };


    $scope.addApplication = function () {
        $scope.addNew = !$scope.addNew;
    };
    $scope.removeDeleted = function (item) {

        var index = $scope.AppList.indexOf(item);
        if (index != -1) {
            $scope.AppList.splice(index, 1);
        }

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

    $scope.cancleEdit = function () {
        $scope.addNew=false;
    };



    // $scope.GetApplications();

    $scope.addNewExtension= function (resource) {

        $scope.extension = resource;
        $scope.extension.Enabled = true;
        $scope.extension.DodActive = true;
        extensionBackendService.saveNewExtension(resource).then(function (response) {
            if(response.data.IsSuccess)
            {
                console.log("Extension added successfully");
                extensionBackendService.assignDodToExtension(response.data.id,resource.DodNumber).then(function (response) {

                    if(response.data.IsSuccess)
                    {
                        console.log("Dod assigned to Extension");
                    }
                    else
                    {
                        console.log("Error in assigning DOD to Extension ",response.data.Extension.Message);
                    }
                }, function (error) {
                    console.log("Extension in assigning DOD to Extension ",error);
                });
            }
            else
            {
                console.log("Extension saving error ",response.data.Exception.Message);
            }
            $scope.reloadPage();

        }, function (error) {
            console.log("Extension saving failed ",error);
            $scope.reloadPage();
        });
    };


    $scope.GetExtensions = function () {
        extensionBackendService.getExtensions().then(function (response) {

            if(response.data.Exception)
            {
                console.info("Error in picking limit list "+response.data.Exception.Message);
            }
            else
            {
                $scope.Extensions = response.data.Result;
                //$scope.MasterAppList = response.data.Result;
            }

        }), function (error) {
            console.info("Error in picking App service "+error);
        }
    };
    $scope.GetExtensions();



});