/**
 * Created by Heshan.i on 8/16/2016.
 */
(function(){
    var app =angular.module('veeryConsoleApp');

    var editAction = function(triggerApiAccess){
        return {
            restrict: "EA",
            scope: {
                triggerId: "=",
                action: "=",
                actionIndex: "=",
                'updateActions': '&'
            },

            templateUrl: 'views/ticket-trigger/editTriggerActions.html',

            link: function (scope) {

                scope.editAction = function(){
                    scope.editMode=!scope.editMode;
                };
                scope.editMode=false;

                scope.deleteAction = function() {

                    scope.showConfirm("Delete Action", "Delete", "ok", "cancel", "Do you want to delete " + scope.action.field, function (obj) {

                        triggerApiAccess.removeAction(scope.triggerId, scope.action._id.toString()).then(function (response) {
                            if (response) {
                                scope.updateActions(scope.action);
                                scope.showAlert("Deleted", "Deleted", "ok", "File " + scope.action.field + " Deleted successfully");
                            }
                            else
                                scope.showError("Error", "Error", "ok", "There is an error ");
                        }, function (error) {
                            scope.showError("Error", "Error", "ok", "There is an error ");
                        });

                    }, function () {

                    }, scope.action);


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

                scope.showError = function (tittle,content) {

                    new PNotify({
                        title: tittle,
                        text: content,
                        type: 'error',
                        styling: 'bootstrap3'
                    });
                };
            }

        }
    };

    app.directive('editAction', editAction)
}());