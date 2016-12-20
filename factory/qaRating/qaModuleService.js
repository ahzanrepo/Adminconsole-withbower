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
                url: baseUrls.qaModule + 'Section',
                data : jsonStr
            }).then(function(resp)
            {
                return resp.data;
            })
        };

        var addNewPaper = function(paperInfo)
        {
            var jsonStr = JSON.stringify(paperInfo);

            return $http({
                method: 'POST',
                url: baseUrls.qaModule + 'Paper',
                data : jsonStr
            }).then(function(resp)
            {
                return resp.data;
            })
        };

        var addQuestionToPaper = function(paperId, questionInfo)
        {
            var jsonStr = JSON.stringify(questionInfo);

            return $http({
                method: 'PUT',
                url: baseUrls.qaModule + 'QuestionPaper/' + paperId + '/Question',
                data : jsonStr
            }).then(function(resp)
            {
                return resp.data;
            })
        };

        var getSections = function()
        {
            return $http({
                method: 'GET',
                url: baseUrls.qaModule + 'Sections'
            }).then(function(resp)
            {
                return resp.data;
            })
        };

        var getPapers = function()
        {
            return $http({
                method: 'GET',
                url: baseUrls.qaModule + 'QuestionPapers'
            }).then(function(resp)
            {
                return resp.data;
            })
        };

        var getQuestionsForPaper = function(id)
        {
            return $http({
                method: 'GET',
                url: baseUrls.qaModule + 'QuestionPaper/' + id
            }).then(function(resp)
            {
                return resp.data;
            })
        };

        var deleteQuestionById = function(id)
        {
            return $http({
                method: 'DELETE',
                url: baseUrls.qaModule + 'Question/' + id
            }).then(function(resp)
            {
                return resp.data;
            })
        };

        return {
            addNewSection: addNewSection,
            getSections: getSections,
            getPapers: getPapers,
            addNewPaper: addNewPaper,
            getQuestionsForPaper: getQuestionsForPaper,
            addQuestionToPaper: addQuestionToPaper,
            deleteQuestionById: deleteQuestionById
        };

    };



    var module = angular.module("veeryConsoleApp");
    module.factory("qaModuleService", qaModuleService);

}());

