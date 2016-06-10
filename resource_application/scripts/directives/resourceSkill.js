/**
 * Created by Rajinda on 5/30/2016.
 */
mainApp.directive("resourceskill", function ($filter, $uibModal, resourceService) {

    return {
        restrict: "EAA",
        scope: {
            attachtask: "=",
            attributelist:'=',
            resourceid:'@?'
        },

        templateUrl: 'resource_application/partials/template/resourceSkill.html',

        link: function (scope, element, attributes) {

            scope.selectedTask = {'task': {}, 'resourceId': scope.resourceid,'attributes':[],'selectedAttribute':[]};
            angular.copy(scope.attachtask, scope.selectedTask.task);
            angular.copy(scope.attributelist, scope.selectedTask.attributes);

            scope.attachedAttribute={'selectedAttribute':[],'Percentage':{}};

            scope.addAttributetoTask = function () {


                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'resource_application/partials/template/addSkillToTask.html',
                    controller: 'addSkillModalInstanceCtrl',
                    size: 'lm',
                    resolve: {
                        selectedTask: function () {
                            return scope.selectedTask;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {

                    scope.attachedAttribute={'selectedAttribute':selectedItem.selectedAttribute,'Percentage':selectedItem.Percentage};
                    console.info("sadasdasda");
                }, function () {
                    console.info('Modal dismissed at: ' + new Date());
                });
            };
        }

    }
});