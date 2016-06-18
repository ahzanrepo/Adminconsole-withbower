/**
 * Created by Pawan on 6/17/2016.
 */
mainApp.directive("editextension", function ($filter,$uibModal,extensionBackendService) {

    return {
        restrict: "EAA",
        scope: {
            extension: "=",
            extensionlist: "=",
            'updateextension': '&',
            'reloadpage':'&'
        },

        templateUrl: 'views/extension/partials/editExtension.html',

        link: function (scope) {





            //scope.setMasterAppList();


            scope.editMode = false;

            scope.editExtension = function () {
                scope.editMode = !scope.editMode;
                //console.log(scope.applist);
            };


            scope.showAlert = function (tittle, label, button, content) {

                new PNotify({
                    title: tittle,
                    text: content,
                    type: 'notice',
                    styling: 'bootstrap3'
                });
            };


        }

    }
});