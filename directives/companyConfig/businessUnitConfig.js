/**
 * Created by Pawan on 1/2/2018.
 */
mainApp.directive("bisunit", function (userProfileApiAccess) {


    return {
        restrict: "EAA",
        scope: {
            unit: "=",
            headusers:"="
        },

        templateUrl: 'views/companyConfig/partials/businessUnitList.html',

        link: function (scope) {

            scope.editBUnit=false;

            scope.showAlert = function (title,content,type) {

                new PNotify({
                    title: title,
                    text: content,
                    type: type,
                    styling: 'bootstrap3'
                });
            };
            scope.changeEditMode = function () {
                scope.editBUnit=!scope.editBUnit;
            }
            scope.closeEdit = function () {
                scope.editBUnit=false;
            };
            scope.updateBusinessUnit = function () {
                userProfileApiAccess.updateBusinessUnit(scope.unit.unitName,scope.unit).then(function (resUpdate) {
                    if(resUpdate.IsSuccess)
                    {
                        scope.showAlert("Update Business Unit","Successfully updated Business Unit","success");
                    }
                    else
                    {
                        scope.showAlert("Update Business Unit","Error in updating Business Unit","error");
                    }
                },function (errUpdate) {
                    scope.showAlert("Update Business Unit","Error in updating Business Unit","error");
                });
            }

            function createFilterFor(query) {
                var lowercaseQuery = angular.lowercase(query);
                return function filterFn(group) {
                    return (group.username.toLowerCase().indexOf(lowercaseQuery) != -1);
                    ;
                };
            }

            /* $scope.querySearch = function(query) {
             var results = query ? $scope.groups.filter(createFilterFor(query)) : [];
             return results;
             };*/


            scope.querySearch = function (query) {
                if (query === "*" || query === "") {
                    if (scope.headusers) {
                        return scope.headusers;
                    }
                    else {
                        return [];
                    }

                }
                else {
                    var results = query ? scope.headusers.filter(createFilterFor(query)) : [];
                    return results;
                }

            };

        }

    }
});