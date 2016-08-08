/**
 * Created by Pawan on 8/5/2016.
 */


mainApp.controller("translationController", function ($scope,$state, transBackendService) {



    $scope.TranslationList=[];


    $scope.showAlert = function (tittle,content,type) {

        new PNotify({
            title: tittle,
            text: content,
            type: type,
            styling: 'bootstrap3'
        });
    };



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
                $scope.showAlert("Error", "There is an error in saving Application ","error");
                //$scope.showAlert("Error",)
            }
            else
            {
                $scope.addNew = !response.data.IsSuccess;
                $scope.showAlert("Success", "New Application added sucessfully.","success");

                $scope.AppList.splice(0, 0, response.data.Result);
                $scope.newApplication={};


            }
            $state.reload();
        }), function (error) {
            console.info("Error in adding new Application "+error);
            $scope.showAlert("Error", "There is an Exception in saving Application "+error,"error");
            $state.reload();
        }
    };


    $scope.addApplication = function () {
        $scope.addNew = !$scope.addNew;
    };
    $scope.removeDeleted = function (item) {

        var index = $scope.TranslationList.indexOf(item);
        if (index != -1) {
            $scope.TranslationList.splice(index, 1);
        }

    };
    $scope.reloadPage = function () {
        $state.reload();
    };

    $scope.GetAllTranslations = function () {
        transBackendService.getTranslations().then(function (response) {

            if(response.data.Exception)
            {
                console.info("Error in picking App list "+response.data.Exception);
                $scope.showAlert("Error","Error in Loading translation data","error");
            }
            else
            {
                $scope.TranslationList = response.data.Result;
                //$scope.MasterAppList = response.data.Result;
            }

        }), function (error) {
            console.info("Error in picking App service "+error);
            $scope.showAlert("Error","Error in Loading translation data","error");
        }
    };
    $scope.saveNewTranslations = function () {
        transBackendService.saveTranslations($scope.newTransltion).then(function (response) {

            if(response.data.IsSuccess)
            {
                $scope.TranslationList.splice(0, 0, response.data.Result);
                $scope.$scope.newTransltion={};
                console.log("New transliation saved successfully ");
                $scope.showAlert("Success","Translation successfully saved","success");
            }
            else
            {
                console.log("New transliation saving error ",response.data.Exception);
               $scope.showAlert("Error","Translation adding failed","error");
            }


            $state.reload();

        }), function (error) {
            console.log("New transliation saving error ",error);
            $scope.showAlert("Error","Translation adding failed","error");
        }
    };

    $scope.cancleEdit = function () {
        $scope.addNew=false;
    };



    $scope.GetAllTranslations();

});

