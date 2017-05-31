/**
 * Created by dinusha on 9/6/2016.
 */
(function () {
    var app = angular.module("veeryConsoleApp");

    var tagWiseTicketSummaryCtrl = function ($scope, $filter, $q, ticketReportsService, loginService) {

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

        $scope.tagSummaryDetails = [];

        $scope.tagList = [];

        $scope.querySearch = function (query)
        {
            var emptyArr = [];
            if (query === "*" || query === "") {
                if ($scope.tagList) {
                    return $scope.tagList;
                }
                else {
                    return emptyArr;
                }

            }
            else {
                if ($scope.tagList)
                {
                    return $scope.tagList.filter(function (item)
                    {
                        var regEx = "^(" + query + ")";

                        if (item.name)
                        {
                            return item.name.match(regEx);
                        }
                        else
                        {
                            return false;
                        }

                    });
                }
                else {
                    return emptyArr;
                }
            }

        };


        var getTagList = function () {
            $scope.tagList = [];
            ticketReportsService.getTagList().then(function (tagList) {
                if (tagList && tagList.Result)
                {
                    $scope.tagList.push.apply($scope.tagList, tagList.Result);

                }

                ticketReportsService.getCategoryList().then(function (categoryList)
                {
                    if (categoryList && categoryList.Result)
                    {
                        $scope.tagList.push.apply($scope.tagList, categoryList.Result);
                    }


                }).catch(function (err) {
                    loginService.isCheckResponse(err);

                });


            }).catch(function (err) {
                loginService.isCheckResponse(err);
            });
        };

        getTagList();


        $scope.getTicketTagSummary = function ()
        {
            $scope.tagSummaryDetails = [];
            $scope.obj.isTableLoading = 0;
            var momentTz = moment.parseZone(new Date()).format('Z');
            momentTz = momentTz.replace("+", "%2B");

            var startDate = $scope.obj.startDay + ' 00:00:00' + momentTz;
            var tempEndDate = $scope.obj.endDay;

            var endDate = moment(tempEndDate).add(1, 'days').format('YYYY-MM-DD') + ' 00:00:00' + momentTz;

            try
            {
                ticketReportsService.getTicketSummaryTagWise(startDate, endDate).then(function (ticketSummaryResp)
                {
                    if (ticketSummaryResp && ticketSummaryResp.Result && ticketSummaryResp.Result.length > 0)
                    {
                        if($scope.filteredTags && $scope.filteredTags.length > 0)
                        {
                            for (var key in $scope.filteredTags)
                            {
                                var filterObj = _.find(ticketSummaryResp.Result, {'tag': $scope.filteredTags[key].name});

                                if(filterObj)
                                {
                                    $scope.tagSummaryDetails.push(filterObj);
                                }

                            }
                        }
                        else
                        {
                            $scope.tagSummaryDetails = ticketSummaryResp.Result;
                        }

                    }
                    else
                    {
                        $scope.showAlert('Tag Wise Ticket Summary', 'warn', 'No data to load for given date range');
                        $scope.tagSummaryDetails = [];
                    }

                    $scope.obj.isTableLoading = 1;

                }).catch(function (err) {
                    loginService.isCheckResponse(err);
                    $scope.showAlert('Tag Wise Ticket Summary', 'error', 'Error occurred while loading ticket summary');
                    $scope.obj.isTableLoading = -1;
                    $scope.tagSummaryDetails = [];
                });


            }
            catch (ex) {
                $scope.showAlert('Tag Wise Ticket Summary', 'error', 'Error occurred while loading ticket summary');
                $scope.obj.isTableLoading = -1;
                $scope.tagSummaryDetails = [];
            }

        };

        $scope.getTicketTagSummaryCSV = function ()
        {
            var tagSumCsvDetails = [];
            var deferred = $q.defer();
            var momentTz = moment.parseZone(new Date()).format('Z');
            momentTz = momentTz.replace("+", "%2B");

            var startDate = $scope.obj.startDay + ' 00:00:00' + momentTz;
            var tempEndDate = $scope.obj.endDay;

            var endDate = moment(tempEndDate).add(1, 'days').format('YYYY-MM-DD') + ' 00:00:00' + momentTz;

            $scope.DownloadFileName = 'TAG_WISE_TICKET_SUMMARY_' + $scope.obj.startDay + '_' + $scope.obj.endDay;

            try
            {
                ticketReportsService.getTicketSummaryTagWise(startDate, endDate).then(function (ticketSummaryResp)
                {
                    if (ticketSummaryResp && ticketSummaryResp.Result && ticketSummaryResp.Result.length > 0)
                    {
                        if($scope.filteredTags && $scope.filteredTags.length > 0)
                        {
                            for (var key in $scope.filteredTags)
                            {
                                var filterObj = _.find(ticketSummaryResp.Result, {'tag': $scope.filteredTags[key].name});

                                if(filterObj)
                                {
                                    tagSumCsvDetails.push(filterObj);
                                }

                            }
                        }
                        else
                        {
                            tagSumCsvDetails = ticketSummaryResp.Result;
                        }


                        deferred.resolve(tagSumCsvDetails);
                    }
                    else
                    {
                        $scope.showAlert('Tag Wise Ticket Summary', 'warn', 'No data to load for given date range');
                        deferred.reject(tagSumCsvDetails);

                    }

                }).catch(function (err) {
                    loginService.isCheckResponse(err);
                    $scope.showAlert('Tag Wise Ticket Summary', 'error', 'Error occurred while loading ticket summary');
                    deferred.reject(tagSumCsvDetails);
                });


            }
            catch (ex) {
                $scope.showAlert('Tag Wise Ticket Summary', 'error', 'Error occurred while loading ticket summary');
                deferred.reject(tagSumCsvDetails);
            }

            return deferred.promise;

        };


    };
    app.controller("tagWiseTicketSummaryCtrl", tagWiseTicketSummaryCtrl);

}());


