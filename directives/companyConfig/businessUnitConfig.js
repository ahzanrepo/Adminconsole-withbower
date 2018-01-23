/**
 * Created by Pawan on 1/2/2018.
 */
mainApp.directive("bisunit", function (userProfileApiAccess) {


    return {
        restrict: "EAA",
        scope: {
            unit: "=",
            headusers:"=",
            groups:"=",
            updateobjs:"="
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
            };
            function createFilterForGroups(query) {
                var lowercaseQuery = angular.lowercase(query);
                return function filterFn(group) {
                    return (group.name.toLowerCase().indexOf(lowercaseQuery) != -1);
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
            scope.querySearchGroups = function (query) {
                if (query === "*" || query === "") {
                    if (scope.groups) {
                        return scope.groups;
                    }
                    else {
                        return [];
                    }

                }
                else {
                    var results = query ? scope.groups.filter(createFilterForGroups(query)) : [];
                    return results;
                }

            };

            scope.onChipAdd = function (chip) {

                scope.updateGroupBUnit(scope.unit.unitName,chip._id);

            };
            scope.onChipDelete = function (chip) {

               /* var index = $scope.attributeGroups.indexOf(chip.GroupId);
                console.log("index ", index);
                if (index > -1) {
                    $scope.attributeGroups.splice(index, 1);
                    console.log("rem attGroup " + $scope.attributeGroups);
                }*/
                scope.updateGroupBUnit("",chip._id);


            };

            scope.updateGroupBUnit = function (bUnit,groupId) {


                var updateObj =
                    {
                        businessUnit:bUnit
                    }


                userProfileApiAccess.updateUserGroup(groupId,updateObj).then(function (resUpdate) {
                    if(resUpdate.IsSuccess)
                    {
                        scope.showAlert("Business Unit","Update Groups of Business Unit successfully","success");
                        scope.updateobjs(groupId,bUnit);

                    }
                    else
                    {
                        scope.showAlert("Business Unit","Error in updating Groups of Business Unit ","error");
                    }
                },function (errUpdate) {
                    scope.showAlert("Business Unit","Error in updating Groups of  Business Unit ","error");
                });



            }


        }

    }
});