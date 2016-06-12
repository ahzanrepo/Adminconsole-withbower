/**
 * Created by dinusha on 6/12/2016.
 */
(function ()
{
    var app = angular.module("veeryConsoleApp");

    var userListCtrl = function ($scope, $stateParams, userProfileApiAccess)
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

        $scope.NewUserOpened = false;

        $scope.addUserPress = function()
        {
            $scope.NewUserOpened = !$scope.NewUserOpened;

            if($scope.NewUserLabel === '+')
            {
                $scope.NewUserLabel = '-';
            }
            else if($scope.NewUserLabel === '+')
            {
                $scope.NewUserLabel = '-';
            }


        };

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

        $scope.addNewContact = function()
        {
            userProfileApiAccess.addContactToProfile($scope.CurrentProfile.username, $scope.newContact.Contact, $scope.newContact.Type).then(function(data)
            {
                if(data.IsSuccess)
                {
                    $scope.showAlert('Success', 'info', 'Contact added');

                    userProfileApiAccess.getProfileByName($scope.CurrentProfile.username).then(function(data1)
                    {
                        if(data1.IsSuccess)
                        {
                            $scope.CurrentProfile.contacts = data1.Result.contacts;
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
                        var errMsg = "Error occurred while loading new contact list";
                        if(err.statusText)
                        {
                            errMsg = err.statusText;
                        }
                        $scope.showAlert('Error', 'error', errMsg);
                    });


                }
                else
                {
                    $scope.showAlert('Error', 'error', 'Error adding contact');
                }

            }, function(err)
            {
                var errMsg = "Error updating user";
                if(err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Error', 'error', errMsg);
            });
        };


        $scope.removeContact = function(contact)
        {
            userProfileApiAccess.deleteContactFromProfile($scope.CurrentProfile.username, contact).then(function (data)
            {
                if(data.IsSuccess)
                {
                    $scope.showAlert('Success', 'info', 'Contact added');

                    userProfileApiAccess.getProfileByName($scope.CurrentProfile.username).then(function(data1)
                    {
                        if(data1.IsSuccess)
                        {
                            $scope.CurrentProfile.contacts = data1.Result.contacts;
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
                        var errMsg = "Error occurred while loading new contact list";
                        if(err.statusText)
                        {
                            errMsg = err.statusText;
                        }
                        $scope.showAlert('Error', 'error', errMsg);
                    });


                }
                else
                {
                    $scope.showAlert('Error', 'error', 'Error deleting contact');
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

        }

        loadUsers();

    };

    app.controller("userListCtrl", userListCtrl);
}());
