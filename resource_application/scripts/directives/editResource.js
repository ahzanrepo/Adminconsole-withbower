/**
 * Created by Rajinda on 5/30/2016.
 */
mainApp.directive("editresource", function ($filter, $uibModal, resourceService) {

    return {
        restrict: "EAA",
        scope: {
            resource: "=",
            tasks: "=",
            'updateRecource': '&',
            'pageReload': '&'
        },

        templateUrl: 'resource_application/partials/template/editResource.html',

        link: function (scope, element, attributes) {


            scope.attachedTask = [];
            scope.deletedTask = [];


            scope.availableTask = [];

            angular.copy(scope.tasks, scope.availableTask);

            angular.forEach(scope.resource.ResResourceTask, function (item) {
                try{
                    if (item) {
                        var items = $filter('filter')(scope.availableTask, {TaskId: item.TaskId})
                        if (items) {
                            var index = scope.availableTask.indexOf(items[0]);
                            if (index > -1) {
                                var temptask = scope.availableTask[index];
                                temptask.Concurrency = item.Concurrency;
                                scope.attachedTask.push(temptask);
                                scope.availableTask.splice(index, 1);
                            }
                        }
                    }}
                catch(ex){
                    console.info("Err-angular.forEach");
                }
            });

            scope.resource.tasks = scope.attachedTask;

            $(document).ready(function () {

                $(".select2_multiple").select2({
                    placeholder: "Select Tasks",
                    allowClear: true
                });
            });

            scope.editMode = false;
            scope.editResource = function () {
                scope.editMode = !scope.editMode;
            };

            scope.UpdateResource = function (item) {
                resourceService.DeleteTaskToResource(scope.deletedTask, item);
                resourceService.AssignTaskToResource(scope.attachedTask, item);
                resourceService.UpdateResource(item).then(function (response) {
                    if (response) {
                        console.info("UpdateResource : " + response);
                        scope.editMode = false;
                        scope.pageReload();
                    }
                }, function (error) {
                    console.info("UpdateAttributes err" + error);
                });


            };

            scope.deleteResource = function (item) {

                scope.showConfirm("Delete File", "Delete", "ok", "cancel", "Do you want to delete " + item.ResourceName, function (obj) {

                    resourceService.DeleteResource(item.ResourceId).then(function (response) {
                        if (response) {
                            scope.updateRecource(item);
                            scope.showAlert("Deleted", "Deleted", "ok", "File " + item.ResourceName + " Deleted successfully");
                        }
                        else
                            scope.showAlert("Error", "Error", "ok", "There is an error ");
                    }, function (error) {
                        scope.showAlert("Error", "Error", "ok", "There is an error ");
                    });

                }, function () {

                }, item);


            };

            scope.showConfirm = function (tittle, label, okbutton, cancelbutton, content, OkCallback, CancelCallBack, okObj) {

                (new PNotify({
                    title: tittle,
                    text: content,
                    icon: 'glyphicon glyphicon-question-sign',
                    hide: false,
                    confirm: {
                        confirm: true
                    },
                    buttons: {
                        closer: false,
                        sticker: false
                    },
                    history: {
                        history: false
                    }
                })).get().on('pnotify.confirm', function () {
                        OkCallback("confirm");
                    }).on('pnotify.cancel', function () {

                    });

            };

            scope.showAlert = function (tittle, label, button, content) {

                new PNotify({
                    title: tittle,
                    text: content,
                    type: 'notice',
                    styling: 'bootstrap3'
                });
            };

            scope.selectedTask = {};

            scope.setCurrentDrag=function(task){
                scope.selectedTask=task;
            };

            scope.beforeDrop = function (size) {

                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'resource_application/partials/template/myModalContent.html',
                    controller: 'ModalInstanceCtrl',
                    size: 'sm',
                    resolve: {
                        selectedTask: function () {
                            return scope.selectedTask;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    scope.selected = selectedItem;

                   /* var items = $filter('filter')(scope.tasks, {TaskId: selectedItem.TaskId})
                    if (items) {
                        var index = scope.tasks.indexOf(items[0]);
                        if (index > -1) {
                            scope.tasks[index] = selectedItem;
                        }
                    }
                    console.info('Modal at: ' + new Date());*/
                }, function () {
                    console.info('Modal dismissed at: ' + new Date());
                });
            };


        }

    }
});