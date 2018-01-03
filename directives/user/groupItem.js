/**
 * Created by Pawan on 1/3/2018.
 */
mainApp.directive("groupitemview", function ($filter, $uibModal, userProfileApiAccess) {

    return {
        restrict: "EAA",
        scope: {
            group: "=",
            selectedGroup:"=",
            units:"=",
            'checkEditing':"&",
            editing:"="

        },

        templateUrl: 'views/user/partials/groupItem.html',

        link: function (scope) {

            scope.showUnits=false;


            scope.showAlert = function (title, type, content) {

                new PNotify({
                    title: title,
                    text: content,
                    type: type,
                    styling: 'bootstrap3'
                });
            };

            scope.showBUnits = function () {
                scope.showUnits=!scope.showUnits;
                scope.checkEditing();

            };

            scope.updateGroupBUnit = function () {

                var updateObj =
                    {
                        businessUnit:scope.group.businessUnit
                    }


                    userProfileApiAccess.updateUserGroup(scope.group._id,updateObj).then(function (resUpdate) {
                        if(resUpdate.IsSuccess)
                        {
                            scope.showAlert("Business Unit","success","BusinessYUnit of Group updated successfully");
                        }
                        else
                        {
                            scope.showAlert("Business Unit","error","Error in updating Business Unit of Group");
                        }
                    },function (errUpdate) {
                        scope.showAlert("Business Unit","error","Error in updating Business Unit of Group");
                    });

            }

            scope.emptyBUnit = function () {
                scope.group.businessUnit=null;
            }





        }

    }
});