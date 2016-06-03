/**
 * Created by Rajinda on 5/30/2016.
 */
mainApp.directive("editattribute", function (attributeService) {

    return {
        restrict: "EA",
        scope: {
            attribute: "=",
            'updateAttribute': '&'
        },

        templateUrl: 'attribute_application/partials/template/editAttribute.html',
        /*template: '<span class="count_top"  ><i class="fa fa-user" ></i> {{fileCount.Category| uppercase}}</span><div class="count green">{{fileCount.Count}}</div><span class="count_bottom"><i class="green"><i class="fa fa-sort-asc"></i>Total Number of Files</i></span>',*/

        link: function (scope, element, attributes) {

            scope.updateAttributes = function(item) {

                attributeService.UpdateAttributes(item).then(function (response) {
                    if (response) {
                        scope.updateAttribute(item);
                        console.info("UpdateAttributes : " + response);
                    }
                }, function (error) {
                    console.info("UpdateAttributes err" + error);
                });
            };
        }
    }
});