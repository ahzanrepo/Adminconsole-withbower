/**
 * Created by dinusha on 9/6/2016.
 */
(function () {
    var app = angular.module("veeryConsoleApp");

    var ticketSummaryCtrl = function ($scope, $filter, ticketReportsService, loginService) {

        $scope.showAlert = function (tittle, type, content) {

            new PNotify({
                title: tittle,
                text: content,
                type: type,
                styling: 'bootstrap3'
            });
        };

        $scope.moment = moment;


        $scope.obj = {
            startDay: moment().format("YYYY-MM-DD"),
            endDay: moment().format("YYYY-MM-DD")
        };

        $scope.summaryDetails = {};

        $scope.tagList = [];
        $scope.ticketStatusList = [];


        var isEmpty = function (map) {
            for (var key in map) {
                if (map.hasOwnProperty(key)) {
                    return false;
                }
            }
            return true;
        };


        var getTagList = function (callback) {
            $scope.tagList = [];
            var tagData = {};
            ticketReportsService.getTagList().then(function (tagList) {
                if (tagList && tagList.Result) {
                    tagData.AllTags = tagList.Result;

                }

                ticketReportsService.getCategoryList().then(function (categoryList) {
                    if (categoryList && categoryList.Result) {
                        tagData.TagCategories = categoryList.Result;
                    }

                    callback(tagData);


                }).catch(function (err) {
                    loginService.isCheckResponse(err);
                    callback(tagData);

                });


            }).catch(function (err) {
                loginService.isCheckResponse(err);
                callback(tagData);
            });
        };


        var populateToTagList = function () {
            $scope.tagList = [];
            getTagList(function (tagObj) {

                if (tagObj && tagObj.TagCategories) {
                    var newTagCategories = tagObj.TagCategories.map(function (obj) {
                        obj.TagType = 'CATEGORIES';
                        return obj;
                    });

                    $scope.tagList.push.apply($scope.tagList, newTagCategories);

                    console.log($scope.tagList);
                }

                if (tagObj && tagObj.AllTags) {
                    var newAllTags = tagObj.AllTags.map(function (obj) {
                        obj.TagType = 'TAGS';
                        return obj;
                    });

                    $scope.tagList.push.apply($scope.tagList, newAllTags);
                }


            })
        };


        populateToTagList();


        var getTicketTypeList = function ()
        {

            ticketReportsService.getTicketTypeList().then(function (typeList)
            {
                if (typeList && typeList.Result)
                {
                    var tempArr = [];
                    if(typeList.Result.default_types)
                    {
                        tempArr = typeList.Result.default_types;
                    }

                    if(typeList.Result.custom_types)
                    {
                        tempArr = tempArr.concat(typeList.Result.custom_types);
                    }

                    $scope.ticketTypesList = tempArr;

                }

            }).catch(function (err) {
                loginService.isCheckResponse(err);
            });
        };

        getTicketTypeList();


        $scope.getTicketSummary = function () {
            $scope.obj.isTableLoading = 0;
            var momentTz = moment.parseZone(new Date()).format('Z');
            momentTz = momentTz.replace("+", "%2B");

            var startDate = $scope.obj.startDay + ' 00:00:00' + momentTz;
            var tempEndDate = $scope.obj.endDay;

            var endDate = moment(tempEndDate).add(1, 'days').format('YYYY-MM-DD') + ' 00:00:00' + momentTz;

            try {
                var tagName = null;

                if ($scope.selectedTag) {
                    tagName = $scope.selectedTag.name;
                }
                ticketReportsService.getTicketSummary(startDate, endDate, tagName, $scope.channelType, $scope.priorityType, $scope.ticketType).then(function (ticketSummaryResp) {
                    if (ticketSummaryResp && ticketSummaryResp.Result && ticketSummaryResp.Result.length > 0 && ticketSummaryResp.Result[0].statistics) {
                        $scope.summaryDetails = ticketSummaryResp.Result[0].statistics;
                        $scope.obj.isTableLoading = 1;

                    }
                    else {
                        $scope.obj.isTableLoading = 1;
                        $scope.summaryDetails = {
                            progressing: 0,
                            new: 0,
                            closed: 0,
                            resolved: 0,
                            reopen: 0,
                            sla_violated: 0,
                            overdue_done: 0,
                            overdue_working: 0,
                            first_call_resolved: 0,
                            average_resolution: 0,
                            average_response:0

                        };

                    }


                }).catch(function (err) {
                    loginService.isCheckResponse(err);
                    $scope.showAlert('Error', 'error', 'ok', 'Error occurred while loading ticket summary');
                    $scope.obj.isTableLoading = 1;
                    $scope.summaryDetails = {
                        progressing: 0,
                        new: 0,
                        closed: 0,
                        resolved: 0,
                        reopen: 0,
                        sla_violated: 0,
                        overdue_done: 0,
                        overdue_working: 0,
                        first_call_resolved: 0,
                        average_resolution: 0,
                        average_response:0

                    };
                });


            }
            catch (ex) {
                $scope.showAlert('Error', 'error', 'ok', 'Error occurred while loading ticket summary');
                $scope.obj.isTableLoading = -1;
                $scope.summaryDetails = {
                    progressing: 0,
                    new: 0,
                    closed: 0,
                    resolved: 0,
                    reopen: 0,
                    sla_violated: 0,
                    overdue_done: 0,
                    overdue_working: 0,
                    first_call_resolved: 0,
                    average_resolution: 0,
                    average_response:0

                };
            }

        };


    };
    app.controller("ticketSummaryCtrl", ticketSummaryCtrl);

}());


