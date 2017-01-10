mainApp.controller('ivrNodeCountController', ['$scope', '$filter','$anchorScroll', 'ivrNodeCountService', function ($scope, $filter,$anchorScroll, ivrNodeCountService)
{
    $anchorScroll();

    // search
    $scope.StartTime = {
        date: new Date()
    };
    $scope.EndTime = {
        date: new Date()
    };
    $scope.openCalendar = function (name) {
        if (name == 'StartTime') {
            $scope.StartTime.open = true;
        }
        else {
            $scope.EndTime.open = true;
        }

    };
    var d = new Date();
    d.setDate(d.getDate() - 1);
    $scope.fileSerach = {};
    $scope.fileSerach.StartTime = d;
    $scope.fileSerach.EndTime = new Date();
    // search end

    var showAlert = function (tittle, type, content) {
        new PNotify({
            title: tittle,
            text: content,
            type: type,
            styling: 'bootstrap3'
        });
    };

    $scope.applicationList = [];
    $scope.application = {};
    var GetApplicationList = function () {

        ivrNodeCountService.GetApplicationList().then(function (response) {
            if(response){
                $scope.applicationList = response;
                if ($scope.applicationList) {
                    if ($scope.applicationList.length > 0) {
                        $scope.application = $scope.applicationList[0].id;
                    }
                }
            }
            else {
                showAlert("IVR","error", "Fail To Get Application List.");
            }
        }, function (err) {
            showAlert("IVR","error", "Fail To Get Application List.");
        });
    };
    GetApplicationList();


    $scope.doughnutObj = {labels: [], data: [], node:[]};
    $scope.options = {
        type: 'doughnut',
        responsive: false,
        legend: {
            display: true,
            position: 'bottom',
            padding: 5,
            labels: {
                fontColor: 'rgb(130, 152, 174)',
                fontSize: 10,
                boxWidth: 10
            }
        },
        title: {
            display: true
        }
    };

    $scope.isLoading = false;
    $scope.noDataToshow = false;
    $scope.LoadNodeData = function () {

        if (!$scope.application) {
            showAlert("IVR","error", "Please Select Application");
            return
        }

        if ($scope.fileSerach.StartTime >= $scope.fileSerach.EndTime) {
            showAlert("IVR","error", "End time should be greater than start time.");
            return
        }



        $scope.isLoading = true;
        ivrNodeCountService.GetIvrNodeCount($scope.application,$scope.fileSerach.StartTime.toUTCString(),$scope.fileSerach.EndTime.toUTCString()).then(function (response) {
            $scope.isLoading = false;
            if(response){
                $scope.doughnutObj = {labels: [], data: [], node:[]};
                angular.forEach(response,function (item) {
                    if(item){
                        item.EventParams = item.EventParams?item.EventParams:"Other";
                        $scope.doughnutObj.labels.push(item.EventParams);
                        $scope.doughnutObj.data.push(item.count);
                        $scope.doughnutObj.node.push(item);

                    }
                });

            }
            else {
                $scope.noDataToshow = true;
            }
        }, function (err) {
            showAlert("IVR","error", "Fail To Get Node Count.");
        });
    };



}]);
