/**
 * Created by Damith on 9/22/2016.
 */


mainApp.controller('agentDashboardCtrl', function ($scope) {

    console.log('agent ticket dashbaord..');


    $scope.myDataa = [{
        data: [[5, 1], [15, 10], [17, 20], [30, 25]],
        lines: {
            fill: false,
            lineWidth: 1,
            color: '#63a5a2'
        }
    }];
    $scope.myChartOptionss = {
        grid: {
            borderWidth: 1,
            borderColor: '#f7f5f5 ',
            show: true
        },
        series: {
            lines: {show: true, fill: true, color: "#114858"},
            points: {show: true},
        },
        color: {color: '#63a5a2'},
        legend: {
            show: true
        },
        yaxis: {
            min: 0,
            color: '#f7f5f5'
        }, xaxis: {
            color: '#f7f5f5'
        }
    };
});

