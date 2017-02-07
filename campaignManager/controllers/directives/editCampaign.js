/**
 * Created by Rajinda on 5/30/2016.
 */
mainApp.directive("editcampaign", function ($filter, $uibModal, resourceService) {

    return {
        restrict: "EAA",
        scope: {
            campaign: "=",
            mechanisms: "=",
            modes: "=",
            channels: "=",
            extensions:"="
        },

        templateUrl: 'campaignManager/template/editCampaign.html',

        link: function (scope, element, attributes) {

            scope.editMode = false;
            scope.editCampaign = function () {
                scope.editMode = !scope.editMode;
            }


        }

    }
});