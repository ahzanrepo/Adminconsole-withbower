/**
 * Created by Pawan on 1/2/2018.
 */
mainApp.directive("bisunit", function () {


    return {
        restrict: "EAA",
        scope: {
            unit: "="
        },

        templateUrl: 'views/companyConfig/partials/businessUnitList.html',

        link: function (scope) {

            scope.showAlert = function (title,content,type) {

                new PNotify({
                    title: title,
                    text: content,
                    type: type,
                    styling: 'bootstrap3'
                });
            };




        }

    }
});