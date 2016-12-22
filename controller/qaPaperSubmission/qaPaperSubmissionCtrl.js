/**
 * Created by dinusha on 9/6/2016.
 */
(function () {
    var app = angular.module("veeryConsoleApp");

    var qaSubmissionCtrl = function ($scope, $filter, $q, $sce, userProfileApiAccess, cdrApiHandler, loginService, _) {

        $scope.showAlert = function (tittle, type, content) {

            new PNotify({
                title: tittle,
                text: content,
                type: type,
                styling: 'bootstrap3'
            });
        };

        $scope.moment = moment;

        $scope.config = {
            preload: "auto",
            tracks: [
                {
                    src: "http://www.videogular.com/assets/subs/pale-blue-dot.vtt",
                    kind: "subtitles",
                    srclang: "en",
                    label: "English",
                    default: ""
                }
            ],
            theme: {
                url: "bower_components/videogular-themes-default/videogular.css"
            },
            "analytics": {
                "category": "Videogular",
                "label": "Main",
                "events": {
                    "ready": true,
                    "play": true,
                    "pause": true,
                    "stop": true,
                    "complete": true,
                    "progress": 10
                }
            }
        };

        $scope.userList = [];
        $scope.cdrList = [];
        $scope.isTableLoading = 2;

        var videogularAPI = null;

        $scope.onPlayerReady = function (API) {
            videogularAPI = API;

        };

        $scope.deleteRecord = function(cdr)
        {
            var index = $scope.cdrList.indexOf(cdr);

            if (index > -1) {
                $scope.cdrList.splice(index, 1);
            }
        };

        $scope.playStopFile = function (uuid) {
            if (videogularAPI) {
                var decodedToken = loginService.getTokenDecode();

                if (decodedToken && decodedToken.company && decodedToken.tenant) {
                    var fileToPlay = baseUrls.fileServiceInternalUrl + 'File/DownloadLatest/' + decodedToken.tenant + '/' + decodedToken.company + '/' + uuid + '.mp3';

                    var arr = [
                        {
                            src: $sce.trustAsResourceUrl(fileToPlay),
                            type: 'audio/mp3'
                        }
                    ];

                    $scope.config.sources = arr;


                    videogularAPI.play();
                }
            }


        };




        $scope.startDate = moment().format("YYYY-MM-DD");
        $scope.endDate = moment().format("YYYY-MM-DD");

        var loadUsers = function () {
            userProfileApiAccess.getUsers().then(function (data)
            {
                if (data.IsSuccess)
                {
                    $scope.userList = data.Result;
                }
                else
                {
                    var errMsg = data.CustomMessage;

                    if (data.Exception)
                    {
                        errMsg = data.Exception.Message;
                    }
                    $scope.showAlert('Error', 'error', errMsg);

                }

            }, function (err)
            {
                loginService.isCheckResponse(err);
                var errMsg = "Error occurred while loading users";
                if (err.statusText) {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Error', 'error', errMsg);
            });
        };

        loadUsers();

        $scope.getRecords = function () {

            $scope.isTableLoading = 0;

            var momentTz = moment.parseZone(new Date()).format('Z');
            //var encodedTz = encodeURI(momentTz);
            momentTz = momentTz.replace("+", "%2B");

            var startDate = $scope.startDate + ' 00:00:00.000' + momentTz;
            var endDate = $scope.endDate + ' 23:59:59.999' + momentTz;

            var sipUser = null;

            if($scope.agentSelected && $scope.agentSelected.veeryaccount && $scope.agentSelected.veeryaccount.contact)
            {
                var split = $scope.agentSelected.veeryaccount.contact.split('@');

                if(split && split.length >= 1)
                {
                    sipUser = split[0];
                }
            }

            cdrApiHandler.getProcessedCDRByFilter(startDate, endDate, sipUser, null, $scope.directionFilter, null, null).then(function (data)
            {
                if (data.IsSuccess && data.Result)
                {
                    var answeredCalls = _.where(data.Result, {IsAnswered: true});
                    $scope.cdrList = answeredCalls;
                    $scope.isTableLoading = 1;
                }
                else
                {
                    $scope.cdrList = [];
                    var errMsg = data.CustomMessage;

                    if (data.Exception)
                    {
                        errMsg = data.Exception.Message;
                    }
                    $scope.showAlert('Error', 'error', errMsg);

                    $scope.isTableLoading = 1;

                }

            }, function (err)
            {
                $scope.cdrList = [];
                $scope.isTableLoading = 1;
                loginService.isCheckResponse(err);
                var errMsg = "Error occurred while loading users";
                if (err.statusText) {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Error', 'error', errMsg);
            });
        };


    };
    app.controller("qaSubmissionCtrl", qaSubmissionCtrl);

}());


