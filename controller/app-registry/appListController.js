/**
 * Created by Pawan on 6/8/2016.
 */

mainApp.controller("applicationController", function ($scope,$state, appBackendService) {



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



    $scope.GetApplications();

});


mainApp.controller("modalController", function ($scope, $uibModalInstance,appBackendService,appID) {

    console.log("AppID "+appID);
    $scope.availableFileList=[];
    $scope.selectedFileList=[];
    $scope.allEligibleList=[];


    $scope.GetAvailableFiles = function () {
        appBackendService.getUnassignedFiles().then(function (response) {

            if(response.data.IsSuccess)
            {
                $scope.availableFileList=response.data.Result;
                appBackendService.getFilesOfApplication(appID).then(function (AppFiles) {
                    if(AppFiles.data.IsSuccess)
                    {
                        $scope.selectedFileList= AppFiles.data.Result;
                        $scope.createCompleteFileList();
                    }
                    else
                    {
                        console.info("Error in getting App related files "+AppFiles.data.Exception);
                    }
                }, function (errAppFiles) {
                    console.info("Exception in getting App related files "+errAppFiles);
                })
            }
            else
            {
                console.info("All file selection Error "+response.data.Exception);
            }

        }, function (error) {
            console.info("All file selection Exception "+error);
        });
    };

    $scope.createCompleteFileList = function () {

        for(var i=0;i<$scope.selectedFileList.length;i++)
        {
            $scope.selectedFileList[i].isChecked=true;
            $scope.allEligibleList.push($scope.selectedFileList[i]);

        }

        for(var j=0;j<$scope.availableFileList.length;j++)
        {
            $scope.availableFileList[j].isChecked=false;
            $scope.allEligibleList.push($scope.availableFileList[j]);

        }




        console.log($scope.availableFileList);
    };

    $scope.fileAttachDetach= function (file) {
        if(file.isChecked)
        {
            appBackendService.attachFilesWithApplication(appID,file.UniqueId).then(function (response) {
                if(response.data.IsSuccess)
                {
                    console.log("File "+file.Filename+" attached with "+appID);
                }
                else
                {
                    console.log("Error in file Attaching "+response.data.Exception);
                }

            }, function (error) {
                console.log("Exception in file Attaching "+error);
            });
        }
        else
        {
            appBackendService.detachFilesFromApplication(file.UniqueId).then(function (response) {
                if(response.data.IsSuccess)
                {
                    console.log("File "+file.Filename+" detached from "+appID);
                }
                else
                {
                    console.log("Error in file detaching "+response.data.Exception);
                }

            }, function (error) {
                console.log("Exception in file detaching "+error);
            });
        }
    };

    $scope.ok = function () {
        $uibModalInstance.close($scope.selectedTask);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.GetAvailableFiles();

})
