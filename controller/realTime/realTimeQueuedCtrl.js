/**
 * Created by Damith on 5/29/2016.
 */

mainApp.controller('realTimeQueuedCtrl', function ($scope, $rootScope, $timeout,$filter, queueMonitorService) {

    //$scope.percent = 65;

    //#
    $scope.isGrid=false;
    $scope.summaryText="Table";
    $scope.isLoaded=false;
    $scope.refreshTime = 10000;

    $scope.pieoption = {
        animate: {
            duration: 1000,
            enabled: true
        },
        barColor: '#2C3E50',
        scaleColor: false,
        lineWidth: 20,
        lineCap: 'circle',
        size: 200
    };

    //#Chart option
    $scope.queueoption = {
        grid: {
            borderColor: '#f8f6f6',
            show: true
        },
        series: {shadowSize: 0, color: "#f8b01d"},
        color: {color: '#63a5a2'},
        legend: {
            container: '#legend',
            show: true
        },
        yaxis: {
            min: 0,
            max: 10
        },
        xaxis: {
            tickFormatter: function (val, axis) {
                return moment.unix(val).minute() + ":" + moment.unix(val).second();
            }
        }
    };

    $scope.queues = [];



    /*$scope.GetAllQueueStatistics = function () {

        queueMonitorService.GetAllQueueStats().then(function (response) {

            $scope.queues = [];
            $scope.queues = response.map(function (c, index) {

                if(c.QueueId)

                var item = c.QueueInfo;
                item.id = c.QueueId;
                item.queuename= c.QueueName;
                item.AverageWaitTime = Math.round(item.AverageWaitTime*100)/100;

                if (c.QueueInfo.TotalQueued > 0) {
                    item.presentage = Math.round((c.QueueInfo.TotalAnswered / c.QueueInfo.TotalQueued) * 100);
                }
                return item;
            });
        });
    };*/


    $scope.checkQueueAvailability = function (itemID) {

        var value=$filter('filter')($scope.queues, {id: itemID})[0];
        if(value)
        {
            return false;
        }
        else
        {
            return true;
        }


    }


    $scope.GetAllQueueStatistics = function () {

        queueMonitorService.GetAllQueueStats().then(function (response) {

            var updatedQueues = [];
            updatedQueues = response.map(function (c, index) {



                var item = c.QueueInfo;
                item.id = c.QueueId;
                item.queuename= c.QueueName;
                item.AverageWaitTime = Math.round(item.AverageWaitTime*100)/100;

                if (c.QueueInfo.TotalQueued > 0) {
                    item.presentage = Math.round((c.QueueInfo.TotalAnswered / c.QueueInfo.TotalQueued) * 100);
                }

                if($scope.checkQueueAvailability(item.id))
                {
                    $scope.queues.push(item);
                }


                return item;
            });

            if(response.length==updatedQueues.length)
            {
                //$scope.queues=$scope.updatedQueues;
                angular.forEach($scope.queues, function (item)
                {
                    var value=$filter('filter')(updatedQueues, {id: item.id})[0];
                    if(!value)
                    {
                        $scope.queues.splice($scope.queues.indexOf(item),1);
                    }
                });
            }


        });
    };


    /*

     $scope.GetAllQueueStatistics = function() {


     queueMonitorService.GetAllConcurrentQueue().then(function (response) {

     $scope.dataSetQueued[0].data = response.map(function (c, index) {
     var item = c;

     if(c.TotalQueued > 0) {
     item.presentage = Math.round(c.TotalAnswered / c.TotalQueued) * 100;
     }

     return item;
     });
     });
     }


     */


    $scope.changeView = function () {
        $scope.isGrid=!$scope.isGrid;
        if($scope.isGrid)
        {
            $scope.summaryText="Card";
        }
        else
        {
            $scope.summaryText="Table";
        }
    }

    $scope.GetAllQueueStatistics();


    var ServerHandler = (function () {
        $scope.dataSetQueued = [{
            data: [],
            lines: {
                fill: true,
                lineWidth: 2
            }
        }];
    })();

    var getAllRealTime = function () {
        //$scope.GetAllQueueStatistics();
        getAllRealTimeTimer = $timeout(getAllRealTime, $scope.refreshTime);
    };

    // getAllRealTime();
    var getAllRealTimeTimer = $timeout(getAllRealTime, $scope.refreshTime);

    $scope.$on("$destroy", function () {
        if (getAllRealTimeTimer) {
            $timeout.cancel(getAllRealTimeTimer);
        }
    });






});

mainApp.directive('queued', function (queueMonitorService, $timeout) {
    return {

        restrict: 'EA',
        scope: {
            name: "@",
            queueoption: "=",
            pieoption: "="
        },


        templateUrl: 'template/queued-temp.html',
        link: function (scope, element, attributes) {


            console.log(scope.queueoption)
            console.log(scope.pieoption)
            scope.que = {};
            scope.options = {};
            scope.que.CurrentWaiting = 0;
            scope.que.presentage = 0;
            scope.maxy = 10;
            scope.val = "";

            scope.dataSet = [{
                data: [],
                lines: {
                    fill: true,
                    lineWidth: 2
                }
            }];




            scope.queueoption = {
                grid: {
                    borderColor: '#f8f6f6',
                    show: true
                },
                series: {shadowSize: 0, color: "#f8b01d"},
                color: {color: '#63a5a2'},
                legend: {
                    container: '#legend',
                    show: true
                },
                yaxis: {
                    min: 0,
                    max: scope.maxy
                },
                xaxis: {
                    tickFormatter: function (val, axis) {
                        return moment.unix(val).minute() + ":" + moment.unix(val).second();
                    }
                }
            };


            var qData = function () {

                queueMonitorService.GetSingleQueueStats(scope.name).then(function (response) {
                    scope.que = response.QueueInfo;
                    scope.que.id = response.QueueId;

                    scope.val= response.QueueName;
                    scope.que.AverageWaitTime = Math.round(scope.que.AverageWaitTime*100)/100;

                    if (scope.que.TotalQueued > 0) {
                        scope.que.presentage = Math.round((scope.que.TotalAnswered / scope.que.TotalQueued) * 100);
                    }
                });
            };


            var qStats = function(){

                //GetSingleQueueStats
                queueMonitorService.GetSingleQueueGraph(scope.name).then(function (response) {
                    response.pop();
                    var max = 0;
                    scope.dataSet[0].data = response.map(function (c, index) {
                        var item = [];
                        item[0] = c[1];
                        item[1] = c[0];


                        if (c[0] > max) {

                            max = c[0];
                        }

                        return item;
                    });

                    if (max == 0) {
                        max = 1;
                    }

                    if (scope.maxy != Math.ceil(max)) {

                        scope.maxy = Math.ceil(max);
                        scope.queueoption.yaxis.max = scope.maxy + 1;
                    }
                });

            }


            qData();
            qStats();


            var updateRealtime = function () {

                qData();
                qStats();

                updatetimer = $timeout(updateRealtime, 2000);

            };

            var updatetimer = $timeout(updateRealtime, 2000);

            //updateRealtime();


            scope.$on("$destroy", function() {
                if (updatetimer) {
                    $timeout.cancel(updatetimer);
                }
            })



            /*

             $interval(function updateRandom() {
             qData();
             qStats();


             }, 10000);

             */


        },


    }
});

mainApp.directive('queuedlist', function (queueMonitorService,$timeout) {
    return {

        restrict: 'EA',
        /*template:"<th class=\"fs15 text-left\">{{que.queuename}}</th><th class=\"fs15 text-right\">{{que.CurrentWaiting}}</th><th class=\"fs15 text-right\">{{que.CurrentMaxWaitTime| secondsToDateTime | date:'HH:mm:ss'}}</th>"
         +"<th class=\"fs15 text-right\">{{que.TotalQueued}}</th><th class=\"fs15 text-right\">{{que.MaxWaitTime| secondsToDateTime | date:'HH:mm:ss'}}</th>"
         + "<th class=\"fs15 text-right\">{{que.AverageWaitTime| secondsToDateTime | date:'HH:mm:ss'}}</th> <th class=\"fs15 text-right\">{{que.presentage}}</th>",
         */
        scope: {
            name: "@"
        },

        template: "<th class=\"fs15 text-left\">{{val}}</th>"+"<th class=\"fs15 text-right\">{{que.CurrentWaiting}}</th>"
        +"<th class=\"fs15 text-right\">{{que.CurrentMaxWaitTime| secondsToDateTime | date:'HH:mm:ss'}}</th> <th class=\"fs15 text-right\">{{que.TotalQueued}}</th>"
        +"<th class=\"fs15 text-right\">{{que.MaxWaitTime| secondsToDateTime | date:'HH:mm:ss'}}</th> <th class=\"fs15 text-right\">{{que.AverageWaitTime| secondsToDateTime | date:'HH:mm:ss'}}</th>"
        +"<th class=\"fs15 text-right\">{{que.presentage}}</th>",

        link: function (scope, element, attributes) {



            scope.que = {};
            scope.options = {};
            scope.que.CurrentWaiting = 0;
            scope.que.presentage = 0;
            scope.maxy = 10;
            scope.val = "";



            var qData = function () {

                queueMonitorService.GetSingleQueueStats(scope.name).then(function (response) {
                    scope.que = response.QueueInfo;
                    console.log("que  ",scope.que);
                    scope.que.id = response.QueueId;

                    scope.val= response.QueueName;
                    scope.que.AverageWaitTime = Math.round(scope.que.AverageWaitTime*100)/100;

                    if (scope.que.TotalQueued > 0) {
                        scope.que.presentage = Math.round((scope.que.TotalAnswered / scope.que.TotalQueued) * 100);
                    }
                });
            };





            qData();



            var updateRealtime = function () {

                qData();


                updatetimer = $timeout(updateRealtime, 2000);

            };

            var updatetimer = $timeout(updateRealtime, 2000);

            //updateRealtime();


            scope.$on("$destroy", function() {
                if (updatetimer) {
                    $timeout.cancel(updatetimer);
                }
            })



            /*

             $interval(function updateRandom() {
             qData();
             qStats();


             }, 10000);

             */


        },


    }
});
