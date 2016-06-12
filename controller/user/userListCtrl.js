/**
 * Created by dinusha on 6/12/2016.
 */
(function ()
{
    var app = angular.module("veeryConsoleApp");

    var userListCtrl = function ($scope, $stateParams, $state, userProfileApiAccess)
    {

        $scope.showAlert = function (title, type, content) {

            new PNotify({
                title: title,
                text: content,
                type: type,
                styling: 'bootstrap3'
            });
        };

        $scope.newUser = {};
        $scope.NewUserLabel = "+";

        $scope.searchCriteria = "";

        $scope.NewUserOpened = false;

        $scope.addUserPress = function()
        {
            $scope.NewUserOpened = !$scope.NewUserOpened;

            if($scope.NewUserLabel === '+')
            {
                $scope.NewUserLabel = '-';
            }
            else if($scope.NewUserLabel === '-')
            {
                $scope.NewUserLabel = '+';
            }


        };

        var resetForm = function()
        {
            $scope.newUser = {};
            $scope.NewUserLabel = "+";
            $scope.searchCriteria = "";
            $scope.NewUserOpened = false;
        };

        $scope.viewProfile = function(username)
        {
            $state.go('console.userprofile', {username: username});
        }

        $scope.saveProfile = function()
        {
            userProfileApiAccess.updateProfile($scope.CurrentProfile.username, $scope.CurrentProfile).then(function(data)
            {
                if(data.IsSuccess)
                {
                    $scope.showAlert('Success', 'info', 'User profile updated successfully');

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

            }, function(err)
            {
                var errMsg = "Error occurred while getting profile";
                if(err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Error', 'error', errMsg);
            });

        }


        var loadUsers = function()
        {
            userProfileApiAccess.getUsers().then(function(data)
            {
                if(data.IsSuccess)
                {
                    $scope.userList = data.Result;
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

            }, function(err)
            {
                var errMsg = "Error occurred while loading users";
                if(err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Error', 'error', errMsg);
            });
        };

        $scope.addNewUser = function()
        {
            userProfileApiAccess.addUser($scope.newUser).then(function(data)
            {
                if(data.IsSuccess)
                {
                    $scope.showAlert('Success', 'info', 'User added');

                    resetForm();

                    loadUsers();


                }
                else
                {
                    var errMsg = data.Exception.Message;
                    if(data.CustomMessage)
                    {
                        errMsg = data.CustomMessage;
                    }
                    $scope.showAlert('Error', 'error', errMsg);
                }

            }, function(err)
            {
                var errMsg = "Error adding user";
                if(err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Error', 'error', errMsg);
            });
        };


        $scope.removeUser = function(username)
        {
            userProfileApiAccess.deleteUser(username).then(function (data)
            {
                if(data.IsSuccess)
                {
                    $scope.showAlert('Success', 'info', 'User deleted');
                    loadUsers();
                }
                else
                {
                    var errMsg = "";

                    if(data.Exception)
                    {
                        errMsg = data.Exception.Message;
                    }

                    if(data.CustomMessage)
                    {
                        errMsg = data.CustomMessage;
                    }
                    $scope.showAlert('Error', 'error', errMsg);
                }

            }, function (err)
            {
                var errMsg = "Error occurred while deleting contact";
                if (err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Error', 'error', errMsg);
            });

        };

        loadUsers();

    };

    app.controller("userListCtrl", userListCtrl);
}());
