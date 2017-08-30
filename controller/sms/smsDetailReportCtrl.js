/**
 * Created by dinusha on 9/6/2016.
 */
(function () {
    var app = angular.module("veeryConsoleApp");

    var smsDetailReportCtrl = function ($scope, $filter, $q, $uibModal, $timeout, smsReportsService, cdrApiHandler, loginService) {

        $scope.showAlert = function (tittle, type, content) {

            new PNotify({
                title: tittle,
                text: content,
                type: type,
                styling: 'bootstrap3'
            });
        };

        $scope.dtOptions = {paging: false, searching: false, info: false, order: [5, 'asc']};

        $scope.moment = moment;

        $scope.pagination = {
            currentPage: 1,
            maxSize: 5,
            totalItems: 0,
            itemsPerPage: 10
        };

        $scope.recLimit = '10';

        $scope.direction = 'inbound';


        $scope.obj = {
            startDay: moment().format("YYYY-MM-DD"),
            endDay: moment().format("YYYY-MM-DD")
        };

        $scope.smsList = [];

        $scope.cancelDownload = true;
        $scope.buttonClass = 'fa fa-file-text';
        $scope.fileDownloadState = 'RESET';
        $scope.currentCSVFilename = '';
        $scope.DownloadButtonName = 'CSV';

        $scope.pageChanged = function () {
            $scope.getSMSSummary();
        };

        $scope.searchWithNewFilter = function () {
            $scope.pagination.currentPage = 1;
            $scope.FilterData = null;
            $scope.getSMSSummary();
        };

        var isEmpty = function (map) {
            for (var key in map) {
                if (map.hasOwnProperty(key)) {
                    return false;
                }
            }
            return true;
        };

        var checkFileReady = function (fileName) {
            if ($scope.cancelDownload) {
                $scope.fileDownloadState = 'RESET';
                $scope.DownloadButtonName = 'CSV';
                $scope.buttonClass = 'fa fa-file-text';
            }
            else {
                cdrApiHandler.getFileMetaData(fileName).then(function (fileStatus) {
                    if (fileStatus && fileStatus.Result) {
                        if (fileStatus.Result.Status === 'PROCESSING') {
                            $timeout(checkFileReady(fileName), 10000);
                        }
                        else {


                            var decodedToken = loginService.getTokenDecode();

                            if (decodedToken && decodedToken.company && decodedToken.tenant) {
                                $scope.currentCSVFilename = fileName;
                                $scope.DownloadCSVFileUrl = baseUrls.fileServiceInternalUrl + 'File/DownloadLatest/' + decodedToken.tenant + '/' + decodedToken.company + '/' + fileName;
                                $scope.fileDownloadState = 'READY';
                                $scope.DownloadButtonName = 'CSV';
                                $scope.cancelDownload = true;
                                $scope.buttonClass = 'fa fa-file-text';
                            }
                            else {
                                $scope.fileDownloadState = 'RESET';
                                $scope.DownloadButtonName = 'CSV';
                                $scope.cancelDownload = true;
                                $scope.buttonClass = 'fa fa-file-text';
                            }


                        }
                    }
                    else {
                        $scope.fileDownloadState = 'RESET';
                        $scope.DownloadButtonName = 'CSV';
                        $scope.cancelDownload = true;
                        $scope.buttonClass = 'fa fa-file-text';
                    }

                }).catch(function (err) {
                    $scope.fileDownloadState = 'RESET';
                    $scope.DownloadButtonName = 'CSV';
                    $scope.cancelDownload = true;
                    $scope.buttonClass = 'fa fa-file-text';
                });
            }

        };

        $scope.downloadPress = function () {
            $scope.fileDownloadState = 'RESET';
            $scope.DownloadButtonName = 'CSV';
            $scope.cancelDownload = true;
            $scope.buttonClass = 'fa fa-file-text';
        };


        $scope.getSMSSummary = function ()
        {
            $scope.obj.isTableLoading = 0;

            if (!$scope.FilterData) {
                var momentTz = moment.parseZone(new Date()).format('Z');
                momentTz = momentTz.replace("+", "%2B");

                var startDate = $scope.obj.startDay + ' 00:00:00' + momentTz;
                var tempEndDate = $scope.obj.endDay;

                var endDate = moment(tempEndDate).add(1, 'days').format('YYYY-MM-DD') + ' 00:00:00' + momentTz;

                var limit = parseInt($scope.recLimit);

                $scope.pagination.itemsPerPage = limit;

                $scope.FilterData = {
                    sdate: startDate,
                    edate: endDate,
                    limitCount: limit,
                    skipCount: 0,
                    channel_from: $scope.fromNumber,
                    channel_to: $scope.toNumber,
                    direction: $scope.direction

                }
            }
            else {
                $scope.FilterData.skipCount = ($scope.pagination.currentPage - 1) * $scope.FilterData.limitCount;
            }


            try {

                smsReportsService.getSMSDetailsCount($scope.FilterData).then(function (smsCount) {
                    if (smsCount && smsCount.IsSuccess) {
                        $scope.pagination.totalItems = smsCount.Result;
                    }

                    smsReportsService.getSMSDetails($scope.FilterData).then(function (smsDetailsResp) {
                        if (smsDetailsResp && smsDetailsResp.Result && smsDetailsResp.Result.length > 0) {

                            $scope.smsList = smsDetailsResp.Result;
                            $scope.obj.isTableLoading = 1;

                        }
                        else {
                            $scope.obj.isTableLoading = -1;
                            $scope.smsList = [];
                        }


                    }).catch(function (err) {
                        loginService.isCheckResponse(err);
                        $scope.showAlert('Error', 'error', 'ok', 'Error occurred while loading sms summary');
                        $scope.obj.isTableLoading = -1;
                        $scope.smsList = [];
                    });


                }).catch(function (err) {
                    loginService.isCheckResponse(err);
                    $scope.showAlert('Error', 'error', 'ok', 'Error occurred while loading sms summary');
                    $scope.obj.isTableLoading = -1;
                    $scope.smsList = [];
                });


            }
            catch (ex) {
                $scope.showAlert('Error', 'error', 'ok', 'Error occurred while loading sms summary');
                $scope.obj.isTableLoading = -1;
                $scope.smsList = [];
            }

        };

        $scope.getSMSSummaryCSVPrepare = function ()
        {
            if ($scope.DownloadButtonName === 'CSV') {
                $scope.cancelDownload = false;
                $scope.buttonClass = 'fa fa-spinner fa-spin';
            }
            else {
                $scope.cancelDownload = true;
                $scope.buttonClass = 'fa fa-file-text';
            }

            $scope.DownloadButtonName = 'PROCESSING';
            $scope.DownloadFileName = 'SMS_' + $scope.obj.startDay + '_' + $scope.obj.endDay;

            var momentTz = moment.parseZone(new Date()).format('Z');
            momentTz = momentTz.replace("+", "%2B");

            var startDate = $scope.obj.startDay + ' 00:00:00' + momentTz;
            var tempEndDate = $scope.obj.endDay;

            var endDate = moment(tempEndDate).add(1, 'days').format('YYYY-MM-DD') + ' 00:00:00' + momentTz;

            $scope.FilterData = {
                sdate: startDate,
                edate: endDate,
                channel_from: $scope.fromNumber,
                channel_to: $scope.toNumber,
                direction: $scope.direction,
                tz: momentTz
            };


            try {

                smsReportsService.getSMSDetailsNoPaging($scope.FilterData).then(function (smsDetailsResp) {
                    if (smsDetailsResp && smsDetailsResp.Result)
                    {
                        var downloadFilename = smsDetailsResp.Result;

                        checkFileReady(downloadFilename);

                    }
                    else
                    {
                        $scope.showAlert('Error', 'error', 'Error occurred while loading sms records');
                        $scope.fileDownloadState = 'RESET';
                        $scope.DownloadButtonName = 'CSV';
                        $scope.cancelDownload = true;
                        $scope.buttonClass = 'fa fa-file-text';
                    }


                }).catch(function (err)
                {
                    loginService.isCheckResponse(err);
                    $scope.showAlert('Error', 'error', 'Error occurred while loading sms records');
                    $scope.fileDownloadState = 'RESET';
                    $scope.DownloadButtonName = 'CSV';
                    $scope.cancelDownload = true;
                    $scope.buttonClass = 'fa fa-file-text';
                });


            }
            catch (ex) {

                $scope.showAlert('Error', 'error', 'Error occurred');
            }

        };

        $scope.showMessage = function (appid) {
            //modal show
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'views/app-registry/partials/appConfigModal.html',
                controller: 'modalController',
                size: 'sm',
                resolve: {
                    appID: function () {
                        return appid;
                    }
                }
            });
        };


    };
    app.controller("smsDetailReportCtrl", smsDetailReportCtrl);

}());


