/**
 * Created by dinusha on 6/2/2016.
 */

(function ()
{
    var app = angular.module("veeryConsoleApp");

    var sipUserCtrl = function ($scope, sipUserApiHandler)
    {
        $scope.showAlert = function (title, type, content) {

            new PNotify({
                title: title,
                text: content,
                type: type,
                styling: 'bootstrap3'
            });
        };


        $scope.reloadUserList = function()
        {
            sipUserApiHandler.getSIPUsers().then(function(data)
            {
                if(data.IsSuccess)
                {
                    $scope.sipUsrList = data.Result;
                    $scope.total = data.Result.length;
                }
                else
                {
                    var errMsg = data.CustomMessage;

                    if(data.Exception)
                    {
                        errMsg = data.Exception.Message;
                    }
                    $scope.showAlert('Error', 'error', errMsg);

                }

                $scope.dataReady = true;

            }, function(err)
            {
                var errMsg = "Error occurred while getting pabx user list";
                if(err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Error', 'error', errMsg);
                $scope.dataReady = true;
            });
        };

        $scope.reloadUserList();

    };

    app.controller("sipUserCtrl", sipUserCtrl);
}());
