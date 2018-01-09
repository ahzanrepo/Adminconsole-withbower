/**
 * Created by dinusha on 6/12/2016.
 */
(function () {
    var app = angular.module("veeryConsoleApp");

    var userListCtrl = function ($scope, $stateParams, $state, userProfileApiAccess, loginService, $anchorScroll, companyConfigBackendService) {

        $scope.safeApply = function (fn) {
            var phase = this.$root.$$phase;
            if (phase == '$apply' || phase == '$digest') {
                if (fn && (typeof(fn) === 'function')) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        };

        $anchorScroll();
        $scope.showAlert = function (title, type, content) {

            new PNotify({
                title: title,
                text: content,
                type: type,
                styling: 'bootstrap3'
            });
        };

        $scope.isEditing=false;
        $scope.businessUnits=[];
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
            userProfileApiAccess.getUsers('all').then(function (data) {
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


                $scope.getUsersFromActiveDirectory();

            }, function (err) {
                loginService.isCheckResponse(err);
                var errMsg = "Error occurred while loading users";
                if (err.statusText) {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Error', 'error', errMsg);
            });
        };

        var loadAdminUsers = function () {
            userProfileApiAccess.getUsersByRole().then(function (data) {
                if (data.IsSuccess) {
                    $scope.adminUserList = data.Result;
                }
                else {
                    var errMsg = data.CustomMessage;

                    if (data.Exception) {
                        errMsg = data.Exception.Message;
                    }
                    $scope.showAlert('Error', 'error', errMsg);

                }
            },function (err) {
                var errMsg = "Error occurred while loading users";
                if (err.statusText) {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Error', 'error', errMsg);
            })
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
        loadAdminUsers();


        $scope.removeUser = function (user) {


            console.log(user.Active);
            if(user.Active) {

                if(!$scope.disableSwitch) {

                    $scope.safeApply(function () {
                        $scope.disableSwitch = true;
                    });

                    console.log("activate");

                    new PNotify({
                        title: 'Confirm Reactivation',
                        text: 'Are You Sure You Want To Reactivate User ?',
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
                        userProfileApiAccess.ReactivateUser(user.username).then(function (data) {
                            if (data.IsSuccess) {
                                $scope.showAlert('Success', 'info', 'User Reactivated');
                                $scope.safeApply(function () {
                                    $scope.disableSwitch = false;
                                });
                            }
                            else {
                                var errMsg = "";
                                $scope.safeApply(function () {
                                    user.Active = false;
                                    $scope.disableSwitch = false;
                                });


                                if (data.Exception) {
                                    errMsg = data.Exception.Message;
                                }

                                if (data.CustomMessage) {
                                    errMsg = data.CustomMessage;
                                }
                                $scope.showAlert('Error', 'error', errMsg);
                            }

                        }, function (err) {
                            $scope.safeApply(function () {
                                user.Active = false;
                                $scope.disableSwitch = false;
                            });
                            loginService.isCheckResponse(err);
                            var errMsg = "Error occurred while deleting contact";
                            if (err.statusText) {
                                errMsg = err.statusText;
                            }
                            $scope.showAlert('Error', 'error', errMsg);
                        });
                    }).on('pnotify.cancel', function () {
                        $scope.safeApply(function () {
                            user.Active = false;
                            $scope.disableSwitch = false;
                        });
                    });
                }

            }else{
                console.log("deactivate");
                if(!$scope.disableSwitch) {

                    $scope.safeApply(function () {
                        $scope.disableSwitch = true;
                    });
                    new PNotify({
                        title: 'Confirm Deletion',
                        text: 'Are You Sure You Want To Deactivate User ?',
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
                        userProfileApiAccess.deleteUser(user.username).then(function (data) {
                            if (data.IsSuccess) {
                                $scope.showAlert('Success', 'info', 'User Deleted');
                                $scope.safeApply(function () {
                                    $scope.disableSwitch = false;
                                });
                            }
                            else {
                                var errMsg = "";
                                $scope.safeApply(function () {
                                    user.Active = true;
                                    $scope.disableSwitch = false;
                                });

                                if (data.Exception) {
                                    errMsg = data.Exception.Message;
                                }

                                if (data.CustomMessage) {
                                    errMsg = data.CustomMessage;
                                }
                                $scope.showAlert('Error', 'error', errMsg);
                            }

                        }, function (err) {
                            $scope.safeApply(function () {
                                user.Active = true;
                                $scope.disableSwitch = false;
                            });
                            loginService.isCheckResponse(err);
                            var errMsg = "Error occurred while deleting contact";
                            if (err.statusText) {
                                errMsg = err.statusText;
                            }
                            $scope.showAlert('Error', 'error', errMsg);
                        });
                    }).on('pnotify.cancel', function () {
                        $scope.safeApply(function () {
                            user.Active = true;
                            $scope.disableSwitch = false;
                        });
                    });
                }
            }

        };


        $scope.addNewUserGroup = function () {
            userProfileApiAccess.addUserGroup($scope.newUserGroup).then(function (response) {

                if (response.IsSuccess) {
                    $scope.showAlert("New User group", "success", "New User Group Added Successfully");
                    resetForm();
                    loadUserGroups();
                }
                else {
                    $scope.showAlert("New User group", "error", "New User Group Adding Failed");
                }

            }, function (err) {
                loginService.isCheckResponse(err);
                $scope.showAlert("New User group", "error", "Error In New User Group Adding");
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

            if(!$scope.isEditing)
            {
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
            }

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
                                $scope.showAlert("User Removing From Group", "success", "User Removed From Group Successfully");
                            }
                        });
                    }
                    else {
                        $scope.showAlert("User Removing From Group", "error", "Error In Removing User From Group");
                    }
                }, function (error) {
                    $scope.showAlert("User Removing From Group", "error", "User Removing From Group Failed");
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
        $scope.showUnits=false;
        $scope.showIt = function () {
            $scope.showUnits=!$scope.showUnits
        }


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
                $scope.showAlert("Loading Agent details", "error", "Error In Loading Agent Details");
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
                            $scope.showAlert("Member Added To Group", "success", "Member Added To Group Successfully");
                            removeAllocatedAgents();
                        }
                    })
                }
                else {
                    $scope.showAlert("Member Added To Group", "error", "Error In Member Adding To Group");
                }
            }, function (error) {
                $scope.showAlert("Member Added To Group", "error", "Member Added To Group Failed");
            })
        };

        $scope.showPasswordHints = function () {

            $scope.pwdBox = !$scope.pwdBox;
        };


        //-------------------------Active Directory-------------------------------------

        $scope.activeDirectoryUsers = [];
        $scope.selectedADUsers = {agents: [], supervisors: []};

        $scope.adSearchCriteria = "";

        $scope.getUsersFromActiveDirectory = function () {
            $scope.activeDirectoryUsers = [];
            $scope.selectedADUsers = {agents: [], supervisors: []};

            function pushAdUser(ad_user, isProfileExists, userRole) {

                switch (userRole) {
                    case 'supervisor':
                        $scope.selectedADUsers.supervisors.push(ad_user);
                        break;
                    case 'agent':
                        $scope.selectedADUsers.agents.push(ad_user);
                        break;
                    default :
                        break;
                }


                ad_user.isProfileExists = isProfileExists;

                $scope.activeDirectoryUsers.push(ad_user);
            }

            companyConfigBackendService.getUsersFromActiveDirectory().then(function (response) {
                if (response.IsSuccess) {

                    response.Result.forEach(function (ad_user) {
                        var isExist = false;
                        for (var i = 0; i < $scope.userList.length; i++) {
                            var system_user = $scope.userList[i];
                            if (system_user.username && ad_user.userPrincipalName && system_user.username === ad_user.userPrincipalName) {
                                isExist = true;
                                pushAdUser(angular.copy(ad_user), true, system_user.user_meta.role);
                                break;
                            }
                        }

                        if (!isExist)
                            pushAdUser(angular.copy(ad_user), false, undefined);
                    });


                }
                else {
                    var errMsg = response.CustomMessage;

                    if (response.Exception) {
                        errMsg = response.Exception.Message;
                    }
                    //$scope.showAlert('Active Directory', errMsg, 'error');
                    console.log('active directory error' + errMsg);
                }
            }, function (err) {
                var errMsg = "Error Occurred While Retrieving Active Directory Users";
                if (err.statusText) {
                    errMsg = err.statusText;
                }
                //$scope.showAlert('Active Directory', errMsg, 'error');
                console.log('active directory error' + errMsg);
            });

        };

        $scope.createUserFromAD = function (adUser) {

            var userRole = ($scope.selectedADUsers.agents.indexOf(adUser) > -1) ? "agent" : undefined;
            if (!userRole) {
                userRole = ($scope.selectedADUsers.supervisors.indexOf(adUser) > -1) ? "supervisor" : undefined;
            }

            if (userRole) {
                if (adUser.sAMAccountName && adUser.mail && adUser.userPrincipalName) {
                    var newUser = {
                        firstname: adUser.givenName,
                        lastname: adUser.sn,
                        mail: adUser.mail,
                        name: adUser.sAMAccountName,
                        username: adUser.userPrincipalName,
                        role: userRole
                    };
                    userProfileApiAccess.addUserFromAD(newUser).then(function (data) {
                        if (data.IsSuccess) {
                            $scope.showAlert('Success', 'info', 'User added');
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
                } else {
                    $scope.showAlert('Error', 'error', "Insufficient Data To Create User");
                }
            } else {
                $scope.showAlert('Error', 'error', "Select User Role");
            }

        };

        $scope.userActiveCheck = false;

        $scope.checkEditing = function () {
            $scope.isEditing=!$scope.isEditing;
        }

        $scope.loadBusinessUnits = function () {
            userProfileApiAccess.getBusinessUnits().then(function (resUnits) {
                if(resUnits.IsSuccess)
                {
                    $scope.businessUnits=resUnits.Result;
                }
                else {
                    $scope.showAlert("Business Unit","error","No Business Units found");
                }
            },function (errUnits) {
                $scope.showAlert("Business Unit","error","Error in searching Business Units");
            });
        }
        $scope.loadBusinessUnits();


    };

    app.controller("userListCtrl", userListCtrl);
}());
