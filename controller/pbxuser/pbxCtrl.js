/**
 * Created by dinusha on 6/8/2016.
 */


(function() {
    var app = angular.module("veeryConsoleApp");

    var pbxCtrl = function ($scope, pbxUserApiHandler)
    {
        $scope.showAlert = function (title, type, content) {

            new PNotify({
                title: title,
                text: content,
                type: type,
                styling: 'bootstrap3'
            });
        };

        $scope.searchCriteria = "";

        $scope.IsEdit = false;

        $scope.pabxUserSelected = {};

        function PickUserController($scope, $mdDialog, pbxUserApiHandler)
        {
            pbxUserApiHandler.getSIPUsers().then(function(data)
            {
                $scope.sipUserList = data.Result;
            }, function(err)
            {

            });
            $scope.onContinue = function()
            {
                sharedResPABXUser.PABXUser = {};
                sharedResPABXUser.PABXUser.UserUuid = $scope.selectedUserUuid;
                sharedResPABXUser.PABXUser.IsEdit = false;
                $mdDialog.hide();
            };
            $scope.onCancel = function()
            {
                $mdDialog.cancel();
            };
        }


        $scope.updateStatus = function(pbxUsr)
        {
            if($scope.pabxUserSelected.Status === 'DND')
            {
                pbxUsr.UserStatus = 'DND';
                pbxUsr.AdvancedRouteMethod = 'NONE';
            }
            else if($scope.pabxUserSelected.Status === 'CALL_DIVERT')
            {
                pbxUsr.UserStatus = 'CALL_DIVERT';
                pbxUsr.AdvancedRouteMethod = 'NONE';
            }
            else if($scope.pabxUserSelected.Status === 'AVAILABLE')
            {
                pbxUsr.UserStatus = 'AVAILABLE';
                pbxUsr.AdvancedRouteMethod = 'NONE';
            }
            else if($scope.pabxUserSelected.Status === 'FOLLOW_ME')
            {
                pbxUsr.UserStatus = 'AVAILABLE';
                pbxUsr.AdvancedRouteMethod = 'FOLLOW_ME';
            }
            else if($scope.pabxUserSelected.Status === 'FORWARD')
            {
                pbxUsr.UserStatus = 'AVAILABLE';
                pbxUsr.AdvancedRouteMethod = 'FORWARD';
            }
            else
            {
                pbxUsr.UserStatus = 'AVAILABLE';
                pbxUsr.AdvancedRouteMethod = 'NONE';
            }

            pbxUserApiHandler.updatePABXUser(pbxUsr).then(function(data1)
            {
                if(data1.IsSuccess)
                {
                    $scope.CurrentSelectedUser = {}
                    pbxUsr.StatusEditMode = false;
                }
                else
                {
                    var errMsg = data1.CustomMessage;

                    if(data1.Exception)
                    {
                        errMsg = data1.Exception.Message;
                    }
                    $scope.showAlert('Error', 'error', errMsg);
                }

            }, function(err)
            {
                $scope.showAlert('Error', 'error', 'Communication Error Occurred');
            });

        }

        $scope.openStatusEdit = function(pbxUsr)
        {
            if(pbxUsr.UserStatus === 'DND')
            {
                $scope.pabxUserSelected.Status = 'DND';
            }
            else if(pbxUsr.UserStatus === 'CALL_DIVERT')
            {
                $scope.pabxUserSelected.Status = 'CALL_DIVERT';
            }
            else if(pbxUsr.UserStatus === 'AVAILABLE' && pbxUsr.AdvancedRouteMethod == 'NONE')
            {
                $scope.pabxUserSelected.Status = 'AVAILABLE';
            }
            else if(pbxUsr.UserStatus === 'AVAILABLE' && pbxUsr.AdvancedRouteMethod == 'FOLLOW_ME')
            {
                $scope.pabxUserSelected.Status = 'FOLLOW_ME';
            }
            else if(pbxUsr.UserStatus === 'AVAILABLE' && pbxUsr.AdvancedRouteMethod == 'FORWARD')
            {
                $scope.pabxUserSelected.Status = 'FORWARD';
            }
            else
            {
                $scope.pabxUserSelected.Status = 'AVAILABLE';
            }



            if(!$scope.CurrentSelectedUser)
            {
                $scope.CurrentSelectedUser = pbxUsr;
            }

            if($scope.CurrentSelectedUser.UserName != pbxUsr.UserName)
            {
                $scope.CurrentSelectedUser.StatusEditMode = false;
            }


            if(pbxUsr.StatusEditMode === undefined)
            {
                pbxUsr.StatusEditMode = false;
            }

            pbxUsr.StatusEditMode = !pbxUsr.StatusEditMode;

            $scope.CurrentSelectedUser = pbxUsr;
        };

        $scope.onNewPressed = function(ev)
        {

            $mdDialog.show({
                controller: PickUserController,
                templateUrl: 'partials/newUserSelectionView.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            })
                .then(function(answer)
                {
                    $location.url("/pabxUser/" + sharedResPABXUser.PABXUser.UserUuid);
                }, function()
                {

                });
        };

        $scope.deleteUser = function(userUuid)
        {
            pbxUserApiHandler.deletePABXUser(userUuid)
                .then(function(data)
                {
                    if(data.IsSuccess)
                    {
                        $scope.reloadUserList();
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

                },
                function(err)
                {
                    $scope.showAlert('Error', 'error', 'Communication error occurred while deleting');

                })

        };

        $scope.editPABXUser = function(usrUuid)
        {
            $scope.IsEdit = true;
            $scope.reloadDivertNumbers(usrUuid);
        };

        $scope.reloadUserList = function()
        {
            $scope.searchCriteria = "";
            var onGetPABXUserListSuccess = function(data)
            {
                if(data.IsSuccess)
                {
                    $scope.pabxUsrList = data.Result;
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

            };

            var onGetPABXUserListError = function(err)
            {
                var errMsg = "Error occurred while getting pabx user list";
                if(err.statusText)
                {
                    errMsg = err.statusText;
                }

                $scope.showAlert('Error', 'error', errMsg);
                $scope.dataReady = true;
            };


            pbxUserApiHandler.getPABXUsers().then(onGetPABXUserListSuccess, onGetPABXUserListError);
        };

        $scope.reloadUserList();









        $scope.onSavePressed = function()
        {
            if($scope.basicConfig.IsEdit)
            {
                pbxUserApiHandler.updatePABXUser($scope.basicConfig).then(function(data1)
                {
                    if(data1.IsSuccess)
                    {
                        pbxUserApiHandler.setAllowedNumbers($scope.basicConfig.UserUuid, $scope.allowedNumbers).then(function(data2)
                        {
                            if(data2.IsSuccess)
                            {
                                pbxUserApiHandler.setDeniedNumbers($scope.basicConfig.UserUuid, $scope.deniedNumbers).then(function(data3)
                                {
                                    if(data3.IsSuccess)
                                    {
                                        mdAleartDialog("SUCCESS", "Basic Configuration Updated Successfully", "SUCCESS");
                                    }
                                    else
                                    {
                                        var errMsg = data3.CustomMessage;

                                        if(data3.Exception)
                                        {
                                            errMsg = data3.Exception.Message;
                                        }
                                        mdAleartDialog("WARINING", "Basic Configuration Partially Updated - ERROR : " + errMsg, "WARINING");
                                    }

                                }, function(err)
                                {
                                    mdAleartDialog("WARINING", "Basic Configuration Partially Updated - Communication Error on Saving Denied Numbers : ", "WARINING");
                                });
                            }
                            else
                            {
                                var errMsg = data2.CustomMessage;

                                if(data2.Exception)
                                {
                                    errMsg = data2.Exception.Message;
                                }
                                mdAleartDialog("WARINING", "Basic Configuration Partially Updated - ERROR : " + errMsg, "WARINING");
                            }

                        }, function(err)
                        {
                            mdAleartDialog("WARINING", "Basic Configuration Partially Updated - Communication Error on Saving Allowed Numbers : ", "WARINING");
                        });

                    }
                    else
                    {
                        var errMsg = data1.CustomMessage;

                        if(data1.Exception)
                        {
                            errMsg = data1.Exception.Message;
                        }
                        mdAleartDialog("ERROR", errMsg, "ERROR");
                    }

                }, function(err)
                {
                    mdAleartDialog("ERROR", "Communication Error Occurred", "ERROR");
                });
            }
            else
            {
                //Save
                pbxUserApiHandler.savePABXUser($scope.basicConfig).then(function(data1)
                {
                    if(data1.IsSuccess)
                    {
                        pbxUserApiHandler.setAllowedNumbers($scope.basicConfig.UserUuid, $scope.allowedNumbers).then(function(data2)
                        {
                            if(data2.IsSuccess)
                            {
                                pbxUserApiHandler.setDeniedNumbers($scope.basicConfig.UserUuid, $scope.deniedNumbers).then(function(data3)
                                {
                                    if(data3.IsSuccess)
                                    {
                                        mdAleartDialog("SUCCESS", "Basic Configuration Saved Successfully", "SUCCESS");
                                    }
                                    else
                                    {
                                        var errMsg = data3.CustomMessage;

                                        if(data3.Exception)
                                        {
                                            errMsg = data3.Exception.Message;
                                        }
                                        mdAleartDialog("WARINING", "Basic Configuration Partially Saved - ERROR : " + errMsg, "WARINING");
                                    }

                                }, function(err)
                                {
                                    mdAleartDialog("WARINING", "Basic Configuration Partially Saved - Communication Error on Saving Denied Numbers : ", "WARINING");
                                });
                            }
                            else
                            {
                                var errMsg = data2.CustomMessage;

                                if(data2.Exception)
                                {
                                    errMsg = data2.Exception.Message;
                                }
                                mdAleartDialog("WARINING", "Basic Configuration Partially Saved - ERROR : " + errMsg, "WARINING");
                            }

                        }, function(err)
                        {
                            mdAleartDialog("WARINING", "Basic Configuration Partially Saved - Communication Error on Saving Allowed Numbers : ", "WARINING");
                        });

                    }
                    else
                    {
                        var errMsg = data1.CustomMessage;

                        if(data1.Exception)
                        {
                            errMsg = data1.Exception.Message;
                        }
                        mdAleartDialog("ERROR", errMsg, "ERROR");
                    }

                }, function(err)
                {
                    mdAleartDialog("ERROR", "Communication Error Occurred", "ERROR");
                });
            }

        };

        $scope.reloadDivertNumbers = function(userUuid)
        {
            pbxUserApiHandler.getPABXUserTemplates(userUuid).then(function(data)
            {
                $scope.pabxTemplList = data.Result;

            },function(err)
            {
                var errMsg = "Error reloading divert numbers";
                if(err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Error', 'error', errMsg);
            });

        };

        var onGetGreetingFileSuccess = function(data)
        {
            if(data.IsSuccess)
            {
                $scope.fileList = data.Result;
            }

        };

        var onGetGreetingFileError = function(err)
        {
            console.log('Error occurred : ' + err);
        };

        var onGetPABXUserSuccess = function(data)
        {
            if(data.Result)
            {
                if($scope.basicConfig.IsEdit)
                {
                    $scope.allowedNumbers = data.Result.AllowedNumbers;
                    $scope.deniedNumbers = data.Result.DeniedNumbers;
                }
                else
                {
                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('User already added')
                            .textContent('please use the edit button to edit')
                            .ariaLabel('Not a new user')
                            .ok('Ok')
                    );

                    $location.url("/pabxUsers");
                }

            }

        };

        var onGetPABXUserError = function(err)
        {
            console.log('Error occurred : ' + err);
        };


        //pbxUserApiHandler.getPABXUser(sharedResPABXUser.PABXUser.UserUuid).then(onGetPABXUserSuccess, onGetPABXUserError);
        //pbxUserApiHandler.getGreetingFileMetadata(sharedResPABXUser.PABXUser.UserUuid).then(onGetGreetingFileSuccess, onGetGreetingFileError);
        /*pbxUserApiHandler.getSchedules().then(function(data)
        {
            if(data.IsSuccess)
            {
                $scope.scheduleList = data.Result;
            }

        }, function(err)
        {

        });*/

    };

    app.controller("pbxCtrl", pbxCtrl);
}());
