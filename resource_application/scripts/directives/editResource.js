/**
 * Created by Rajinda on 5/30/2016.
 */
mainApp.directive("editresource", function ($filter,resourceService) {

    return {
        restrict: "EAA",
        scope: {
            resource: "=",
            tasks: "=",
            'updateRecource': '&'
        },

        templateUrl: 'resource_application/partials/template/editResource.html',

        link: function (scope, element, attributes) {

            scope.attachedTasks=[];
            $(document).ready(function () {
                angular.forEach(scope.resource.ResResourceTask, function(item){
                    if(item){

                        var items = $filter('filter')(scope.tasks, {TaskId: item.TaskId})
                        if (items) {
                            var index = scope.tasks.indexOf(items[0]);
                            scope.attachedTasks.push(scope.tasks[index]);
                        }
                    }
                });

                scope.resource.tasks = scope.attachedTasks;

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
                resourceService.UpdateResource(item).then(function (response) {
                    if (response) {
                        console.info("UpdateAttributes : " + response);
                        scope.editMode = false;
                    }
                }, function (error) {
                    console.info("UpdateAttributes err" + error);
                });

                scope.tempOld=[];
                angular.copy(scope.attachedTasks,scope.tempOld );
                resourceService.DeleteTaskToResource(item.tasks,scope.tempOld,item);
                resourceService.AssignTaskToResource(item.tasks,scope.attachedTasks,item);

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
        }

    }
});