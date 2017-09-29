/**
 * Created by Pawan on 9/26/2017.
 */
mainApp.directive("editqsettings", function ($filter,$uibModal,queueSettingsBackendService) {

    return {
        restrict: "EAA",
        scope: {
            setting: "=",
            'reloadpage':'&'
        },

        templateUrl: 'views/queue-settings-config/partials/editQueueSettings.html',

        link: function (scope) {

            console.log(scope.setting);
            scope.attributeGroups=[];
            scope.NewattributeGroups=[];
            scope.attributeGroup;

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
            scope.editMode = false;
            scope.removeSettingRecord= function (recordID) {


                scope.showConfirm("Delete Queue Setting", "Delete", "ok", "cancel", "Do you want to delete " + recordID, function (obj) {

                    queueSettingsBackendService.deleteSettingRecord(recordID).then(function (response) {

                        if(response.data.IsSuccess)
                        {
                            scope.showAlert("Success","Queue Setting record removed successfully",'success');
                            scope.reloadpage();
                        }
                        else
                        {
                            scope.showAlert("Error","Queue Setting record removing failed",'error');
                            console.log("Error in deleting Queue setting record");
                        }
                    }, function (error) {
                        scope.showAlert("Error","Queue Setting record removing failed",'error');
                        console.log("Exception in deleting ueue setting record"+error);
                    });

                }, function () {

                }, recordID)





            };




        }

    }
});