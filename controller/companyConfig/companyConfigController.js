/**
 * Created by Pawan on 7/29/2016.
 */

mainApp.controller("companyConfigController", function ($scope,$state, companyConfigBackendService,jwtHelper,authService) {


    $scope.isNewEndUser=false;
    $scope.isUserError=false;
    $scope.ClusterID;
    $scope.contextList=[];

    var authToken = authService.GetToken();
    var decodeData = jwtHelper.decodeToken(authToken);

    $scope.contextPrefix=decodeData.tenant+"_"+decodeData.company+"_";



    $scope.newApplication={};
    $scope.addNew = false;
    $scope.MasterAppList=[];
    $scope.IsDeveloper=false;
    $scope.Developers=[];

    $scope.showAlert = function (tittle,content,type) {

        new PNotify({
            title: tittle,
            text: content,
            type: type,
            styling: 'bootstrap3'
        });
    };



    $scope.saveEndUser= function () {

        switch ($scope.CloudEndUser.ConnectivityProvision) {
            case "SINGLE":
                $scope.CloudEndUser.Provision = 1;
                break;
            case "PROFILE":
                $scope.CloudEndUser.Provision = 2;
                break;
            case "SHARED":
                $scope.CloudEndUser.Provision = 3;
                break;
            default :
                $scope.CloudEndUser.Provision = 1;
                break;
        }

        $scope.CloudEndUser.ClientCompany=decodeData.company;
        $scope.CloudEndUser.ClientTenant=decodeData.tenant;





        if($scope.isNewEndUser)
        {
            $scope.CloudEndUser.ClusterID=$scope.ClusterID;

            companyConfigBackendService.saveNewEndUser($scope.CloudEndUser).then(function (response) {

                if(!response.data.IsSuccess)
                {

                    console.info("Error in adding new Enduser "+response.data.Exception);
                    $scope.showAlert("Error", "There is an error in adding new Enduser ","error");
                    //$scope.showAlert("Error",)
                }
                else
                {
                    $scope.addNew = !response.data.IsSuccess;
                    $scope.showAlert("Success", "New Enduser added successfully.","success");


                }
                $state.reload();
            }), function (error) {
                console.info("Error in adding new Enduser "+error);
                $scope.showAlert("Error", "There is an Exception in saving Enduser "+error,"error");
                $state.reload();
            }
        }
        else
        {
            $scope.CloudEndUser.SIPConnectivityProvision=$scope.CloudEndUser.Provision;
            companyConfigBackendService.updateEndUser($scope.CloudEndUser).then(function (response) {

                if(!response.data.IsSuccess)
                {

                    console.info("Error in adding new Enduser "+response.data.Exception);
                    $scope.showAlert("Error", "There is an error in updating Enduser ","error");
                    //$scope.showAlert("Error",)
                }
                else
                {
                    $scope.addNew = !response.data.IsSuccess;
                    $scope.showAlert("Success", "New Enduser updated successfully.","success");


                }
                $state.reload();
            }), function (error) {
                console.info("Error in adding new Enduser "+error);
                $scope.showAlert("Error", "There is an Exception in updating Enduser "+error,"error");
                $state.reload();
            }
        }



    };

    $scope.GetEndUser = function () {
        companyConfigBackendService.getCloudEndUser().then(function (response) {

            if(!response.data.IsSuccess)
            {
                console.info("Error in picking EndUsers "+response.data.Exception);

                $scope.isUserError=true;
            }
            else
            {
                $scope.isUserError=false;
                if(response.data.Result.length>0)
                {
                    $scope.isNewEndUser=false;
                    $scope.CloudEndUser = response.data.Result[0];
                    switch ($scope.CloudEndUser.SIPConnectivityProvision) {
                        case 1:
                            $scope.CloudEndUser.ConnectivityProvision = "SINGLE";
                            break;
                        case 2:
                            $scope.CloudEndUser.ConnectivityProvision = "PROFILE";
                            break;
                        case 3:
                            $scope.CloudEndUser.ConnectivityProvision = "SHARED";
                            break;
                        default :
                            $scope.CloudEndUser.ConnectivityProvision = "SINGLE";
                            break;
                    }
                }
                else
                {
                    $scope.isNewEndUser=true;
                }

                //$scope.MasterAppList = response.data.Result;
            }

        }), function (error) {
            console.info("Error in picking EndUsers "+error);
            $scope.isUserError=true;
        }
    };

    $scope.GetClusters = function () {

        companyConfigBackendService.getClusters().then(function (response) {
            if(!response.data.IsSuccess)
            {
                console.info("Error in picking Clusters "+response.data.Exception);

            } else
            {

                if(response.data.Result.length>0)
                {
                    $scope.ClusterID = response.data.Result[0].id;

                }


                //$scope.MasterAppList = response.data.Result;
            }

        }),function (error) {
            console.info("Error in picking clusters "+JSON.stringify(error));
        }

    };

    $scope.GetContexts = function () {
        companyConfigBackendService.getContexts().then(function (response) {

            if(!response.data.IsSuccess)
            {
                console.info("Error in picking Contexts "+response.data.Exception);

            }
            else
            {
               $scope.contextList=response.data.Result;

                //$scope.MasterAppList = response.data.Result;
            }

        }), function (error) {
            console.info("Error in picking Contexts "+error);

        }
    };
    $scope.removeDeleted = function (item) {

        var index = $scope.contextList.indexOf(item);
        if (index != -1) {
            $scope.contextList.splice(index, 1);
        }

    };

    $scope.saveNewContext = function () {

        $scope.newContext.ContextCat="INTERNAL";
        $scope.newContext.ClientCompany=decodeData.company;
        $scope.newContext.ClientTenant=decodeData.tenant;
        $scope.newContext.Context=$scope.contextPrefix+$scope.newContext.Context;

        companyConfigBackendService.saveNewContext($scope.newContext).then(function (response) {

            if(!response.data.IsSuccess)
            {

                console.info("Error in adding new Context "+response.data.Exception);
                $scope.showAlert("Error", "There is an error in adding new Context ","error");
                //$scope.showAlert("Error",)
            }
            else
            {
                $scope.addNew = !response.data.IsSuccess;
                $scope.showAlert("Success", "New Context added successfully.","success");


            }
            $state.reload();
        }), function (error) {
            console.info("Error in adding new Enduser "+error);
            $scope.showAlert("Error", "There is an Exception in saving Context "+error,"error");
            $state.reload();
        }
    };

    $scope.reloadPage = function () {
        $state.reload();
    };



    $scope.GetEndUser();
    $scope.GetClusters();
    $scope.GetContexts();







});