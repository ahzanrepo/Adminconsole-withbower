/**
 * Created by Waruna on 9/27/2017.
 */

mainApp.controller("detailsDashboardController", function ($scope, $filter, $stateParams,$anchorScroll, queueMonitorService,subscribeServices) {
    $anchorScroll();

    $scope.dtOptions = {paging: false, searching: false, info: false, order: [0, 'desc']};

    $scope.safeApply = function (fn) {
        if (this.$root) {
            var phase = this.$root.$$phase;
            if (phase == '$apply' || phase == '$digest') {
                if (fn && (typeof(fn) === 'function')) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        } else {
            this.$apply(fn);
        }
    };

    $scope.queues = {};

    subscribeServices.subscribe('queuedetail');
    //subscribe services
    subscribeServices.subscribeDashboard(function (event) {

        switch (event.roomName) {
            case 'QUEUE:QueueDetail':
                if (event.Message) {
                    var item = event.Message.QueueInfo;
                    if (item.CurrentMaxWaitTime) {
                        var d = moment(item.CurrentMaxWaitTime).valueOf();
                        item.MaxWaitingMS = d;

                        if (item.EventTime) {

                            var serverTime = moment(item.EventTime).valueOf();
                            tempMaxWaitingMS = serverTime - d;
                            item.MaxWaitingMS = moment().valueOf() - tempMaxWaitingMS;

                        }

                    }

                    //
                    item.id = event.Message.QueueId;

                    item.QueueName = event.Message.QueueName;
                    item.AverageWaitTime = Math.round(item.AverageWaitTime * 100) / 100;

                    if (item.TotalQueued > 0) {
                        item.presentage = Math.round((item.TotalAnswered / item.TotalQueued) * 100);
                    }

                    if (!$scope.queues[event.Message.QueueId]) {
                        $scope.queueList.push(item);
                    }
                    $scope.safeApply(function () {
                        $scope.queues[event.Message.QueueId] = item;
                    });
                }
                break;
        }
    });

    $scope.GetAllQueueStatistics = function () {

        queueMonitorService.GetAllQueueStats().then(function (response) {

            angular.forEach(response, function (c) {
                // var value = $filter('filter')(updatedQueues, {id: item.id})[0];
                // if (!value) {
                //     $scope.queues.splice($scope.queues.indexOf(item), 1);
                // }


                var item = c.QueueInfo;
                item.id = c.QueueId;
                item.QueueName = c.QueueName;
                item.AverageWaitTime = Math.round(item.AverageWaitTime * 100) / 100;

                if (item.CurrentMaxWaitTime) {
                    var d = moment(item.CurrentMaxWaitTime).valueOf();
                    item.MaxWaitingMS = d;

                    if (item.EventTime) {

                        var serverTime = moment(item.EventTime).valueOf();
                        tempMaxWaitingMS = serverTime - d;
                        item.MaxWaitingMS = moment().valueOf() - tempMaxWaitingMS;

                    }

                }

                if (item.TotalQueued > 0) {
                    item.presentage = Math.round((item.TotalAnswered / item.TotalQueued) * 100);
                }

                // if ($scope.checkQueueAvailability(item.id)) {
                $scope.queues[item.QueueId] = item;
                /*$scope.queueList.push(item);*/
                //}
            });


        });
    };

    $scope.GetAllQueueStatistics();

});


