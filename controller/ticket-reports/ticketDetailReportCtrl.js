/**
 * Created by dinusha on 9/6/2016.
 */
(function () {
    var app = angular.module("veeryConsoleApp");

    var ticketDetailReportCtrl = function ($scope, $filter, ticketReportsService) {

        $scope.showAlert = function (tittle, type, content) {

            new PNotify({
                title: tittle,
                text: content,
                type: type,
                styling: 'bootstrap3'
            });
        };

        $scope.moment = moment;

        $scope.pagination = {
            currentPage: 1,
            maxSize: 5,
            totalItems: 0
        };

        $scope.recLimit = '10';


        $scope.obj = {
            startDay : moment().format("YYYY-MM-DD"),
            endDay : moment().format("YYYY-MM-DD")
        };

        $scope.ticketList = [];
        $scope.extUserList = [];

        $scope.tagList = [];

        $scope.pageChanged = function()
        {
            $scope.getTicketSummary();
        };

        $scope.searchWithNewFilter = function()
        {
            $scope.FilterData = null;
            $scope.getTicketSummary();
        };


        var isEmpty = function (map) {
            for (var key in map) {
                if (map.hasOwnProperty(key)) {
                    return false;
                }
            }
            return true;
        };

        var getExternalUserList = function()
        {

            ticketReportsService.getExternalUsers().then(function (extUserList)
            {
                if(extUserList && extUserList.Result && extUserList.Result.length > 0)
                {
                    $scope.extUserList = extUserList.Result;
                }


            }).catch(function(err)
            {

            });
        };

        var getUserList = function()
        {

            ticketReportsService.getUsers().then(function (userList)
            {
                if(userList && userList.Result && userList.Result.length > 0)
                {
                    $scope.userList = userList.Result;
                }


            }).catch(function(err)
            {

            });
        };


        var getTagList = function(callback)
        {
            $scope.tagList = [];
            var tagData = {};
            ticketReportsService.getTagList().then(function (tagList)
            {
                if(tagList && tagList.Result)
                {
                    tagData.AllTags = tagList.Result;

                }

                ticketReportsService.getCategoryList().then(function(categoryList)
                {
                    if(categoryList && categoryList.Result)
                    {
                        tagData.TagCategories = categoryList.Result;
                    }

                    callback(tagData);


                }).catch(function(err)
                {
                    callback(tagData);

                });


            }).catch(function(err)
            {
                callback(tagData);
            });
        };


        var populateToTagList = function()
        {
            $scope.tagList = [];
            getTagList(function(tagObj)
            {

                if(tagObj && tagObj.TagCategories)
                {
                    var newTagCategories = tagObj.TagCategories.map(function(obj){
                        obj.TagType = 'CATEGORIES';
                        return obj;
                    });

                    $scope.tagList.push.apply($scope.tagList, newTagCategories);

                    console.log($scope.tagList);
                }

                if(tagObj && tagObj.AllTags)
                {
                    var newAllTags = tagObj.AllTags.map(function(obj){
                        obj.TagType = 'TAGS';
                        return obj;
                    });

                    $scope.tagList.push.apply($scope.tagList, newAllTags);
                }


            })
        };


        populateToTagList();
        getExternalUserList();
        getUserList();


        $scope.getTicketSummary = function ()
        {
            $scope.obj.isTableLoading = 0;

            if(!$scope.FilterData)
            {
                var momentTz = moment.parseZone(new Date()).format('Z');
                momentTz = momentTz.replace("+", "%2B");

                var startDate = $scope.obj.startDay + ' 00:00:00' + momentTz;
                var tempEndDate = $scope.obj.endDay;

                var endDate = moment(tempEndDate).add(1, 'days').format('YYYY-MM-DD') + ' 00:00:00' + momentTz;

                var tagName = null;

                if($scope.selectedTag)
                {
                    tagName = $scope.selectedTag.name;
                }

                var limit = parseInt($scope.recLimit);

                $scope.FilterData = {
                    sdate: startDate,
                    edate: endDate,
                    limitCount: limit,
                    skipCount: 0,
                    requester: $scope.selectedExtUser,
                    assignee: $scope.selectedAssignee,
                    submitter: $scope.selectedSubmitter,
                    tag: tagName,
                    channel: $scope.channelType,
                    priority: $scope.priorityType,
                    type: $scope.ticketType,
                    status: $scope.ticketStatus,
                    slaViolated: $scope.slaStatus

                }
            }
            else
            {
                $scope.FilterData.skipCount = ($scope.pagination.currentPage - 1)*$scope.FilterData.limitCount;
            }


            try
            {

                ticketReportsService.getTicketDetailsCount($scope.FilterData).then(function (ticketCount)
                {
                    if(ticketCount && ticketCount.IsSuccess)
                    {
                        $scope.pagination.totalItems = ticketCount.Result;
                    }

                    ticketReportsService.getTicketDetails($scope.FilterData).then(function (ticketDetailsResp)
                    {
                        if(ticketDetailsResp && ticketDetailsResp.Result && ticketDetailsResp.Result.length > 0)
                        {
                            $scope.ticketList = ticketDetailsResp.Result;
                            $scope.obj.isTableLoading = 1;

                        }
                        else
                        {
                            $scope.obj.isTableLoading = -1;
                            $scope.ticketList = [];
                        }



                    }).catch(function(err)
                    {
                        $scope.showAlert('Error', 'error', 'ok', 'Error occurred while loading ticket summary');
                        $scope.obj.isTableLoading = -1;
                        $scope.ticketList = [];
                    });



                }).catch(function(err)
                {
                    $scope.showAlert('Error', 'error', 'ok', 'Error occurred while loading ticket summary');
                    $scope.obj.isTableLoading = -1;
                    $scope.ticketList = [];
                });





            }
            catch (ex)
            {
                $scope.showAlert('Error', 'error', 'ok', 'Error occurred while loading ticket summary');
                $scope.obj.isTableLoading = -1;
                $scope.ticketList = [];
            }

        };



    };
    app.controller("ticketDetailReportCtrl", ticketDetailReportCtrl);

}());


