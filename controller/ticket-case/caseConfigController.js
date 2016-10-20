/**
 * Created by Heshan.i on 10/19/2016.
 */


(function(){
    var app =angular.module('veeryConsoleApp');

    var caseConfigController = function($scope, $state, caseApiAccess) {
        $scope.caseConfigs = [];
        $scope.caseConfig = {};

        $scope.showAlert = function (title,content,type) {
            new PNotify({
                title: title,
                text: content,
                type: type,
                styling: 'bootstrap3'
            });
        };

        $scope.removeDeleted = function (item) {

            var index = $scope.caseConfigs.indexOf(item);
            if (index != -1) {
                $scope.caseConfigs.splice(index, 1);
            }

        };

        $scope.reloadPage = function () {
            $state.reload();
        };

        $scope.loadCaseConfigs = function(){
            caseApiAccess.getCaseConfigurations().then(function(response){
                if(response.IsSuccess)
                {
                    $scope.caseConfigs = response.Result;
                }
                else
                {
                    var errMsg = response.CustomMessage;

                    if(response.Exception)
                    {
                        errMsg = response.Exception.Message;
                    }
                    $scope.showAlert('Case Configuration', errMsg, 'error');
                }
            }, function(err){
                var errMsg = "Error occurred while loading case configurations";
                if(err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Case Configuration', errMsg, 'error');
            });
        };

        $scope.saveCaseConfig = function(){
            caseApiAccess.createCaseConfiguration($scope.caseConfig).then(function(response){
                if(response.IsSuccess)
                {
                    $scope.caseConfigs = response.Result;
                    $scope.showAlert('Case Configuration', response.CustomMessage, 'success');
                    $state.reload();
                }
                else
                {
                    var errMsg = response.CustomMessage;

                    if(response.Exception)
                    {
                        errMsg = response.Exception.Message;
                    }
                    $scope.showAlert('Case Configuration', errMsg, 'error');
                }
            }, function(err){
                var errMsg = "Error occurred while saving case configuration";
                if(err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Case Configuration', errMsg, 'error');
            });
        };

        $scope.loadCaseConfigs();
    };

    app.controller('caseConfigController', caseConfigController);
}());