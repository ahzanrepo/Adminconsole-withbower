/**
 * Created by Pawan on 8/5/2016.
 */
mainApp.directive("edittanslations", function ($filter,$uibModal,transBackendService) {

    return {
        restrict: "EAA",
        scope: {
            translation: "=",
            translationList: "=",
            'updateTranslation': '&',
            'reloadpage':'&'
        },

        templateUrl: 'views/translation/partials/editTranslations.html',

        link: function (scope) {

            scope.editMode = false;

            scope.editApplication = function () {
                scope.editMode = !scope.editMode;
                console.log(scope.translationList);
            };

            scope.removeTranslation = function (item) {

                scope.showConfirm("Delete Translation", "Delete", "ok", "cancel", "Do you want to delete " + item.TransName, function (obj) {

                    transBackendService.deleteTranslation(scope.translation).then(function (response) {
                        if (response) {
                            scope.updateTranslation(item);
                            scope.showAlert("Deleted","Translation " + item.TransName + " Deleted successfully","success");
                        }
                        else
                            scope.showAlert("Error", "Error in translation removing", "error");
                    }, function (error) {
                        scope.showAlert("Error", "Error in tranlation removing", "error");
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



            scope.showAlert = function (title,content,type) {

                new PNotify({
                    title: title,
                    text: content,
                    type: type,
                    styling: 'bootstrap3'
                });
            };


            scope.showConig= function (appid) {
                //modal show
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'views/app-registry/partials/appConfigModal.html',
                    controller: 'modalController',
                    size: 'sm',
                    resolve: {
                        appID: function () {
                            return appid;
                        }
                    }
                });
            };




        }

    }
});