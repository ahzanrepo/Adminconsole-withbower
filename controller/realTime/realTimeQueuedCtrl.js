/**
 * Created by Damith on 5/29/2016.
 */

mainApp.controller('realTimeQueuedCtrl', function ($scope, queueMonitorService) {

    //$scope.percent = 65;

    $scope.queues = [];

    $scope.GetAllQueueStatistics = function() {


        queueMonitorService.GetAllQueueStats().then(function (response) {

            $scope.queues = response.map(function (c, index) {
                var item = c;

                if(c.TotalQueued > 0) {
                    item.presentage = Math.round(c.TotalAnswered / c.TotalQueued) * 100;
                }

                return item;
            });
        });
    }


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




    $interval(function updateRandom() {
        $scope.GetAllQueueStatistics();
    }, 30000);




    $scope.options = {
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


    var ServerHandler = (function () {
        $scope.dataSetQueued = [{
            data: [],
            lines: {
                fill: true,
                lineWidth: 2
            }
        }];
    })();

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
});