/**
 * Created by Heshan.i on 10/19/2016.
 */

(function(){
    var app =angular.module('veeryConsoleApp');

    var caseController = function($scope, $state, caseApiAccess) {
        $scope.caseInfos = [];
        $scope.caseInfo = {};

        $scope.showAlert = function (title,content,type) {
            new PNotify({
                title: title,
                text: content,
                type: type,
                styling: 'bootstrap3'
            });
        };

        $scope.removeDeleted = function (item) {

            var index = $scope.caseInfos.indexOf(item);
            if (index != -1) {
                $scope.caseInfos.splice(index, 1);
            }

        };

        $scope.reloadPage = function () {
            $state.reload();
        };

        $scope.loadCases = function(){
            caseApiAccess.getCases().then(function(response){
                if(response.IsSuccess)
                {
                    $scope.caseInfos = response.Result;
                }
                else
                {
                    var errMsg = response.CustomMessage;

                    if(response.Exception)
                    {
                        errMsg = response.Exception.Message;
                    }
                    $scope.showAlert('Case', errMsg, 'error');
                }
            }, function(err){
                var errMsg = "Error occurred while loading cases";
                if(err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Case', errMsg, 'error');
            });
        };

        $scope.saveCase = function(){
            caseApiAccess.createCase($scope.caseInfo).then(function(response){
                if(response.IsSuccess)
                {
                    $scope.caseInfos = response.Result;
                    $scope.showAlert('Case', response.CustomMessage, 'success');
                    $state.reload();
                }
                else
                {
                    var errMsg = response.CustomMessage;

                    if(response.Exception)
                    {
                        errMsg = response.Exception.Message;
                    }
                    $scope.showAlert('Case', errMsg, 'error');
                }
            }, function(err){
                var errMsg = "Error occurred while saving case";
                if(err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Case', errMsg, 'error');
            });
        };

        $scope.loadCases();
    };

    app.controller('caseController', caseController);
}());