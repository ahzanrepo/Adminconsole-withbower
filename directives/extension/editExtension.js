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


            scope.showAlert = function (title,content,type) {

                new PNotify({
                    title: title,
                    text: content,
                    type: type,
                    styling: 'bootstrap3'
                });
            };


            //scope.setMasterAppList();


            scope.editMode = false;

            scope.editExtension = function () {
                scope.editMode = !scope.editMode;
                //console.log(scope.applist);
            };

            


        }

    }
});