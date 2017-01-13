/**
 * Created by dinusha on 12/19/2016.
 */
(function () {
    var app = angular.module("veeryConsoleApp");

    var questionPaperCtrl = function ($scope, $uibModal, loginService, qaModuleService, _) {

        $scope.showAlert = function (title, type, content) {

            new PNotify({
                title: title,
                text: content,
                type: type,
                styling: 'bootstrap3'
            });
        };

        $scope.currentSection = {};
        $scope.addQuestionSection = {};
        $scope.currentQuestion = {
            weight : 1
        };

        $scope.currentPaper = {};
        $scope.sections = [];
        $scope.newQFormToggle = {
            isOpen: true,
            display: 'New Form'
        };

        /*$scope.newQuestionFormToggle = function()
        {
            $scope.newQFormToggle.IsOpen = !$scope.newQFormToggle.IsOpen;
            if($scope.newQFormToggle.display === 'New Form')
            {
                $scope.newQFormToggle.display = 'Close';
            }
            else
            {
                $scope.newQFormToggle.display = 'New Form';
            }
        };*/

        $scope.showModalSection = function () {
            //modal show
            $scope.currentSection = {};
            $scope.modalInstanceSec = $uibModal.open({
                animation: true,
                templateUrl: 'views/qaRating/sections.html',
                size: 'lg',
                scope: $scope
            });
        };

        $scope.showModalPaper = function () {
            //modal show
            $scope.modalInstancePaper = $uibModal.open({
                animation: true,
                templateUrl: 'views/qaRating/questionForm.html',
                size: 'sm',
                scope: $scope
            });
        };

        $scope.showModalQuestion = function (sectionId) {

            $scope.currentQuestion = {
                weight : 1
            };

            $scope.questionSectionId = sectionId;
            //modal show
            $scope.modalInstanceQues = $uibModal.open({
                animation: true,
                templateUrl: 'views/qaRating/question.html',
                size: 'lg',
                scope: $scope
            });

            $scope.getSections();
        };

        $scope.paperEditMode = function(paper){

            $scope.currentPaper = paper;

            if($scope.showPaper === null || $scope.showPaper === undefined)
            {
                $scope.showPaper = false;
            }
            $scope.showPaper = !$scope.showPaper;

            if($scope.showPaper)
            {
                reloadCurrentPaper(paper._id);
            }
        };

        $scope.backToListView = function(){

            $scope.currentPaper = {};

            $scope.showPaper = false;
        };

        $scope.closeModalSection = function(){
            $scope.modalInstanceSec.close();
        };

        $scope.closeModalQuestion = function(){
            $scope.modalInstanceQues.close();
        };

        $scope.closeModalPaper = function(){
            $scope.modalInstancePaper.close();
        };



        $scope.deleteQuestion = function(id){

            qaModuleService.deleteQuestionById(id).then(function (data)
            {
                if (data.IsSuccess)
                {
                    $scope.showAlert('QA Question', 'success', 'Question Deleted Successfully');
                    reloadCurrentPaper($scope.currentPaper._id);
                }
                else
                {
                    if(data.Exception)
                    {
                        $scope.showAlert('QA Question', 'error', data.Exception.Message);
                    }
                    else
                    {
                        $scope.showAlert('QA Question', 'error', 'Error occurred while deleting question');
                    }
                }

            }).catch(function (err)
            {
                loginService.isCheckResponse(err);
                $scope.showAlert('QA Question', 'error', err.Message);
            });

        };

        $scope.addSection = function(){

            qaModuleService.addNewSection($scope.currentSection).then(function (data)
            {
                if (data.IsSuccess)
                {
                    $scope.showAlert('QA Section', 'success', 'Section Added Successfully');
                    $scope.closeModalSection();

                    $scope.getSections();
                }
                else
                {
                    if(data.Exception)
                    {
                        $scope.showAlert('QA Section', 'error', data.Exception.Message);
                    }
                    else
                    {
                        $scope.showAlert('QA Section', 'error', 'Error occurred while adding section');
                    }
                }

            }).catch(function (err)
            {
                loginService.isCheckResponse(err);
                $scope.showAlert('QA Section', 'error', err.Message);
            });

        };

        $scope.addSectionToPaper = function(section)
        {
            var obj = {
                SectionName: section.name,
                Questions: []
            };

            if(!$scope.currentPaper.questionsBySection[section._id])
            {
                $scope.currentPaper.questionsBySection[section._id] = obj;
            }
            else
            {
                $scope.showAlert('QA Question', 'warn', 'Section already added');
            }

        };

        $scope.addQuestion = function(){

            $scope.currentQuestion.section = $scope.questionSectionId;

            qaModuleService.addQuestionToPaper($scope.currentPaper._id, $scope.currentQuestion).then(function (data)
            {
                if (data.IsSuccess)
                {
                    $scope.showAlert('QA Question', 'success', 'Question Added Successfully');
                    $scope.modalInstanceQues.close();
                    reloadCurrentPaper($scope.currentPaper._id);
                }
                else
                {
                    if(data.Exception)
                    {
                        $scope.showAlert('QA Question', 'error', data.Exception.Message);
                    }
                    else
                    {
                        $scope.showAlert('QA Question', 'error', 'Error occurred while adding question');
                    }
                }

            }).catch(function (err)
            {
                loginService.isCheckResponse(err);
                $scope.showAlert('QA Question', 'error', err.Message);
            });

        };

        $scope.addPaper = function(){

            qaModuleService.addNewPaper($scope.currentPaper).then(function (data)
            {
                if (data.IsSuccess)
                {
                    $scope.showAlert('QA Paper', 'success', 'Question paper added successfully');
                    $scope.currentPaper = {};
                    $scope.closeModalPaper();
                    $scope.getPapers();
                }
                else
                {
                    if(data.Exception)
                    {
                        $scope.showAlert('QA Paper', 'error', data.Exception.Message);
                    }
                    else
                    {
                        $scope.showAlert('QA Paper', 'error', 'Error occurred while adding question paper');
                    }
                }

            }).catch(function (err)
            {
                loginService.isCheckResponse(err);
                $scope.showAlert('QA Paper', 'error', err.Message);
            });

        };

        $scope.getSections = function()
        {
            $scope.sections = [];

            qaModuleService.getSections().then(function (data)
            {
                if (data.IsSuccess)
                {
                    $scope.sections = data.Result;
                }
                else
                {
                    if(data.Exception)
                    {
                        $scope.showAlert('QA Section', 'error', data.Exception.Message);
                    }
                    else
                    {
                        $scope.showAlert('QA Section', 'error', 'Error occurred while loading sections');
                    }
                }

            }).catch(function (err)
            {
                loginService.isCheckResponse(err);
                $scope.showAlert('QA Section', 'error', err.Message);
            });

        };

        $scope.getSections();

        var reloadCurrentPaper = function(id)
        {
            qaModuleService.getQuestionsForPaper(id).then(function (data)
            {
                if (data.IsSuccess && data.Result)
                {
                    $scope.currentPaper = data.Result;

                    $scope.currentPaper.questionsBySection = {};

                    /*$scope.sections.forEach(function(section){

                        var questionsBySec = _.filter($scope.currentPaper.questions, {section: section._id});

                        var obj = {
                            SectionName: section.name,
                            Questions: questionsBySec
                        };

                        $scope.currentPaper.questionsBySection[section._id] = obj;
                    });*/

                    var questionsBySec = _.groupBy($scope.currentPaper.questions, function(question){
                        return question.section;
                    });

                    for (var section in questionsBySec)
                    {
                        var sec = _.find($scope.sections, {_id: section});

                        var obj = {
                            SectionName: sec.name,
                            Questions: questionsBySec[section]
                        };

                        $scope.currentPaper.questionsBySection[section] = obj;
                    }
                }
                else
                {
                    if(data.Exception)
                    {
                        $scope.showAlert('QA Section', 'error', data.Exception.Message);
                    }
                    else
                    {
                        $scope.showAlert('QA Section', 'error', 'Error occurred while loading sections');
                    }
                }

            }).catch(function (err)
            {
                loginService.isCheckResponse(err);
                $scope.showAlert('QA Section', 'error', err.Message);
            });

        };

        /*var getQuestionsBySection = function()
        {
            $scope.currentPaper.questionsBySection = {};

            $scope.sections.forEach(function(section){

                var questionsBySec = _.where($scope.currentPaper.questions, {section: section._id});

                $scope.currentPaper.questionsBySection[section.name] = questionsBySec;
            });


            //paper.questionsBySection = groupedList;

        };*/

        $scope.getPapers = function()
        {
            $scope.papers = [];

            qaModuleService.getPapers().then(function (data)
            {
                if (data.IsSuccess)
                {
                    $scope.papers = data.Result;
                }
                else
                {
                    if(data.Exception)
                    {
                        $scope.showAlert('QA Paper', 'error', data.Exception.Message);
                    }
                    else
                    {
                        $scope.showAlert('QA Paper', 'error', 'Error occurred while loading question papers');
                    }
                }

            }).catch(function (err)
            {
                loginService.isCheckResponse(err);
                $scope.showAlert('QA Paper', 'error', err.Message);
            });

        };

        $scope.getPapers();


    };


    app.controller("questionPaperCtrl", questionPaperCtrl);
}());