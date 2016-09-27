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
            totalItems: 64
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
            var momentTz = moment.parseZone(new Date()).format('Z');
            momentTz = momentTz.replace("+", "%2B");

            var startDate = $scope.obj.startDay + ' 00:00:00' + momentTz;
            var tempEndDate = $scope.obj.endDay;

            var endDate = moment(tempEndDate).add(1, 'days').format('YYYY-MM-DD') + ' 00:00:00' + momentTz;

            try
            {
                var tagName = null;

                if($scope.selectedTag)
                {
                    tagName = $scope.selectedTag.name;
                }

                var limit = parseInt($scope.recLimit);
                var skip = ($scope.pagination.currentPage - 1)*limit;
                ticketReportsService.getTicketDetails(startDate, endDate, skip, limit).then(function (ticketSummaryResp)
                {
                    if(ticketSummaryResp && ticketSummaryResp.Result && ticketSummaryResp.Result.length > 0)
                    {
                        $scope.ticketList = ticketSummaryResp.Result;
                        $scope.obj.isTableLoading = 1;

                    }
                    else
                    {
                        $scope.obj.isTableLoading = -1;
                        $scope.summaryDetails = {};
                    }



                }).catch(function(err)
                {
                    $scope.showAlert('Error', 'error', 'ok', 'Error occurred while loading ticket summary');
                    $scope.obj.isTableLoading = -1;
                    $scope.summaryDetails = {};
                });


            }
            catch (ex)
            {
                $scope.showAlert('Error', 'error', 'ok', 'Error occurred while loading ticket summary');
                $scope.obj.isTableLoading = -1;
                $scope.summaryDetails = {};
            }

        };



    };
    app.controller("ticketDetailReportCtrl", ticketDetailReportCtrl);

}());


