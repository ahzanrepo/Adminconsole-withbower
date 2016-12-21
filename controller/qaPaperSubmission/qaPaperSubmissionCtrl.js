/**
 * Created by dinusha on 9/6/2016.
 */
(function () {
    var app = angular.module("veeryConsoleApp");

    var qaSubmissionCtrl = function ($scope, $filter, $q, userProfileApiAccess, loginService) {

        $scope.showAlert = function (tittle, type, content) {

            new PNotify({
                title: tittle,
                text: content,
                type: type,
                styling: 'bootstrap3'
            });
        };

        $scope.userList = [];

        $scope.startDate = moment().format("YYYY-MM-DD");
        $scope.endDate = moment().format("YYYY-MM-DD");

        var loadUsers = function () {
            userProfileApiAccess.getUsers().then(function (data)
            {
                if (data.IsSuccess)
                {
                    $scope.userList = data.Result;
                }
                else
                {
                    var errMsg = data.CustomMessage;

                    if (data.Exception)
                    {
                        errMsg = data.Exception.Message;
                    }
                    $scope.showAlert('Error', 'error', errMsg);

                }

            }, function (err)
            {
                loginService.isCheckResponse(err);
                var errMsg = "Error occurred while loading users";
                if (err.statusText) {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Error', 'error', errMsg);
            });
        };

        loadUsers();


    };
    app.controller("qaSubmissionCtrl", qaSubmissionCtrl);

}());


