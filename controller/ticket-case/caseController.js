/**
 * Created by Heshan.i on 10/19/2016.
 */

(function () {
    var app = angular.module('veeryConsoleApp');

    var caseController = function ($scope, $state, caseApiAccess, loginService) {
        $scope.caseInfos = [];
        $scope.caseInfo = {};
        $scope.searchCriteria = "";
        $scope.searchOption = "activeCases";

        $scope.showAlert = function (title, content, type) {
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
            //$state.reload();
            $scope.loadCases();
        };

        $scope.filterCases = function () {
            switch ($scope.searchOption) {
                case 'activeCases':
                    $scope.caseInfos = $scope.tempCaseInfos.map(function (caseI) {
                        if (caseI.active) {
                            return caseI
                        }
                    });
                    break;
                case 'deactivateCases':
                    $scope.caseInfos = $scope.tempCaseInfos.map(function (caseI) {
                        if (!caseI.active) {
                            return caseI
                        }
                    });
                    break;
                default :
                    $scope.caseInfos = $scope.tempCaseInfos;
                    break;
            }
        };

        $scope.loadCases = function () {
            caseApiAccess.getCases().then(function (response) {
                if (response.IsSuccess) {
                    $scope.tempCaseInfos = response.Result;
                    switch ($scope.searchOption) {
                        case 'activeCases':
                            $scope.caseInfos = $scope.tempCaseInfos.map(function (caseI) {
                                if (caseI.active) {
                                    return caseI
                                }
                            });
                            break;
                        case 'deactivateCases':
                            $scope.caseInfos = $scope.tempCaseInfos.map(function (caseI) {
                                if (!caseI.active) {
                                    return caseI
                                }
                            });
                            break;
                        default :
                            $scope.caseInfos = $scope.tempCaseInfos;
                            break;
                    }
                }
                else {
                    var errMsg = response.CustomMessage;

                    if (response.Exception) {
                        errMsg = response.Exception.Message;
                    }
                    $scope.showAlert('Case', errMsg, 'error');
                }
            }, function (err) {
                loginService.isCheckResponse(err);
                var errMsg = "Error occurred while loading cases";
                if (err.statusText) {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Case', errMsg, 'error');
            });
        };

        $scope.saveCase = function () {
            caseApiAccess.createCase($scope.caseInfo).then(function (response) {
                if (response.IsSuccess) {
                    $scope.caseInfos = response.Result;
                    $scope.showAlert('Case', 'Case Added Successfully.', 'success');
                    $scope.searchCriteria = "";
                    $scope.loadCases();
                    //$state.reload();
                }
                else {
                    var errMsg = response.CustomMessage;
                    console.log(errMsg);
                    //if(response.Exception)
                    //{
                    //    errMsg = response.Exception.Message;
                    //}
                    $scope.showAlert('Case', 'Entered Case Added Error.', 'error');
                }
            }, function (err) {
                loginService.isCheckResponse(err);
                var errMsg = "Error occurred while saving case";
                //if(err.statusText)
                //{
                //    errMsg = err.statusText;
                //}
                $scope.showAlert('Case', errMsg, 'error');
            });
        };

        $scope.loadCases();
    };

    app.controller('caseController', caseController);
}());