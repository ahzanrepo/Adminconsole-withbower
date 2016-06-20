/**
 * Created by Rajinda on 5/30/2016.
 */
mainApp.directive("editgroups", function ($filter,attributeService) {

    return {
        restrict: "EA",
        scope: {
            groupinfo: "=",
            attribinfo:"=",
            taskList:"=",
            'updateGroups': '&'
        },

        templateUrl: 'attribute_application/partials/template/editGroups.html',
        /*template: '<span class="count_top"  ><i class="fa fa-user" ></i> {{fileCount.Category| uppercase}}</span><div class="count green">{{fileCount.Count}}</div><span class="count_bottom"><i class="green"><i class="fa fa-sort-asc"></i>Total Number of Files</i></span>',*/

        link: function (scope, element, attributes) {
            scope.attachedAttributes = [];
            $(document).ready(function () {
                angular.forEach(scope.groupinfo.ResAttributeGroups, function(item){
                    if(item){
                      if(item.ResAttribute){
                          scope.attachedAttributes.push(item.ResAttribute);
                      }
                    }
                });

                scope.groupinfo.Attributes = scope.attachedAttributes;


                $(".select2_multiple").select2({
                    placeholder: "Selection Attributes",
                    allowClear: true
                });
            });


            scope.selectionsChanged = function (attributes) {

            };

            scope.editGroup = function () {
                scope.editMode = !scope.editMode;
            };
            scope.editMode = false;

            scope.updateGroup = function (item) {

               /* //remove existing attachments
                angular.forEach(scope.attachedAttributes, function(a){
                    var index = item.Attributes.indexOf(a);
                    if (index != -1) {
                        item.Attributes.splice(index, 1);
                    }
                });

                // find deleted attachments
                angular.forEach(item.Attributes, function(a){

                    var index = scope.attachedAttributes.indexOf(a);
                    if (index != -1) {
                        scope.attachedAttributes.splice(index, 1);
                    }
                });*/

                scope.tempOld=[];
                angular.copy(scope.attachedAttributes,scope.tempOld );
                attributeService.DeleteAttributeFrmGroup(item.Attributes,scope.tempOld,item.GroupId);

                attributeService.UpdateGroup(item,scope.attachedAttributes,item.GroupId).then(function (response) {

                    if (response) {
                        console.info("UpdateAttributes : " + response);
                        scope.editMode = false;
                    }
                }, function (error) {
                    console.info("UpdateAttributes err" + error);
                });
            };

            scope.deleteGroup = function (item) {

                scope.showConfirm("Delete File", "Delete", "ok", "cancel", "Do you want to delete " + item.GroupName, function (obj) {

                    attributeService.DeleteGroup(item).then(function (response) {
                        if (response) {
                            scope.updateGroups(item);
                            scope.showAlert("Deleted", "Deleted", "ok", "File " + item.GroupName + " Deleted successfully");
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
                    type: 'success',
                    styling: 'bootstrap3'
                });
            };

            /*scope.attribData = [];
            scope.GetAttributes = function () {
                attributeService.GetAttributes().then(function (response) {
                    scope.attribData = response;
                }, function (error) {
                    scope.showAlert("Error", "Error", "ok", "There is an error ");
                });
                scope.GetAttributes();
            };*/
        }

    }
});