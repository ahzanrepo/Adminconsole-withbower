/**
 * Created by Heshan.i on 10/19/2016.
 */


(function(){
    var app =angular.module('veeryConsoleApp');

    var caseConfigController = function($scope, $state, $filter, caseApiAccess,loginService) {
        $scope.caseConfigs = [];
        $scope.caseConfig = {};
        $scope.searchCriteria = "";

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
                loginService.isCheckResponse(err);
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
                    $scope.searchCriteria = "";
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
                loginService.isCheckResponse(err);
                var errMsg = "Error occurred while saving case configuration";
                if(err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Case Configuration', errMsg, 'error');
            });
        };





        // tag selection

        // load tag List
        $scope.tags = [];
        $scope.loadTags = function () {
            caseApiAccess.getAllTags().then(function (response) {
                $scope.tagList = response;
            }, function (err) {
                loginService.isCheckResponse(err);
                $scope.showAlert("Load Tags", "error", "Fail To Get Tag List.")
            });
        };
        $scope.loadTags();

        $scope.loadTagCategories = function () {
            caseApiAccess.getTagCategories().then(function (response) {
                $scope.tagCategoryList = response;
                $scope.availableTags = $scope.tagCategoryList;
            }, function (err) {
                loginService.isCheckResponse(err);
                $scope.showAlert("Load Tags", "error", "Fail To Get Tag List.")
            });
        };
        $scope.loadTagCategories();


        function createTagFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(group) {
                return (group.name.toLowerCase().indexOf(lowercaseQuery) != -1);
            };
        }

        $scope.queryTagSearch = function (query) {
            if (query === "*" || query === "") {
                if ($scope.availableTags) {
                    return $scope.availableTags;
                }
                else {
                    return [];
                }

            }
            else {
                var results = query ? $scope.availableTags.filter(createTagFilterFor(query)) : [];
                return results;
            }

        };

        $scope.tagSelectRoot = 'root';

        $scope.onChipAddTag = function (chip) {
            if (!chip.tags || (chip.tags.length === 0)) {
                setToDefault();
                return;
            }

            if (chip.tags) {
                if (chip.tags.length > 0) {

                    var tempTags = [];
                    angular.forEach(chip.tags, function (item) {

                        if (!angular.isObject(item)) {

                            var tags = $filter('filter')($scope.tagList, {_id: item}, true);
                            tempTags = tempTags.concat(tags);

                        } else {
                            tempTags = tempTags.concat(item);
                        }
                    });
                    $scope.availableTags = tempTags;

                    return;
                }
            }


        };
        $scope.loadPostTags = function (query) {
            return $scope.postTags;
        };

        var removeDuplicate = function (arr) {
            var newArr = [];
            angular.forEach(arr, function (value, key) {
                var exists = false;
                angular.forEach(newArr, function (val2, key) {
                    if (angular.equals(value.name, val2.name)) {
                        exists = true
                    }
                    ;
                });
                if (exists == false && value.name != "") {
                    newArr.push(value);
                }
            });
            return newArr;
        };

        $scope.newAddTags = [];
        $scope.postTags = [];

        var setToDefault = function () {
            var ticTag = undefined;
            angular.forEach($scope.newAddTags, function (item) {
                if (ticTag) {
                    ticTag = ticTag + "." + item.name;
                } else {
                    ticTag = item.name;
                }

            });
            if (ticTag) {
                $scope.postTags.push({name: ticTag});
                $scope.postTags = removeDuplicate($scope.postTags);
                $scope.caseConfig.configurationRule = $scope.postTags[0].name;
            }

            $scope.newAddTags = [];
            $scope.availableTags = $scope.tagCategoryList;
            $scope.tagSelectRoot = 'root';
        };

        $scope.onChipDeleteTag = function (chip) {
            setToDefault();

        };


        $scope.loadCaseConfigs();
    };

    app.controller('caseConfigController', caseConfigController);
}());