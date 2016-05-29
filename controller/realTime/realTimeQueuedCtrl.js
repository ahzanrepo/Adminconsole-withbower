/**
 * Created by Damith on 5/29/2016.
 */

mainApp.controller('realTimeQueuedCtrl', function ($scope, $rootScope, $interval, queueMonitorService) {

    //$scope.percent = 65;

    $scope.queues = [];

    $scope.GetAllQueueStatistics = function () {
        $scope.queues = [];
        queueMonitorService.GetAllQueueStats().then(function (response) {
            $scope.queues = response.map(function (c, index) {
                var item = c.QueueInfo;
                item.id = c.QueueId;

                if (c.QueueInfo.TotalQueued > 0) {
                    item.presentage = Math.round((c.QueueInfo.TotalAnswered / c.QueueInfo.TotalQueued) * 100);
                }
                return item;
            });
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


    $rootScope.pieOptions = {
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
    $scope.optionEnglishQue = {
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
            max: 2

        }
    };

}).directive('queued', function (queueMonitorService, $interval) {
    return {

        restrict: 'EA',
        scope: {
            name: "@",
            heroes: '=data'
        },


        templateUrl: 'template/queued-temp.html',
        link: function (scope,$rootScope, element, attributes) {


            scope.que = [];
            scope.que.CurrentWaiting = 1;
            scope.que.presentage = 0;


                 scope.optionEnglishQue = {
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
                    max: 2

                }
            };

            var qData = function () {

                queueMonitorService.GetSingleQueueStats(scope.name).then(function (response) {
                    scope.que = response.QueueInfo;
                    scope.que.id = response.QueueId;
                    if (scope.que.TotalQueued > 0) {
                        scope.que.presentage = Math.round((scope.que.TotalAnswered / scope.que.TotalQueued) * 100);
                    }
                });
            };

            qData();
            $interval(function updateRandom() {
                qData();


            }, 3000);


        },


    }
});