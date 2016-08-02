/**
 * Created by Pawan on 7/29/2016.
 */

mainApp.directive("editcontext", function ($filter,$uibModal,companyConfigBackendService) {
    console.log("Hit");

    return {
        restrict: "EAA",
        scope: {
            context: "=",
            contextlist: "=",
            'reloadpage':'&',
            'updateContext':'&'
        },

        templateUrl: 'views/companyConfig/partials/editContext.html',

        link: function (scope) {

            scope.showAlert = function (title,content,type) {

                new PNotify({
                    title: title,
                    text: content,
                    type: type,
                    styling: 'bootstrap3'
                });
            };


            scope.deleteContext = function () {
                companyConfigBackendService.deleteContext(scope.context).then(function (response) {
                    scope.updateContext(scope.context);
                    scope.showAlert("Success",scope.context+" Deleted successfully","success");
                }), function (error) {
                    scope.showAlert("Error",scope.context+" Deletion failed","error");
                }

            };

        }

    }
});