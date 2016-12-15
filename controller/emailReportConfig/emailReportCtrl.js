/**
 * Created by dinusha on 6/12/2016.
 */
(function () {
    var app = angular.module("veeryConsoleApp");

    var emailReportCtrl = function ($scope, $location, $anchorScroll, cdrApiHandler, userProfileApiAccess, loginService) {

        $scope.showAlert = function (title, type, content) {

            new PNotify({
                title: title,
                text: content,
                type: type,
                styling: 'bootstrap3'
            });
        };

        $scope.reportType = {
            reportType: ''
        };

        $scope.userList = [];

        var loadUserList = function ()
        {
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
                if (err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Error', 'error', errMsg);
            });
        };

        loadUserList();

        var emptyArr = [];


        $scope.querySearch = function (query) {
            if (query === "*" || query === "") {
                if ($scope.userList) {
                    return $scope.userList;
                }
                else {
                    return emptyArr;
                }

            }
            else {
                if ($scope.userList) {
                    var filteredArr = $scope.userList.filter(function (item) {
                        var regEx = "^(" + query + ")";

                        if (item.username) {
                            return item.username.match(regEx);
                        }
                        else {
                            return false;
                        }

                    });

                    return filteredArr;
                }
                else {
                    return emptyArr;
                }
            }

        };

        $scope.saveRecipients = function()
        {
            var arrMap = $scope.reportUsers.map(function(item)
            {
                return item._id;
            });

            cdrApiHandler.saveRecipients($scope.reportType.reportType, arrMap).then(function (data)
            {
                if (data.IsSuccess && data.Result && data.Result.users)
                {
                    $scope.showAlert('Success', 'success', 'recipients added successfully');
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
                var errMsg = "Error occurred while loading recipients";
                if (err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Error', 'error', errMsg);
            });
        };

        $scope.loadRecipients = function()
        {
            $scope.reportUsers = [];

            cdrApiHandler.getEmailRecipientsForReport($scope.reportType.reportType).then(function (data)
            {
                if (data.IsSuccess && data.Result && data.Result.users)
                {
                    $scope.reportUsers = data.Result.users;
                }
                else
                {
                    if(!data.IsSuccess)
                    {
                        var errMsg = data.CustomMessage;

                        if (data.Exception)
                        {
                            errMsg = data.Exception.Message;
                        }
                        $scope.showAlert('Error', 'error', errMsg);
                    }


                }

            }, function (err)
            {
                loginService.isCheckResponse(err);
                var errMsg = "Error occurred while loading recipients";
                if (err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Error', 'error', errMsg);
            });
        }

    };


    app.controller("emailReportCtrl", emailReportCtrl);
}());
