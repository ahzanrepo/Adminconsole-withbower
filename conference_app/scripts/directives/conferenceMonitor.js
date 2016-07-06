/**
 * Created by Rajinda on 5/30/2016.
 */
mainApp.directive("conferencemonitor", function ($filter, $uibModal, $log, conferenceService) {

    return {
        restrict: "EA",
        scope: {
            conferenceData: "="
        },

        templateUrl: 'conference_app/views/monitor/monitorItem.html',
        link: function (scope, element, attributes) {
            scope.$on('getActiveConfUserCount',function(event, data){
                scope.GetActiveConferenceUserCount();
            });

            scope.isLoading = false;
            scope.reloadPage = function () {

            };

            scope.activeUserCount = 0;
            scope.GetActiveConferenceUserCount = function () {
                conferenceService.GetActiveConferenceUserCount(scope.conferenceData.ConferenceName).then(function (response) {
                    if (response) {

                        if (scope.activeUserCount != parseInt(response)) {
                            scope.getConferenceActiveUsers();
                        }
                        scope.activeUserCount = response;
                    }
                }, function (err) {
                    scope.showAlert('Error', 'error', "Fail To Get Active User Count for Conference " + scope.conferenceData.ConferenceName);
                });
            };

            scope.activeUsers = [];
            scope.getConferenceActiveUsers = function () {
                conferenceService.GetConferenceActiveUsers(scope.conferenceData.ConferenceName).then(function (response) {
                    scope.activeUsers = response;
                }, function (err) {
                    scope.showAlert('Error', 'error', "Fail To Get Active Users for Conference " + scope.conferenceData.ConferenceName);
                });
            };

            scope.UserOperations = function (user, operation) {
                conferenceService.UserOperations(user, operation).then(function (response) {
                    if (response) {
                        scope.showAlert("User Operation", "success", "Operation[" + operation + "] Complete.");
                    }
                }, function (err) {
                    scope.showAlert('Error', 'error', "Fail To Get Active Users for Conference " + scope.conferenceData.ConferenceName);
                });
            };

            scope.showAlert = function (title, type, content) {
                new PNotify({
                    title: title,
                    text: content,
                    type: type,
                    styling: 'bootstrap3'
                });
            };

            scope.showConfirm = function (tittle, label, okbutton, cancelbutton, content, OkCallback, CancelCallBack, okObj) {

                (new PNotify({
                    title: tittle,
                    text: content,
                    icon: 'glyphicon glyphicon-question-sign',
                    hide: false,
                    confirm: {
                        confirm: true
                    },
                    buttons: {
                        closer: false,
                        sticker: false
                    },
                    history: {
                        history: false
                    }
                })).get().on('pnotify.confirm', function () {
                        OkCallback("confirm");
                    }).on('pnotify.cancel', function () {

                    });

            };


        }
    }
});