/**
 * Created by Pawan on 6/8/2016.
 */
mainApp.directive("editholdmusic", function ($filter,$uibModal,holdMusicBackendService) {

    return {
        restrict: "EAA",
        scope: {
            holdmusic: "=",
            'updateholdmusic': '&',
            'reloadpage':'&'
        },

        templateUrl: 'views/hold-music/partials/editHoldMusic.html',

        link: function (scope) {



            scope.editMode = false;
            scope.fileList={};
            scope.getFileList = function () {
                holdMusicBackendService.getHoldMusicFiles().then(function (response) {

                    if(response.data.IsSuccess)
                    {
                        scope.fileList=response.data.Result;
                    }
                    else
                    {
                        console.log("Error in Listing music files "+response.data.Exception);
                    }

                }, function (error) {
                    console.log("Exception in Listing music files "+error);
                })
            };

            scope.editHoldMusic = function () {
                scope.editMode = !scope.editMode;
                scope.getFileList();
                console.log(scope.holdmusic);
            };

            scope.updateHoldMusicDetails = function () {

                holdMusicBackendService.updateHoldMusicFiles(scope.holdmusic).then(function (response) {
                    if(response.data.IsSuccess)
                    {
                        scope.reloadpage();

                    }
                    else
                    {
                        console.info("Error in updating app "+response.data.Exception);
                    }

                }, function (error) {
                    console.info("Error in updating application "+error);
                });
            };


            scope.removeHoldMusic = function (item) {

                scope.showConfirm("Delete Record", "Delete", "ok", "cancel", "Do you want to delete " + scope.holdmusic.Name, function (obj) {

                    holdMusicBackendService.removeHoldMusicFiles(scope.holdmusic).then(function (response) {
                        if (response) {
                            scope.updateholdmusic(item);
                            scope.showAlert("Deleted", "Deleted", "ok", "File " + item.Name + " Deleted successfully");
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

            scope.cancelUpdate = function () {
                scope.editMode = false;
            }


        }

    }
});