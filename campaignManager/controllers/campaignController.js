mainApp.controller("campaignController", function ($scope, $compile, $uibModal, $filter, $location, $log, $anchorScroll, campaignService, ardsBackendService) {

    $anchorScroll();
    $scope.mechanisms = campaignService.mechanisms;
    $scope.modes = campaignService.modes;
    $scope.channels = campaignService.channels;
    $scope.campaign = {};
    $scope.isLoading = true;
    $scope.isProgress = false;
    $scope.progressMsg = "Progress";


    $scope.showPaging = false;
    $scope.currentPage = "1";
    $scope.pageTotal = "1";
    $scope.pageSize = "50";


    $scope.showAlert = function (tittle, type, content) {
        new PNotify({
            title: tittle,
            text: content,
            type: type,
            styling: 'bootstrap3'
        });
    };

    $scope.showConfirm = function (tittle, label, okbutton, cancelbutton, content, OkCallback, CancelCallBack, okObj) {

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

    var loadExtentions = function () {
        campaignService.GetExtensions().then(function (response) {
            if (response) {
                $scope.extensions = response.map(function (item) {
                    return item.Extension
                })
            }

        }, function (error) {
            $scope.showAlert("Campaign", "error", "Fail To Load Extension List.");
        });
    };
    loadExtentions();

    $scope.onChannelChange = function (option) {
        //document.getElementById("CampaignMode").disabled = $scope.campaign.CampaignChannel !='CALL';
    };

    $scope.createCampaign = function (campaignx) {
        $scope.isProgress = true;
        campaignService.CreateCampaign(campaignx).then(function (response) {
            if (response) {
                $scope.showAlert("Campaign", 'success', "Campaign Created Successfully.");
                $scope.addNewCampaign = false;
                $scope.campaigns.push(response);

            } else {
                $scope.showAlert("Campaign", 'error', "Fail To Create Campaign.");
            }
            $scope.isProgress = false;
        }, function (error) {
            $scope.showAlert("Campaign", 'error', "Fail To Create Campaign.");
            $scope.isProgress = false;
        });
    };

    $scope.addNewCampaign = false;
    $scope.addCampaign = function () {
        $scope.addNewCampaign = !$scope.addNewCampaign;
    };


    $scope.campaigns = [];
    $scope.loadCampaign = function () {
        $scope.isLoading = true;
        campaignService.GetCampaigns().then(function (response) {
            if (response) {
                $scope.campaigns = response;

            } else {
                $scope.showAlert("Campaign", "error", "There is an error, Error on loading campaigns");
            }
            $scope.isLoading = false;
        }, function (error) {
            $scope.showAlert("Campaign", "error", "There is an error, Error on loading campaigns");
        });
    };


    $scope.reasons = [];
    $scope.GetReasons = function () {
        campaignService.GetReasons().then(function (response) {
            if (response) {
                $scope.reasons = response;
            } else {
                $scope.showAlert("Campaign", "error", "There is an error, Error on loading Callback Reasons");
            }
        }, function (error) {
            $scope.showAlert("Campaign", "error", "There is an error, Error on loading campaigns");
        });
    };
    $scope.GetReasons();


    //-----------------------------Load ARDS Request Meta Data----------------------------------//
    $scope.ardsAttributes = [];
    $scope.GetArdsAttributes = function () {
        ardsBackendService.getRequestMetaByType('DIALER', 'CALL').then(function (response) {
            $scope.loadCampaign();

            if (response.data.IsSuccess) {
                var result = JSON.parse(response.data.Result);
                if (result && result.AttributeMeta && result.AttributeMeta.length > 0) {
                    $scope.ardsAttributes = result.AttributeMeta[0].AttributeDetails;
                }
            } else {
                $scope.showAlert("Campaign", "error", "Error on loading ARDS Data");
            }
        }, function (error) {
            $scope.loadCampaign();
            $scope.showAlert("Campaign", "error", "Error on loading ARDS Data");
        });
    };

    $scope.GetArdsAttributes();

    //code update by @damith
    var campaignUiAction = function () {
        return {
            activeRow: function (_campign) {
                $('.camp-tbl-row').removeClass('active');
                $('#' + _campign.CampaignId).addClass('active');
            },
            deleteDefault: function () {
                $scope.deletSuccessfully = false;
            },
            campaignDefaultStatus: function () {
                $scope.isSetCommand = false;
            },
            rightPanelShow: function () {
                $('#campaignDetailsView').animate({
                    width: '400px'
                }, 500, function () {

                });
            },
            rightPanelHide: function () {
                $('#campaignDetailsView').animate({
                    width: '0'
                }, 500, function () {

                });
            }
        }
    }();

    //view campaign details view
    $scope.viewCurrentCampaignDetails = function (_campign) {
        campaignUiAction.activeRow(_campign);
        campaignUiAction.deleteDefault();
        campaignUiAction.campaignDefaultStatus();

        campaignUiAction.rightPanelShow();

        $scope.campaignSelectedData = _campign;
        console.log(_campign);
    };

    $scope.closeRightPanel = function () {
        campaignUiAction.rightPanelHide();
    };


    //campaign status change
    //run,stop,pause,ongoing

    $scope.sendCommandToCampaign = function (cam, command) {
        $scope.isSetCommand = true;
        campaignService.SendCommandToCampaign(cam.CampaignId, command).then(function (response) {
            $scope.isSetCommand = false;
            if (response) {
                $scope.showAlert("Campaign", 'success', "Operation Execute Successfully.");
                $scope.loadCampaign();

                switch (command) {
                    case 'stop':
                        $scope.campaignSelectedData.OperationalStatus = 'stop';
                        break;
                    case  'resume':
                        $scope.campaignSelectedData.OperationalStatus = 'start';
                        break;
                    case  'end':
                        $scope.campaignSelectedData.OperationalStatus = 'done';
                        break;
                    case  'pause':
                        $scope.campaignSelectedData.OperationalStatus = 'pause';
                        break;
                }
            } else {
                $scope.showAlert("Campaign", 'error', "Fail To Execute Command.");
            }
        }, function (error) {
            $scope.isSetCommand = false;
            $scope.showAlert("Campaign", 'error', "Fail To Execute Command.");
        });
    };


    $scope.startCampaign = function (cam) {
        campaignService.StartCampaign(cam.CampaignId).then(function (response) {
            if (response) {
                $scope.showAlert("Campaign", 'success', "Operation Execute Successfully.");
                $scope.loadCampaign();
                $scope.campaignSelectedData.OperationalStatus = 'ongoing';
            } else {
                $scope.showAlert("Campaign", 'error', "Fail To Execute Command.");
            }
        }, function (error) {
            $scope.showAlert("Campaign", 'error', "Fail To Execute Command.");
        });
    };

    //delete campaign
    $scope.deleteCampaign = function (campaign) {
        $scope.deleteConfig = true;
        $scope.showConfirm("Delete Campaign", "Delete", "ok", "cancel", "Do you want to delete " + campaign.CampaignName, function (obj) {

            campaignService.DeleteCampaign(campaign.CampaignId).then(function (response) {
                if (response) {
                    $scope.loadCampaign();
                    $scope.showAlert("Campaign", 'success', "Deleted Successfully ");
                    $scope.deletSuccessfully = true;
                    campaignUiAction.rightPanelHide();

                } else {
                    $scope.showAlert("Campaign", 'error', "Fail To Delete Campaign");
                }
                $scope.deleteConfig = false;
            }, function (error) {
                $scope.showAlert("Campaign", 'error', "Fail To Delete Campaign");
                $scope.deleteConfig = false;
            });

        }, function () {
            $scope.safeApply(function () {
                $scope.deleteConfig = false;
            });
        }, campaign)
    };


});
