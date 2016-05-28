/**
 * Created by Damith on 5/28/2016.
 */

'use strict';
mainApp.controller('mainCtrl', function ($scope, $state, $interval) {

    $scope.clickDirective = {
        goDashboard: function () {
            $state.go('console.dashboard');
        }
    };

    $scope.data = [];
    $scope.dataset = [{
        data: [], lines: {
            fill: true
        }
    }];
    $scope.dataset2 = [{
        data: [], lines: {
            fill: false
        }
    }];


    var i = 0;

    function getRandomData() {
        if ($scope.data.length) {
            $scope.data = $scope.data.slice(1);
        }
        var max = 600;

        while ($scope.data.length < max) {
            var previous = $scope.data.length ? $scope.data[$scope.data.length - 1] : 50;
            var y = previous + Math.random() * 10 - 5;
            $scope.data.push(y < 0 ? 0 : y > 100 ? 100 : y);
        }
        var res = [];
        for (i = 0; i < $scope.data.length; ++i) {
            res.push([i, $scope.data[i]])
        }
        i++;
        return res;
    }

    function getRandomData2() {
        if ($scope.data.length) {
            $scope.data = $scope.data.slice(1);
        }
        var max = 5;
        while ($scope.data.length < max) {
            var previous = $scope.data.length ? $scope.data[$scope.data.length - 1] : 50;
            var y = previous + Math.random() * 10 - 5;
            $scope.data.push(y < 0 ? 0 : y > 100 ? 100 : y);
        }
        var res = [];
        for (i = 0; i < $scope.data.length; ++i) {
            res.push([i, $scope.data[i]])
        }
        i++;
        return res;
    }

    var t = $interval(function updateRandom() {
        $scope.dataset[0].data = getRandomData();
    }, 100);

    var t = $interval(function updateRandom() {
        $scope.dataset2[0].data = getRandomData2();
    }, 500);

    $scope.myChartOptions = {
        grid: {borderColor: '#fff'},
        series: {shadowSize: 0, color: "#f18f53"},
        color: {color: '#5566ff'},
        legend: {
            container: '#legend',
            show: true
        },
        yaxis: {
            min: 10,
            max: 110
        }
    };

    $scope.myChartOptions2 = {
        grid: {borderColor: '#fff'},
        series: {shadowSize: 0, color: "#63a5a2"},
        color: {color: '#63a5a2'},
        legend: {
            container: '#legend',
            show: true
        },
        yaxis: {
            min: 10,
            max: 110
        }
    };

    $scope.myChartOptions3 = {
        grid: {borderColor: '#fff'},
        series: {shadowSize: 0, color: "#dca557"},
        color: {color: '#63a5a2'},
        legend: {
            container: '#legend',
            show: true
        },
        yaxis: {
            min: 10,
            max: 110
        },
        xaxis: 500
    };
    $scope.myChartOptions4 = {
        grid: {borderColor: '#fff'},
        series: {shadowSize: 0, color: "#9B59B6"},
        color: {color: '#63a5a2'},
        legend: {
            container: '#legend',
            show: true
        },
        yaxis: {
            min: 10,
            max: 110
        }
    };

    //chart js

});

