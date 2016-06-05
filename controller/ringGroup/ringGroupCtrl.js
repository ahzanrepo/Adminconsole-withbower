/**
 * Created by dinusha on 6/5/2016.
 */

(function ()
{
    var app = angular.module("veeryConsoleApp");

    var ringGroupCtrl = function ($scope, $filter, sipUserApiHandler)
    {
        $scope.showAlert = function (title, type, content) {

            new PNotify({
                title: title,
                text: content,
                type: type,
                styling: 'bootstrap3'
            });
        };

        $scope.currentGroupUsers = [];
        $scope.searchText = null;
        $scope.selectedItem = null;
        $scope.IsEdit = false;
        $scope.dataLoaded = false;
        var emptyArr = [];

        var clearFormOnSave = function()
        {
            $scope.basicConfig = {};
            $scope.currentGroupUsers = [];
        };

        $scope.querySearch = function(query)
        {
            if(query === "*" || query === "")
            {
                if($scope.sipUsrList)
                {
                    return $scope.sipUsrList;
                }
                else
                {
                    return emptyArr;
                }

            }
            else
            {
                if($scope.sipUsrList)
                {
                    var filteredArr = $scope.sipUsrList.filter(function (item)
                    {
                        var regEx = "^(" + query + ")";

                        if(item.SipUsername)
                        {
                            return item.SipUsername.match(regEx);
                        }
                        else
                        {
                            return false;
                        }

                    });

                    return filteredArr;
                }
                else
                {
                    return emptyArr;
                }
            }

        };

        $scope.reloadUserList = function()
        {
            sipUserApiHandler.getSIPUsers().then(function(data)
            {
                if(data.IsSuccess)
                {
                    $scope.sipUsrList = data.Result.map(function(item)
                    {
                        var tempUsr =
                        {
                            SipUsername: item.SipUsername,
                            id: item.id
                        };

                        return tempUsr;
                    });
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

        $scope.reloadGroupList = function()
        {
            sipUserApiHandler.getGroups().then(function(data)
            {
                if(data.IsSuccess)
                {
                    $scope.groupList = data.Result;
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
                var errMsg = "Error occurred while getting group list";
                if(err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Error', 'error', errMsg);
                $scope.dataReady = true;
            });
        };

        $scope.onChipAdd = function(chip)
        {
            $scope.dataLoaded = false;
            sipUserApiHandler.addUserToGroup(chip.id, $scope.basicConfig.id).then(function(data)
            {
                if(data.IsSuccess)
                {
                    reloadUsersInGroup($scope.basicConfig.id);
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
                var errMsg = "Error occurred while getting users for group";
                if(err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Error', 'error', errMsg);
            });
            return chip;
        };

        $scope.onChipDelete = function(chip)
        {
            var ss = chip;
            return null;
        };

        $scope.onNewPressed = function()
        {
            $scope.IsEdit = false;
            $scope.dataLoaded = false;
            clearFormOnSave();
        };

        $scope.onSavePressed = function()
        {
            if($scope.IsEdit)
            {
                //update

                sipUserApiHandler.updateGroup($scope.basicConfig).then(function(data)
                {
                    if(data.IsSuccess)
                    {
                        $scope.showAlert('SUCCESS', 'info', 'Group updated successfully');
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
                    var errMsg = "Error occurred while updating group";
                    if(err.statusText)
                    {
                        errMsg = err.statusText;
                    }

                    $scope.showAlert('Error', 'error', errMsg);
                });
            }
            else
            {
                //save
                sipUserApiHandler.saveGroup($scope.basicConfig).then(function(data)
                {
                    if(data.IsSuccess)
                    {
                        $scope.showAlert('Success', 'info', 'Group saved successfully');
                        clearFormOnSave();
                        $scope.reloadGroupList();
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
                    var errMsg = "Error occurred while saving group";
                    if(err.statusText)
                    {
                        errMsg = err.statusText;
                    }

                    $scope.showAlert('Error', 'error', errMsg);
                });

            }
        }

        var reloadUsersInGroup = function(grpId)
        {
            $scope.dataLoaded = false;
            sipUserApiHandler.getUsersForGroup(grpId).then(function(data)
            {
                $scope.dataLoaded = true;
                if(data.IsSuccess)
                {
                    if(data.Result && data.Result.SipUACEndpoint)
                    {
                        $scope.currentGroupUsers = data.Result.SipUACEndpoint.map(function(item)
                        {
                            var tempUsr =
                            {
                                SipUsername: item.SipUsername,
                                id: item.id
                            };

                            return tempUsr;
                        });

                    }

                }
                else
                {
                    $scope.dataLoaded = true;
                    var errMsg = data.CustomMessage;

                    if(data.Exception)
                    {
                        errMsg = data.Exception.Message;
                    }
                    $scope.showAlert('Error', 'error', errMsg);
                }

            }, function(err)
            {
                $scope.dataLoaded = true;
                var errMsg = "Error occurred while getting users for group";
                if(err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Error', 'error', errMsg);
            });
        }

        $scope.onGroupChange = function(grpId)
        {
            reloadUsersInGroup(grpId);


            sipUserApiHandler.getGroup(grpId).then(function(data)
            {
                if(data.IsSuccess)
                {
                    $scope.IsEdit = true;
                    $scope.basicConfig = data.Result;
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
                var errMsg = "Error occurred while getting group list";
                if(err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Error', 'error', errMsg);
            });
        };

        sipUserApiHandler.getDomains().then(function(data)
        {
            if(data.IsSuccess)
            {
                $scope.endUserList = data.Result;
            }
            else
            {
                var errMsg = data.CustomMessage;

                if(data.Exception)
                {
                    errMsg = 'Get enduser Error : ' + data.Exception.Message;
                }
                $scope.showAlert('Error', 'error', errMsg);
            }

        }, function(err)
        {
            var errMsg = "Error occurred while getting end user list";
            if(err.statusText)
            {
                errMsg = err.statusText;
            }
            $scope.showAlert('Error', 'error', errMsg);


        });

        $scope.reloadUserList();
        $scope.reloadGroupList();

    }

    app.controller("ringGroupCtrl", ringGroupCtrl);
}())
