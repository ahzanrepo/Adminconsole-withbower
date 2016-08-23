/**
 * Created by Heshan.i on 8/23/2016.
 */
(function(){
    var app =angular.module('veeryConsoleApp');

    var editOperation = function(triggerApiAccess){
        return {
            restrict: "EA",
            scope: {
                triggerId: "=",
                operation: "=",
                operationIndex: "=",
                'updateOperations': '&'
            },

            templateUrl: 'views/ticket-trigger/editTriggerOperations.html',

            link: function (scope) {
                scope.editOperation = function(){
                    scope.editMode=!scope.editMode;
                };
                scope.editMode=false;

                scope.deleteOperation = function() {

                    scope.showConfirm("Delete Action", "Delete", "ok", "cancel", "Do you want to delete " + scope.operation.name, function (obj) {

                        triggerApiAccess.removeOperations(scope.triggerId, scope.operation._id.toString()).then(function (response) {
                            if (response) {
                                scope.updateOperations(scope.operation);
                                scope.showAlert("Deleted", "Deleted", "ok", "File " + scope.operation.name + " Deleted successfully");
                            }
                            else
                                scope.showError("Error", "Error", "ok", "There is an error ");
                        }, function (error) {
                            scope.showError("Error", "Error", "ok", "There is an error ");
                        });

                    }, function () {

                    }, scope.operation);


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

    app.directive('editOperation', editOperation)
}());