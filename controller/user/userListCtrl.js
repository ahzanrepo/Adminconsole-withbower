/**
 * Created by dinusha on 6/12/2016.
 */
(function () {
    var app = angular.module("veeryConsoleApp");

    var userListCtrl = function ($scope, $stateParams, $state, userProfileApiAccess, loginService) {

        $scope.showAlert = function (title, type, content) {

            new PNotify({
                title: title,
                text: content,
                type: type,
                styling: 'bootstrap3'
            });
        };


        $scope.newUser = {};
        $scope.newUserGroup = {};
        $scope.newUser.title = 'mr';
        $scope.NewUserLabel = "+";
        $scope.newGroupUsers = [];

        $scope.searchCriteria = "";

        $scope.NewUserOpened = false;

        $scope.addUserPress = function () {
            $scope.NewUserOpened = !$scope.NewUserOpened;

            if ($scope.NewUserLabel === '+') {
                $scope.NewUserLabel = '-';
            }
            else if ($scope.NewUserLabel === '-') {
                $scope.NewUserLabel = '+';
            }


        };

        var resetForm = function () {
            $scope.newUser = {};
            $scope.NewUserLabel = "+";
            $scope.searchCriteria = "";
            $scope.NewUserOpened = false;
            $scope.newUserGroup = {};
        };

        $scope.viewProfile = function (username) {
            $state.go('console.userprofile', {'username': username});
        };

        $scope.viewPermissions = function (item) {
            $state.go('console.applicationAccessManager', {username: item.username, role: item.user_meta.role});
        };


        var loadUsers = function () {
            userProfileApiAccess.getUsers().then(function (data) {
                if (data.IsSuccess) {
                    $scope.userList = data.Result;
                }
                else {
                    var errMsg = data.CustomMessage;

                    if (data.Exception) {
                        errMsg = data.Exception.Message;
                    }
                    $scope.showAlert('Error', 'error', errMsg);

                }

            }, function (err) {
                loginService.isCheckResponse(err);
                var errMsg = "Error occurred while loading users";
                if (err.statusText) {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Error', 'error', errMsg);
            });
        };
        var loadUserGroups = function () {
            userProfileApiAccess.getUserGroups().then(function (data) {
                if (data.IsSuccess) {
                    $scope.userGroupList = data.Result;

                    if ($scope.userGroupList.length > 0) {
                        $scope.loadGroupMembers($scope.userGroupList[0]);
                    }
                }
                else {
                    var errMsg = data.CustomMessage;

                    if (data.Exception) {
                        errMsg = data.Exception.Message;
                    }
                    $scope.showAlert('Error', 'error', errMsg);

                }

            }, function (err) {
                loginService.isCheckResponse(err);
                var errMsg = "Error occurred while loading users";
                if (err.statusText) {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Error', 'error', errMsg);
            });
        };

        $scope.addNewUser = function () {
            userProfileApiAccess.addUser($scope.newUser).then(function (data) {
                if (data.IsSuccess) {
                    $scope.showAlert('Success', 'info', 'User added');

                    resetForm();

                    loadUsers();


                }
                else {
                    var errMsg = "";
                    if (data.Exception && data.Exception.Message) {
                        errMsg = data.Exception.Message;
                    }

                    if (data.CustomMessage) {
                        errMsg = data.CustomMessage;
                    }
                    $scope.showAlert('Error', 'error', errMsg);
                }

            }, function (err) {
                loginService.isCheckResponse(err);
                var errMsg = "Error adding user";
                if (err.statusText) {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Error', 'error', errMsg);
            });
        };

        loadUsers();
        loadUserGroups();


        $scope.removeUser = function (username) {

            new PNotify({
                title: 'Confirm deletion',
                text: 'Are you sure you want to delete user ?',
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
            }).get().on('pnotify.confirm', function () {
                userProfileApiAccess.deleteUser(username).then(function (data) {
                    if (data.IsSuccess) {
                        $scope.showAlert('Success', 'info', 'User deleted');
                        loadUsers();
                    }
                    else {
                        var errMsg = "";

                        if (data.Exception) {
                            errMsg = data.Exception.Message;
                        }

                        if (data.CustomMessage) {
                            errMsg = data.CustomMessage;
                        }
                        $scope.showAlert('Error', 'error', errMsg);
                    }

                }, function (err) {
                    loginService.isCheckResponse(err);
                    var errMsg = "Error occurred while deleting contact";
                    if (err.statusText) {
                        errMsg = err.statusText;
                    }
                    $scope.showAlert('Error', 'error', errMsg);
                });
            }).on('pnotify.cancel', function () {

            });


        };


        $scope.addNewUserGroup = function () {
            userProfileApiAccess.addUserGroup($scope.newUserGroup).then(function (response) {

                if (response.IsSuccess) {
                    $scope.showAlert("New User group", "success", "New User group added successfully");
                    resetForm();
                    loadUserGroups();
                }
                else {
                    $scope.showAlert("New User group", "error", "New User group adding failed");
                }

            }, function (err) {
                loginService.isCheckResponse(err);
                $scope.showAlert("New User group", "error", "Error in new User group adding");
            })
        };

        $scope.showMembers = false;


        /*update code damith*/
        $scope.groupMemberlist = [];
        $scope.isLoadingUsers = false;
        $scope.selectedGroup = null;
        var removeAllocatedAgents = function () {
            $scope.groupMemberlist.filter(function (member) {
                $scope.agents.filter(function (agent) {
                    if (agent._id == member._id) {
                        $scope.agents.splice($scope.agents.indexOf(agent), 1);
                    }
                })
            })
        };

        $scope.loadGroupMembers = function (group) {
            $scope.groupMemberlist = [];
            $scope.isLoadingUsers = true;
            $scope.selectedGroup = group;
            
            userProfileApiAccess.getGroupMembers(group._id).then(function (response) {
                if (response.IsSuccess) {
                    $scope.groupMemberlist = response.Result;
                    removeAllocatedAgents()
                }
                else {
                    console.log("Error in loading Group member list");
                    //scope.showAlert("User removing from group", "error", "Error in removing user from group");
                }
                $scope.isLoadingUsers = false;
            }, function (err) {
                console.log("Error in loading Group member list ", err);
                //scope.showAlert("User removing from group", "error", "Error in removing user from group");
            });
        };


        //remove group member
        $scope.removeGroupMember = function (userID) {
            //confirm box
            new PNotify({
                title: 'Confirmation Needed',
                text: 'Are you sure?',
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
                },
                addclass: 'stack-modal',
            }).get().on('pnotify.confirm', function () {
                userProfileApiAccess.removeUserFromGroup($scope.selectedGroup._id, userID).then(function (response) {
                    if (response.IsSuccess) {
                        $scope.groupMemberlist.filter(function (userObj) {
                            if (userObj._id == userID) {
                                $scope.groupMemberlist.splice($scope.groupMemberlist.indexOf(userObj), 1);
                                $scope.agents.push(userObj);
                                $scope.showAlert("User removing from group", "success", "User removed from group successfully");
                            }
                        });
                    }
                    else {
                        $scope.showAlert("User removing from group", "error", "Error in removing user from group");
                    }
                }, function (error) {
                    $scope.showAlert("User removing from group", "error", "User removing from group failed");
                });
            }).on('pnotify.cancel', function () {
                console.log('fire event cancel');
            });

        };


        //create new group
        $scope.createNewGroup = function () {
            $('#crateNewGroupWrapper').animate({
                bottom: "-5"
            }, 500);
        };
        $scope.hiddenNewGroupDIV = function () {
            $('#crateNewGroupWrapper').animate({
                bottom: "-95"
            }, 300);
        };

        $scope.addNewGroupMember = function () {
            $('#crateNewGroupMemberWrapper').animate({
                bottom: "-5"
            }, 500);
        };
        $scope.hiddenNewGroupMember = function () {
            $('#crateNewGroupMemberWrapper').animate({
                bottom: "-95"
            }, 300);
        };


        //add user to group
        $scope.agents = [];
        //get all agents
        //onload
        $scope.loadAllAgents = function () {
            userProfileApiAccess.getUsers().then(function (data) {
                if (data.IsSuccess) {
                    $scope.agents = data.Result;
                    removeAllocatedAgents();
                }
            }, function (error) {
                $scope.showAlert("Loading Agent details", "error", "Error in loading Agent details");
            });
        };
        $scope.loadAllAgents();

        //add new member to current selected group
        $scope.addUserToGroup = function (userID) {
            userProfileApiAccess.addMemberToGroup($scope.selectedGroup._id, userID).then(function (response) {
                if (response.IsSuccess) {
                    $scope.agents.filter(function (userObj) {
                        if (userObj._id == userID) {
                            $scope.groupMemberlist.push(userObj);
                            $scope.showAlert("Member added to group", "success", "Member added to group successfully");
                            removeAllocatedAgents();
                        }
                    })
                }
                else {
                    $scope.showAlert("Member added to group", "error", "Error in Member adding to group");
                }
            }, function (error) {
                $scope.showAlert("Member added to group", "error", "Member added to group failed");
            })
        }


    };

    app.controller("userListCtrl", userListCtrl);
}());
