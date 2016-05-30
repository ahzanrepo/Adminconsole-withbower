/**
 * Created by Rajinda on 5/30/2016.
 */
mainApp.directive("fileCountdrt", function ($filter, fileService) {

    return {
        restrict: "EA",
        scope: {
            name: "@",
            category: "@",
            countByCategory:"="
        },

        templateUrl: 'file_gallery/view/fileCount.html',
        /*template: '<span class="count_top"  ><i class="fa fa-user" ></i> {{fileCount.Category| uppercase}}</span><div class="count green">{{fileCount.Count}}</div><span class="count_bottom"><i class="green"><i class="fa fa-sort-asc"></i>Total Number of Files</i></span>',*/

        link: function (scope, element, attributes) {

            scope.countByCategory = [];
            scope.fileCount ={};
            scope.fileCount.Category =scope.category;
            scope.fileCount.Count ="";

            fileService.GetFileCountCategoryID(scope.name).then(function (count) {
                if (count) {
                    scope.fileCount = count;
                    scope.countByCategory[scope.name] = scope.fileCount;
                    console.info("GetFileCountCategoryID : " + scope.fileCount);
                }
            }, function (error) {
                console.info("GetFileCoun3432432tCategoryID err" + error);
            });

            /*engagementService.GetItemsBySessionId(scope.name).then(function (response) {
             scope.heroes = $filter('filter')(response, {attachmentType: "EngagementItem"});
             }, function (error) {
             console.info("GetEngagementsBySessionId err" + error);

             });*/
        }
    }
});