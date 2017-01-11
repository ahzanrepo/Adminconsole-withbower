/**
 * Created by Pawan on 1/10/2017.
 */

mainApp.directive("editusertags", function ($filter,$uibModal,companyConfigBackendService) {
    console.log("Hit");

    return {
        restrict: "EAA",
        scope: {
            usertag: "=",
            taglist: "=",
            'reloadpage':'&'
        },

        templateUrl: 'views/companyConfig/partials/editUserTag.html',

        link: function (scope) {

            scope.showAlert = function (title,content,type) {

                new PNotify({
                    title: title,
                    text: content,
                    type: type,
                    styling: 'bootstrap3'
                });
            };


            scope.deleteUserTag = function () {

                companyConfigBackendService.removeUserTag(scope.usertag.name).then(function (response) {

                    scope.showAlert("Success",scope.usertag.name+" Deleted successfully","success");
                    scope.reloadpage(scope.usertag);
                }), function (error) {
                    scope.showAlert("Error",scope.usertag.name+" Deletion failed","error");
                }

            }

        }

    }
});