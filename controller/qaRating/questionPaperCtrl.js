/**
 * Created by dinusha on 12/19/2016.
 */
(function () {
    var app = angular.module("veeryConsoleApp");

    var questionPaperCtrl = function ($scope, $uibModal, loginService, qaModuleService) {

        $scope.showAlert = function (title, type, content) {

            new PNotify({
                title: title,
                text: content,
                type: type,
                styling: 'bootstrap3'
            });
        };

        $scope.newDropDownState = true;

        $scope.showModal = function () {
            //modal show
            $scope.modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'views/qaRating/sections.html',
                size: 'lg',
                scope: $scope
            });
        };

        $scope.closeModal = function(){
            $scope.modalInstance.close();
        };

        $scope.addSection = function(){

            qaModuleService.addNewSection($scope.currentSection).then(function (data)
            {
                if (data.Result)
                {
                    $scope.showAlert('QA Section', 'success', 'Section Added Successfully');
                }
                else
                {
                    if(data.Exception)
                    {
                        $scope.showAlert('QA Section', 'error', data.Exception.Message);
                    }
                    else
                    {
                        $scope.showAlert('QA Section', 'error', 'Error occurred while adding section');
                    }
                }

            }).catch(function (err)
            {
                loginService.isCheckResponse(err);
                $scope.showAlert('QA Section', 'error', err.Message);
            });

        }

    };


    app.controller("questionPaperCtrl", questionPaperCtrl);
}());