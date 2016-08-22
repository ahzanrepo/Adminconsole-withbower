/**
 * Created by Heshan.i on 8/22/2016.
 */
(function(){
    var app =angular.module('veeryConsoleApp');

    var editFilter = function(triggerApiAccess){
        return {
            restrict: "EA",
            scope: {
                triggerId: "=",
                filter: "=",
                filterIndex: "=",
                filterType:"=",
                'updateFilters': '&'
            },

            templateUrl: 'views/ticket-trigger/editTriggerFilters.html',

            link: function (scope) {

                scope.editFilter = function(){
                    scope.editMode=!scope.editMode;
                };
                scope.editMode=false;

                scope.deleteFilter = function() {

                    scope.showConfirm("Delete Filter", "Delete", "ok", "cancel", "Do you want to delete " + scope.filter.field, function (obj) {
                        switch (filterType){
                            case "any":
                                triggerApiAccess.removeFilterAny(scope.triggerId, scope.filter._id.toString()).then(function (response) {
                                    if (response) {
                                        scope.updateFiltersAny(scope.filter, filterType);
                                        scope.showAlert("Deleted", "Deleted", "ok", "File " + scope.filter.field + " Deleted successfully");
                                    }
                                    else
                                        scope.showError("Error", "Error", "ok", "There is an error ");
                                }, function (error) {
                                    scope.showError("Error", "Error", "ok", "There is an error ");
                                });
                                break;
                            case "all":
                                triggerApiAccess.removeFilterAll(scope.triggerId, scope.filter._id.toString()).then(function (response) {
                                    if (response) {
                                        scope.updateFiltersAll(scope.filter, filterType);
                                        scope.showAlert("Deleted", "Deleted", "ok", "File " + scope.filter.field + " Deleted successfully");
                                    }
                                    else
                                        scope.showError("Error", "Error", "ok", "There is an error ");
                                }, function (error) {
                                    scope.showError("Error", "Error", "ok", "There is an error ");
                                });
                                break;
                            default :
                                break;
                        }
                    }, function () {

                    }, scope.filter);


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

    app.directive('editFilter', editFilter)
}());