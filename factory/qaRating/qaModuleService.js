/**
 * Created by dinusha on 12/19/2016.
 */

(function() {

    var qaModuleService = function($http, baseUrls)
    {

        var addNewSection = function(sectionInfo)
        {
            var jsonStr = JSON.stringify(sectionInfo);

            return $http({
                method: 'POST',
                url: baseUrls.QAModule + 'Section',
                data : jsonStr
            }).then(function(resp)
            {
                return resp.data;
            })
        };

        return {
            addNewSection: addNewSection
        };



    };



    var module = angular.module("veeryConsoleApp");
    module.factory("qaModuleService", qaModuleService);

}());

