/**
 * Created by dinusha on 9/6/2016.
 */
(function () {
    var app = angular.module("veeryConsoleApp");

    var queueSummaryHourlyCtrl = function ($scope, $filter, cdrApiHandler, resourceService) {

        $scope.showAlert = function (tittle, type, content) {

            new PNotify({
                title: tittle,
                text: content,
                type: type,
                styling: 'bootstrap3'
            });
        };

        $scope.moment = moment;

        $scope.summaryArr = [];


        $scope.obj = {
            day : moment().format("YYYY-MM-DD")
        };


        var isEmpty = function (map) {
            for (var key in map) {
                if (map.hasOwnProperty(key)) {
                    return false;
                }
            }
            return true;
        };

        var emptyArr = [];

        $scope.querySearch = function(query)
        {
            if(query === "*" || query === "")
            {
                if($scope.attrList)
                {
                    return $scope.attrList;
                }
                else
                {
                    return emptyArr;
                }

            }
            else
            {
                if($scope.attrList)
                {
                    var filteredArr = $scope.attrList.filter(function (item)
                    {
                        var regEx = "^(" + query + ")";

                        if(item.Attribute)
                        {
                            return item.Attribute.match(regEx);
                        }
                        else
                        {
                            return false;
                        }

                    });

                    return filteredArr;
                }
                else
                {
                    return emptyArr;
                }
            }

        };



        $scope.loadAttrList = function()
        {
            cdrApiHandler.getAttributeList().then(function(attrList)
            {
                if(attrList && attrList.Result)
                {
                    $scope.attrList = attrList.Result;
                }
                else
                {
                    $scope.attrList = [];
                }


            }).catch(function(err)
            {
                $scope.showAlert('Agent List', 'error', 'Failed to bind agent auto complete list');

            })
        };

        $scope.loadAttrList();

        var buildSummaryList = function(day, attribute, momentTz, summaryArrItem, callback)
        {
            cdrApiHandler.getCallSummaryForQueueHr(day, attribute, momentTz).then(function (sumResp)
            {
                if (!sumResp.Exception && sumResp.IsSuccess && sumResp.Result)
                {
                    if (!isEmpty(sumResp.Result))
                    {
                        var newSummary = sumResp.Result.map(function(sumr) {

                            if(typeof sumr.IvrAverage === "number")
                            {
                                sumr.IvrAverage = convertToMMSS(sumr.IvrAverage);
                            }

                            if(typeof sumr.HoldAverage === "number")
                            {
                                sumr.HoldAverage = convertToMMSS(sumr.HoldAverage);
                            }

                            if(typeof sumr.RingAverage === "number")
                            {
                                sumr.RingAverage = convertToMMSS(sumr.RingAverage);
                            }

                            if(typeof sumr.TalkAverage === "number")
                            {
                                sumr.TalkAverage = convertToMMSS(sumr.TalkAverage);
                            }

                            return sumr;
                        });

                        summaryArrItem.Data = newSummary;
                    }

                    callback(null, true);


                }
                else
                {
                    callback(null, true);
                }



            }, function (err)
            {
                callback(err, false);
            })
        };

        $scope.getCallSummary = function ()
        {

            try
            {

                var momentTz = moment.parseZone(new Date()).format('Z');
                momentTz = momentTz.replace("+", "%2B");

                $scope.obj.isTableLoadingHr = 0;

                $scope.skillFilter.forEach(function(skill)
                {
                    var arrayItem = {Skill: skill.Attribute, Data: []};
                    $scope.summaryArr.push(arrayItem);

                    buildSummaryList($scope.obj.day, skill.Attribute, momentTz, arrayItem, function(err, processDoneResp)
                    {
                        $scope.obj.isTableLoadingHr = 1;

                    });
                });


            }
            catch (ex)
            {
                $scope.showAlert('Error', 'error', 'ok', 'Error occurred while loading call summary');
                $scope.obj.isTableLoadingHr = 1;
            }

        };


        $scope.getAgentStatusList = function ()
        {
            var st = moment($scope.startTime, ["h:mm A"]).format("HH:mm");
            var et = moment($scope.endTime, ["h:mm A"]).format("HH:mm");
            $scope.obj.isTableLoading = 0;
            var momentTz = moment.parseZone(new Date()).format('Z');
            momentTz = momentTz.replace("+", "%2B");

            var startDate = $scope.obj.startDay + ' ' + st + ':00' + momentTz;
            var endDate = $scope.obj.endDay + ' ' + et + ':59' + momentTz;

            if(!$scope.timeEnabledStatus)
            {
                startDate = $scope.obj.startDay + ' 00:00:00' + momentTz;
                endDate = $scope.obj.endDay + ' 23:59:59' + momentTz;
            }

            try
            {
                cdrApiHandler.getAgentStatusList(startDate, endDate, $scope.statusFilter, $scope.skillFilter).then(function (agentListResp)
                {
                    $scope.agentStatusList = {};
                    if(agentListResp && agentListResp.Result)
                    {
                        for(var resource in agentListResp.Result)
                        {
                            if(agentListResp.Result[resource] && agentListResp.Result[resource].length > 0 && agentListResp.Result[resource][0].ResResource && agentListResp.Result[resource][0].ResResource.ResourceName)
                            {
                                var caption = agentListResp.Result[resource][0].ResResource.ResourceName;
                                $scope.agentStatusList[caption] = agentListResp.Result[resource];
                            }

                        }

                    }

                    $scope.obj.isTableLoading = 1;

                }).catch(function(err)
                {
                    $scope.showAlert('Error', 'error', 'ok', 'Error occurred while loading agent status events');
                    $scope.obj.isTableLoading = 1;
                });


            }
            catch (ex)
            {
                $scope.showAlert('Error', 'error', 'ok', 'Error occurred while loading agent status events');
                $scope.obj.isTableLoading = 1;
            }

        };



    };
    app.controller("queueSummaryHourlyCtrl", queueSummaryHourlyCtrl);

}());


