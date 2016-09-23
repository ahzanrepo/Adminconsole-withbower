/**
 * Created by Heshan.i on 9/14/2016.
 */


(function(){
    var app =angular.module('veeryConsoleApp');

    var editSlaFilter = function(slaApiAccess){
        return {
            restrict: "EA",
            scope: {
                slaId: "=",
                filter: "=",
                filterIndex: "=",
                filterType:"=",
                'updateFilters': '&'
            },

            templateUrl: 'views/ticket-sla/editSlaFilters.html',

            link: function (scope) {

                scope.editFilter = function(){
                    scope.editMode=!scope.editMode;
                };
                scope.editMode=false;

                scope.deleteFilter = function() {

                    scope.showConfirm("Delete Filter", "Delete", "ok", "cancel", "Do you want to delete " + scope.filter.field, function (obj) {
                        switch (scope.filterType){
                            case "any":
                                slaApiAccess.removeFilterAny(scope.slaId, scope.filter._id.toString()).then(function (response) {
                                    if (response) {
                                        scope.updateFilters(scope.filter, scope.filterType);
                                        scope.showAlert("Deleted", "Deleted", "ok", "File " + scope.filter.field + " Deleted successfully");
                                    }
                                    else
                                        scope.showError("Error", "Error", "ok", "There is an error ");
                                }, function (error) {
                                    scope.showError("Error", "Error", "ok", "There is an error ");
                                });
                                break;
                            case "all":
                                slaApiAccess.removeFilterAll(scope.slaId, scope.filter._id.toString()).then(function (response) {
                                    if (response) {
                                        scope.updateFilters(scope.filter, scope.filterType);
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

    app.directive('editSlaFilter', editSlaFilter)
}());