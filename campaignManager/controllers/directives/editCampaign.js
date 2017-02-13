/**
 * Created by Rajinda on 5/30/2016.
 */
mainApp.directive("editcampaign", function ($filter, $uibModal, campaignService,scheduleBackendService) {

    return {
        restrict: "EAA",
        scope: {
            campaigns: "=",
            campaign: "=",
            extensions: "=",
            reasons: "=",
            'reloadCampaign': '&'
        },

        templateUrl: 'campaignManager/template/campaign.html',

        link: function (scope, element, attributes) {

            scope.campaign.Extensions = {"Extension": scope.campaign.Extensions};

            scope.showAlert = function (tittle, type, content) {
                new PNotify({
                    title: tittle,
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
                    CancelCallBack();
                });

            };

            scope.safeApply = function (fn) {
                var phase = this.$root.$$phase;
                if (phase == '$apply' || phase == '$digest') {
                    if (fn && (typeof(fn) === 'function')) {
                        fn();
                    }
                } else {
                    this.$apply(fn);
                }
            };

            scope.dtOptions = {paging: false, searching: false, info: false, order: [0, 'desc']};
            scope.mechanisms = campaignService.mechanisms;
            scope.modes = campaignService.modes;
            scope.channels = campaignService.channels;
            scope.editMode = 'view';
            scope.updateConfig = false;
            scope.updateEdit = false;
            scope.deleteConfig = false;
            scope.editMapSchedule = false;
            scope.editCampaign = function () {
                scope.editMode = scope.editMode === 'edit' ? 'view' : 'edit';
            };

            scope.configCampaign = function () {
                scope.editMode = scope.editMode === 'config' ? 'view' : 'config';
            };

            scope.scheduleCampaign = function () {
                scope.editMode = scope.editMode === 'schedule' ? 'view' : 'schedule';
                if(scope.editMode ==='schedule'&& scope.ScheduleList.length===0){
                    scope.GetSchedules();
                }
            };


            scope.showCallback = false;
            scope.callback = {AllowCallBack: 'false'};

            scope.setCallback = function (value) {
                scope.showCallback = value === 'true';
            };

            scope.SaveCallBack = function (id, callback) {
                scope.updateConfig = true;

                if (angular.isArray(callback)) {

                    var i = 0;
                    var failToSave = [];

                    function showmsg() {
                        if (i === callback.length) {

                            if (failToSave.length === 0) {
                                scope.showAlert("Campaign", 'success', "Configurations  Updated successfully ");
                            }
                            else {
                                scope.showAlert("Campaign", 'warning', "Configurations  saved successfully but fail to save same callback configurations.");
                            }
                            scope.updateConfig = false;
                        }
                    }

                    angular.forEach(callback, function (item) {
                        callback.ReasonId = item.CampCallBackReasons.ReasonId;
                        campaignService.SetCallBack(id, item).then(function (response) {
                            if (!response) {
                                item.Status = false;
                                failToSave.push(item);
                            }
                            else {
                                var items = $filter('filter')(scope.callbacks, {ReasonId: parseInt(item.ReasonId)}, true);
                                if (items) {
                                    var index = scope.callbacks.indexOf(items[0]);
                                    if (index > -1) {
                                        scope.callbacks.splice(index, 1);
                                    }
                                }
                                item.Status = true;
                                item.CallBackConfId = response.CallBackConfId;
                                scope.callbacks.push(item);
                            }
                            i++;
                            showmsg();
                        }, function (error) {
                            item.Status = false;
                            failToSave.push(item);
                            i++;
                            showmsg();
                        });


                    });


                }
                else {
                    callback.ReasonId = callback.CampCallBackReasons.ReasonId;
                    campaignService.SetCallBack(id, callback).then(function (response) {
                        if (!response) {
                            scope.showAlert("Campaign", 'error', "Fail To Set Callback");
                        }
                        else {
                            callback.Status = true;
                            callback.CallBackConfId = response.CallBackConfId;
                            scope.callbacks.push(callback);
                        }
                        scope.updateConfig = false;
                    }, function (error) {
                        scope.showAlert("Campaign", 'error', "Fail To Set Callback");
                        scope.updateConfig = false;
                    });
                }
            };

            scope.callbacks = [];
            scope.AddCallBack = function (callback) {

                if (callback.CampCallBackReasons.ReasonId) {
                    if (callback.ConfigureId && callback.ConfigureId > 0) {
                        scope.SaveCallBack(callback.ConfigureId, callback);
                    }
                    else {
                        var item = $filter('filter')(scope.callbacks, {ReasonId: parseInt(callback.CampCallBackReasons.ReasonId)}, true)[0];
                        if (!item) {
                            var data = {};
                            angular.copy(callback, data);
                            data.ReasonId = callback.CampCallBackReasons.ReasonId;
                            data.Status = true;
                            scope.callbacks.push(data);
                        }

                    }
                }


            };

            scope.deleteReason = function (callback) {
                scope.updateConfig = true;
                scope.showConfirm("Delete Campaign", "Delete", "ok", "cancel", "Do you want to delete " + callback.CampCallBackReasons.Reason, function (obj) {

                    function showMsg() {
                        var items = $filter('filter')(scope.callbacks, {ReasonId: parseInt(callback.ReasonId)}, true);
                        if (items) {
                            var index = scope.callbacks.indexOf(items[0]);
                            if (index > -1) {
                                scope.callbacks.splice(index, 1);
                            }
                        }
                        scope.updateConfig = false;
                    }

                    if (callback.CallBackConfId && callback.CallBackConfId > 0) {
                        campaignService.DeleteCallBack(callback.CallBackConfId).then(function (response) {
                            if (response) {
                                showMsg();
                                scope.showAlert("Campaign", 'success', "Configurations  Deleted successfully ");
                            } else {
                                scope.showAlert("Campaign", 'error', "Fail To Deleted Configurations");
                                scope.updateConfig = false;
                            }
                        }, function (error) {
                            scope.showAlert("Campaign", 'error', "Fail To Deleted Configurations");
                            scope.updateConfig = false;
                        });
                    }
                    else {
                        showMsg();
                    }

                }, function () {
                    scope.safeApply(function () {
                        scope.updateConfig = false;
                    });


                }, callback)

            };

            scope.updateCampaign = function (campaignx) {
                scope.updateEdit = true;
                campaignService.UpdateCampaign(campaignx.CampaignId, campaignx).then(function (response) {
                    if (response) {
                        scope.showAlert("Campaign", 'success', "Campaign Updated successfully ");
                    } else {
                        scope.showAlert("Campaign", 'error', "Fail To Update Campaign");
                    }
                    scope.updateEdit = false;
                }, function (error) {
                    scope.showAlert("Campaign", 'error', "Fail To Update Campaign");
                    scope.updateEdit = false;
                });
            };

            scope.deleteCampaign = function (campaign) {
                scope.deleteConfig = true;
                scope.showConfirm("Delete Campaign", "Delete", "ok", "cancel", "Do you want to delete " + campaign.CampaignName, function (obj) {

                    campaignService.DeleteCampaign(campaign.CampaignId).then(function (response) {
                        if (response) {
                            scope.reloadCampaign();
                            scope.showAlert("Campaign", 'success', "Delete Successfully ");

                        } else {
                            scope.showAlert("Campaign", 'error', "Fail To Delete Campaign");
                        }
                        scope.deleteConfig = false;
                    }, function (error) {
                        scope.showAlert("Campaign", 'error', "Fail To Delete Campaign");
                        scope.deleteConfig = false;
                    });

                }, function () {
                    scope.safeApply(function () {
                        scope.deleteConfig = false;
                    });
                }, campaign)
            };

            scope.GetCampaignConfig = function () {
                campaignService.GetCampaignConfig(scope.campaign.CampaignId).then(function (response) {
                    if (response) {

                        scope.callback = response;
                        scope.callback.AllowCallBack = response.AllowCallBack === false ? 'false' : 'true';
                        scope.showCallback = response.AllowCallBack;
                        scope.GetCallBacks();
                    }
                    else {
                        scope.callback = {AllowCallBack: 'false'};
                    }
                }, function (error) {

                });
            };

            scope.GetCampaignConfig();

            scope.GetCallBacks = function () {
                campaignService.GetCallBacks(scope.callback.ConfigureId).then(function (response) {
                    scope.callbacks = response;
                    /*scope.callbacks = response.map(function (t) {
                     t.CampCallBackReasons = t.CampCallBackReasons
                     return t
                     });*/
                    /*if(response){
                     scope.callbacks = response.map(function (t) {
                     t.CampCallBackReasons = t.CampCallBackReasons
                     return t
                     });
                     }else{
                     scope.callbacks = response;
                     }*/
                }, function (error) {
                    console.log(error);
                });
            };

            scope.updateCampaignConfig = function (callback) {
                scope.updateConfig = true;
                if (callback.ConfigureId > 0) {
                    /*update config id, configId, config*/
                    campaignService.UpdateCampaignConfig(scope.campaign.CampaignId, callback.ConfigureId, callback).then(function (response) {
                        if (response) {
                            scope.showAlert("Campaign", 'success', "Configurations  Updated successfully ");
                        } else {
                            scope.showAlert("Campaign", 'error', "Fail To Update Configurations");
                        }
                        scope.updateConfig = false;
                    }, function (error) {
                        scope.showAlert("Campaign", 'error', "Fail To Update Configurations");
                        scope.updateConfig = false;
                    });
                }
                else {
                    /*save config*/
                    campaignService.CreateCampaignConfig(scope.campaign.CampaignId, callback).then(function (response) {
                        if (response) {
                            scope.callback.ConfigureId = response.ConfigureId;
                            scope.SaveCallBack(response.ConfigureId, scope.callbacks);
                            // scope.showAlert("Campaign", 'success', "Configurations  Updated successfully ");
                        } else {
                            scope.showAlert("Campaign", 'error', "Fail To Update Configurations");
                        }
                        scope.updateConfig = false;
                    }, function (error) {
                        scope.showAlert("Campaign", 'error', "Fail To Update Configurations");
                        scope.updateConfig = false;
                    });
                }
            };

            scope.ScheduleList = [];
            scope.GetSchedules = function () {
                scope.editMapSchedule = true;
                scheduleBackendService.getSchedules().then(function (response) {
                    if (response.data.IsSuccess) {
                        scope.ScheduleList = response.data.Result;
                    }
                    else {
                        console.info("Error in GetSchedules " + response.data.Exception);
                        scope.showAlert("Campaign", 'error', "Fail To Get Schedules");
                    }
                    scope.editMapSchedule = false;
                }, function (error) {
                    scope.showAlert("Campaign", 'error', "Fail To Get Schedules");
                    scope.editMapSchedule = false;
                });
            };
        }
    }
});