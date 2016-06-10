/**
 * Created by Rajinda on 5/30/2016.
 */
mainApp.directive("editresource", function ($filter, $uibModal, resourceService) {

    return {
        restrict: "EAA",
        scope: {
            resource: "=",
            tasks: "=",
            attributes: '=',
            'updateRecource': '&',
            'pageReload': '&'
        },

        templateUrl: 'resource_application/partials/template/editResource.html',

        link: function (scope, element, attributes) {

            $(document).ready(function () {

                <!-- jQuery Knob -->
                $(function($) {

                    $(".knob").knob({
                        change: function(value) {
                            //console.log("change : " + value);
                        },
                        release: function(value) {
                            //console.log(this.$.attr('value'));
                            console.log("release : " + value);
                        },
                        cancel: function() {
                            console.log("cancel : ", this);
                        },
                        /*format : function (value) {
                         return value + '%';
                         },*/
                        draw: function() {

                            // "tron" case
                            if (this.$.data('skin') == 'tron') {

                                this.cursorExt = 0.3;

                                var a = this.arc(this.cv) // Arc
                                    ,
                                    pa // Previous arc
                                    , r = 1;

                                this.g.lineWidth = this.lineWidth;

                                if (this.o.displayPrevious) {
                                    pa = this.arc(this.v);
                                    this.g.beginPath();
                                    this.g.strokeStyle = this.pColor;
                                    this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, pa.s, pa.e, pa.d);
                                    this.g.stroke();
                                }

                                this.g.beginPath();
                                this.g.strokeStyle = r ? this.o.fgColor : this.fgColor;
                                this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, a.s, a.e, a.d);
                                this.g.stroke();

                                this.g.lineWidth = 2;
                                this.g.beginPath();
                                this.g.strokeStyle = this.o.fgColor;
                                this.g.arc(this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
                                this.g.stroke();

                                return false;
                            }
                        }
                    });

                    // Example of infinite knob, iPod click wheel
                    var v, up = 0,
                        down = 0,
                        i = 0,
                        $idir = $("div.idir"),
                        $ival = $("div.ival"),
                        incr = function() {
                            i++;
                            $idir.show().html("+").fadeOut();
                            $ival.html(i);
                        },
                        decr = function() {
                            i--;
                            $idir.show().html("-").fadeOut();
                            $ival.html(i);
                        };
                    $("input.infinite").knob({
                        min: 0,
                        max: 20,
                        stopper: false,
                        change: function() {
                            if (v > this.cv) {
                                if (up) {
                                    decr();
                                    up = 0;
                                } else {
                                    up = 1;
                                    down = 0;
                                }
                            } else {
                                if (v < this.cv) {
                                    if (down) {
                                        incr();
                                        down = 0;
                                    } else {
                                        down = 1;
                                        up = 0;
                                    }
                                }
                            }
                            v = this.cv;
                        }
                    });
                });
                <!-- /jQuery Knob -->
                $(".select2_multiple").select2({
                    placeholder: "Select Attribute",
                    allowClear: true
                });
            });
            scope.selectedTask = {'task': {}, 'resourceId': scope.resource.ResourceId, 'attributes': scope.attributes};

            scope.attachedTask = [];
            scope.deletedTask = [];
            scope.availableTask = [];
            angular.copy(scope.tasks, scope.availableTask);

            console.info("ResResourceTask[edit resource] Count : " + scope.resource.ResResourceTask.length);
            console.info("tasks[edit resource] Count : " + scope.tasks.length);
            console.info("availableTask[edit resource] Count : " + scope.availableTask.length);

            angular.forEach(scope.resource.ResResourceTask, function (item) {
                try {
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
                    }
                }
                catch (ex) {
                    console.info("Err-angular.forEach");
                }
            });

            scope.resource.tasks = scope.attachedTask;

            console.info("1ResResourceTask[edit resource] Count : " + scope.resource.ResResourceTask.length);
            console.info("1tasks[edit resource] Count : " + scope.tasks.length);
            console.info("1availableTask[edit resource] Count : " + scope.availableTask.length);

            $(document).ready(function () {
                console.info("ready......................");
            });

            scope.editMode = false;
            scope.editResource = function () {
                scope.editAttribute = false;
                scope.editMode = !scope.editMode;
            };

            scope.editAttribute = false;
            scope.assignAttribute = function () {
                scope.editMode = false;
                scope.editAttribute = !scope.editAttribute;

            };

            scope.UpdateResource = function (item) {

                resourceService.UpdateResource(item).then(function (response) {
                    if (response) {
                        console.info("UpdateResource : " + response);
                        scope.editMode = false;
                        /*scope.pageReload();*/
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

            scope.setCurrentDrag = function (task, section) {
                scope.selectedTask.task = task;
                scope.selectedTask.resourceId = scope.resource.ResourceId;
                if (section == "available")
                    scope.selectedTask.task.Concurrency = 0;
            };

            scope.deleteTask = function (size) {
                resourceService.DeleteTaskToResource(scope.selectedTask.resourceId, scope.selectedTask.task.TaskId).then(function (response) {
                    if (response) {
                        scope.GetTaskAttachToResource();
                        console.info("DeleteTaskToResource : ");
                    }
                }, function (error) {
                    console.info("DeleteTaskToResource err" + error);
                });
            };

            scope.assignTask = function (size) {

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
                    console.info("AssignTaskToResource.................................... ");
                    scope.selected = selectedItem;
                    resourceService.AssignTaskToResource(selectedItem.resourceId, selectedItem.task.TaskId, selectedItem.task.Concurrency).then(function (response) {
                        if (response.IsSuccess) {
                            scope.GetTaskAttachToResource();
                            var items = $filter('filter')(scope.attachedTask, {TaskId: response.Result.TaskId});
                            if (items) {
                                var index = scope.attachedTask.indexOf(items[0]);
                                if (index > -1) {
                                    scope.attachedTask[index].ResTask = response.Result;
                                }
                            }
                        }
                    }, function (error) {
                        console.info("AssignTaskToResource err" + error);
                    });

                }, function () {
                    console.info('Modal dismissed at: ' + new Date());
                });
            };


            /*Load Attached Task*/
            scope.taskAttachToResource = {};
            scope.GetTaskAttachToResource = function () {
                resourceService.GetTaskAttachToResource(scope.resource.ResourceId).then(function (response) {
                    scope.taskAttachToResource = response;
                    if (response)
                        scope.selectTask(scope.taskAttachToResource[0])
                }, function (error) {
                    console.info("DeleteTaskToResource err" + error);
                });
            };
            scope.GetTaskAttachToResource();

            /*assign Attribute to Task*/
            scope.selectedAttributes = [];
            scope.assignSkill_selectedTask = {'task': {}, 'attributes': []};
            scope.selectTask = function (task) {
                scope.selectedAttributes = [];
                scope.assignSkill_selectedTask.task = task;
                angular.copy(scope.attributes, scope.assignSkill_selectedTask.attributes);
                scope.GetAttributesAttachToResource(task.ResTaskId);
            };

            scope.selectedAttribute = {};
            scope.curentDragAttribute = function (item) {
                scope.selectedAttribute = item;
                scope.selectedAttribute.Percentage = 50;
                scope.selectedAttribute.OtherData = "";
            };

            scope.GetAttributesAttachToResource = function (resTaskId) {
                resourceService.GetAttributesAttachToResource(resTaskId).then(function (response) {
                    angular.forEach(response.ResResourceAttributeTask,function(item){

                        try {
                            if (item) {
                                var items = $filter('filter')(scope.assignSkill_selectedTask.attributes, {AttributeId: item.AttributeId})
                                if (items) {
                                    var index = scope.assignSkill_selectedTask.attributes.indexOf(items[0]);
                                    if (index > -1) {
                                        var temptask = scope.assignSkill_selectedTask.attributes[index];
                                        temptask.Percentage = item.Percentage;
                                        scope.selectedAttributes.push(temptask);
                                        scope.assignSkill_selectedTask.attributes.splice(index, 1);
                                    }
                                }
                            }
                        }
                        catch (ex) {
                            console.info("GetAttributesAttachToResource.forEach");
                        }

                    });


                }, function (error) {
                    console.info("UpdateAttributes err" + error);
                });
            };

            scope.UpdateAttachedTask = function (data) {
                resourceService.UpdateAttachedTask(scope.resource.ResourceId, data.ResTask.TaskId, data).then(function (response) {

                }, function (error) {
                    console.info("UpdateAttributes err" + error);
                });
            };


            scope.assignAttributeToTask = function (e) {

                resourceService.AttachAttributeToTask(scope.assignSkill_selectedTask.task.ResTaskId, scope.selectedAttribute.AttributeId, scope.selectedAttribute.Percentage, scope.selectedAttribute.OtherData).then(function (response) {

                    if (response.IsSuccess) {
                        scope.selectedAttribute.savedObj = response.Result;
                    }
                    else {
                        var index = scope.selectedAttributes.indexOf(scope.selectedAttribute);
                        if (index > -1) {
                            scope.selectedAttributes.splice(index, 1);
                            scope.assignSkill_selectedTask.attributes.push(scope.selectedAttribute)
                        }
                    }
                }, function (error) {
                    console.info("AssignTaskToResource err" + error);
                });
            };

            scope.deleteAttributeAssignToTask = function (e) {

                resourceService.DeleteAttributeAssignToTask(scope.selectedAttribute.savedObj.ResAttId).then(function (response) {

                    if (!response.IsSuccess) {
                        var index = scope.assignSkill_selectedTask.attributes.indexOf(scope.selectedAttribute);
                        if (index > -1) {
                            scope.selectedAttributes.push(scope.selectedAttribute);
                            scope.assignSkill_selectedTask.attributes.splice(index, 1);
                        }
                    }
                }, function (error) {
                    console.info("AssignTaskToResource err" + error);
                });
            };
        }

    }
});