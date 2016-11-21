/**
 * Created by Pawan on 8/5/2016.
 */


mainApp.controller("translationController", function ($scope,$state, transBackendService,loginService) {



    $scope.TranslationList=[];


    $scope.showAlert = function (tittle,content,type) {

        new PNotify({
            title: tittle,
            text: content,
            type: type,
            styling: 'bootstrap3'
        });
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

            if(!response.data.IsSuccess)
            {
                console.info("Error in Loading translation data "+response.data.Exception);
                $scope.showAlert("Error","Error in Loading translation data","error");
            }
            else
            {
                if(response.data.Result.length>0)
                {
                    console.info(response.data.Result.length+"Translations found ");
                    $scope.TranslationList = response.data.Result;
                }
                else
                {
                    console.info("No translation records found ");
                    $scope.showAlert("Info","No translation records found","notice");
                }

                //$scope.MasterAppList = response.data.Result;
            }

        }), function (error) {
            loginService.isCheckResponse(err);
            console.info("Error in Loading translation data "+error);
            $scope.showAlert("Error","Error in Loading translation data","error");
        }
    };
    $scope.saveNewTranslations = function () {
        transBackendService.saveTranslations($scope.newTransltion).then(function (response) {

            if(response.data.IsSuccess)
            {
                $scope.TranslationList.splice(0, 0, response.data.Result);
                $scope.newTransltion={};
                console.log("New translation saved successfully ");
                $scope.showAlert("Success","Translation successfully saved","success");
                $state.reload();
            }
            else
            {
                console.log("New translation saving error ",response.data.Exception);
                $scope.showAlert("Error","Translation adding failed","error");
                $state.reload();
            }




        }), function (error) {
            loginService.isCheckResponse(err);
            console.log("New translation saving error ",error);
            $scope.showAlert("Error","Translation adding failed","error");
        }
    };




    $scope.GetAllTranslations();

});

