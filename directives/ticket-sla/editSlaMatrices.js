/**
 * Created by Heshan.i on 9/14/2016.
 */


(function(){
    var app =angular.module('veeryConsoleApp');

    var editSlaMatrices = function(slaApiAccess){
        return {
            restrict: "EA",
            scope: {
                slaId: "=",
                matrix: "=",
                matrixIndex: "=",
                'updateMatrices': '&'
            },

            templateUrl: 'views/ticket-sla/editSlaMatices.html',

            link: function (scope) {

                scope.editFilter = function(){
                    scope.editMode=!scope.editMode;
                };
                scope.editMode=false;

                scope.deleteMatrix = function() {

                    scope.showConfirm("Delete Matrix", "Delete", "ok", "cancel", "Do you want to delete Matrix?", function (obj) {
                        slaApiAccess.removeMatrix(scope.slaId, scope.matrix._id.toString()).then(function (response) {
                                    if (response) {
                                        scope.updateMatrices(scope.matrix, scope.filterType);
                                        scope.showAlert("Deleted", "Deleted", "ok", "File " + scope.filter.field + " Deleted successfully");
                                    }
                                    else
                                        scope.showError("Error", "Error", "ok", "There is an error ");
                                }, function (error) {
                                    scope.showError("Error", "Error", "ok", "There is an error ");
                                });
                    }, function () {

                    }, scope.matrix);


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

    app.directive('editSlaMatrices', editSlaMatrices)
}());