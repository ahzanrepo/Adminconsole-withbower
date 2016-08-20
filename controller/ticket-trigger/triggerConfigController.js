/**
 * Created by Heshan.i on 8/16/2016.
 */
(function(){
    var app =angular.module('veeryConsoleApp');

    var triggerConfigController = function ($scope, $state, $stateParams, triggerApiAccess) {
        $scope.title = $stateParams.title;
        $scope.triggerId = $stateParams.triggerId;

        $scope.showAlert = function (title,content,type) {
            new PNotify({
                title: title,
                text: content,
                type: type,
                styling: 'bootstrap3'
            });
        };

        $scope.reloadPage = function () {
            $state.reload();
        };

        $scope.loadFilterAll = function(){
            triggerApiAccess.getFiltersAll($stateParams.triggerId).then(function(response){
                if(response.IsSuccess)
                {
                    $scope.filterAll = response.Result;
                }
                else
                {
                    var errMsg = response.CustomMessage;

                    if(response.Exception)
                    {
                        errMsg = response.Exception.Message;
                    }
                    $scope.showAlert('Error', 'error', errMsg);
                }
            }, function(err){
                var errMsg = "Error occurred while loading filters";
                if(err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Error', 'error', errMsg);
            });
        };

        $scope.loadFilterAny = function(){
            triggerApiAccess.getFiltersAny($stateParams.triggerId).then(function(response){
                if(response.IsSuccess)
                {
                    $scope.filterAny = response.Result;
                }
                else
                {
                    var errMsg = response.CustomMessage;

                    if(response.Exception)
                    {
                        errMsg = response.Exception.Message;
                    }
                    $scope.showAlert('Error', 'error', errMsg);
                }
            }, function(err){
                var errMsg = "Error occurred while loading filters";
                if(err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Error', 'error', errMsg);
            });
        };

        $scope.loadTriggerActions = function(){
            triggerApiAccess.getActions($stateParams.triggerId).then(function(response){
                if(response.IsSuccess)
                {
                    $scope.triggerActions = response.Result;
                }
                else
                {
                    var errMsg = response.CustomMessage;

                    if(response.Exception)
                    {
                        errMsg = response.Exception.Message;
                    }
                    $scope.showAlert('Error', 'error', errMsg);
                }
            }, function(err){
                var errMsg = "Error occurred while loading trigger actions";
                if(err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Error', 'error', errMsg);
            });
        };

        $scope.loadTriggerOperations = function(){
            triggerApiAccess.getOperations($stateParams.triggerId).then(function(response){
                if(response.IsSuccess)
                {
                    $scope.triggerOperations = response.Result;
                }
                else
                {
                    var errMsg = response.CustomMessage;

                    if(response.Exception)
                    {
                        errMsg = response.Exception.Message;
                    }
                    $scope.showAlert('Error', 'error', errMsg);
                }
            }, function(err){
                var errMsg = "Error occurred while loading trigger operations";
                if(err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Error', 'error', errMsg);
            });
        };

        $scope.removeDeletedAction = function (item) {

            var index = $scope.triggerActions.indexOf(item);
            if (index != -1) {
                $scope.triggerActions.splice(index, 1);
            }

        };

        $scope.loadTriggerActions();
    };

    app.controller('triggerConfigController', triggerConfigController);
}());