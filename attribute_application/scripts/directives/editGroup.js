/**
 * Created by Rajinda on 5/30/2016.
 */
mainApp.directive("editgroups", function (attributeService) {

    return {
        restrict: "EA",
        scope: {
            groupinfo: "=",
            'updateGroups': '&'
        },

        templateUrl: 'attribute_application/partials/template/editGroups.html',
        /*template: '<span class="count_top"  ><i class="fa fa-user" ></i> {{fileCount.Category| uppercase}}</span><div class="count green">{{fileCount.Count}}</div><span class="count_bottom"><i class="green"><i class="fa fa-sort-asc"></i>Total Number of Files</i></span>',*/

        link: function (scope, element, attributes) {

            scope.list_of_string = ['tag1', 'tag2']
            scope.select2Options = {
                'multiple': true,
                'simple_tags': true,
                'tags': ['tag1', 'tag2', 'tag3', 'tag4']  // Can be empty list.
            };

            scope.editGroup = function(){
                scope.editMode=!scope.editMode;
            };
            scope.editMode=false;

            scope.updateGroup = function(item) {

                attributeService.UpdateGroup(item).then(function (response) {
                    if (response) {
                        console.info("UpdateAttributes : " + response);
                        scope.editMode=false;
                    }
                }, function (error) {
                    console.info("UpdateAttributes err" + error);
                });
            };

            scope.deleteGroup = function(item) {

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
                    type: 'notice',
                    styling: 'bootstrap3'
                });
            };
        },

    }
});