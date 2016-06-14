/**
 * Created by Pawan on 6/13/2016.
 */
mainApp.controller("holdMusicController", function ($scope,$state, holdMusicBackendService) {

    $scope.holdMusicList=[];
    $scope.holdMusicFiles = [];
    $scope.addNew = false;

    $scope.GetHoldMusic = function () {
        holdMusicBackendService.getHoldMusic().then(function (response) {

            if(response.data.Exception)
            {
                console.info("Error in picking Hold Music list "+response.data.Exception);
            }
            else
            {
                $scope.holdMusicList = response.data.Result;
                //$scope.MasterAppList = response.data.Result;
            }

        }), function (error) {
            console.info("Error in picking Hold music  "+error);
        }
    };

    $scope.GetHoldMusicFiles = function () {
        holdMusicBackendService.getHoldMusicFiles().then(function (response) {

            if(response.data.Exception)
            {
                console.info("Error in picking Hold Music list "+response.data.Exception);
            }
            else
            {
                $scope.holdMusicFiles = response.data.Result;
                $scope.addNew = !$scope.addNew;
                //$scope.MasterAppList = response.data.Result;
            }

        }), function (error) {
            console.info("Error in picking Hold music  "+error);
        }
    };





    $scope.addHoldMusic = function () {

        $scope.GetHoldMusicFiles();
    };
    $scope.cancelSave = function () {
        $scope.addNew = false;
    };

    $scope.saveHoldMusic = function (resource) {

        holdMusicBackendService.saveHoldMusicFiles(resource).then(function (response) {

            if(!response.data.IsSuccess)
            {
                console.info("Error in adding new Hold Music "+response.data.Exception);
            }
            else
            {
                $scope.addNew = !response.data.IsSuccess;

                $scope.holdMusicList.splice(0, 0, response.data.Result);
                $scope.newHoldMusic={};


            }

        }, function (error) {
            console.info("Exception in adding new Hold Music "+error);
        });
    };

    $scope.reloadMusicListPage= function () {
        $state.reload();
    };

    $scope.removeDeleted = function (item) {

        console.log("Hit ............");
        var index = $scope.holdMusicList.indexOf(item);
        if (index != -1) {
            $scope.holdMusicList.splice(index, 1);
        }

    };

    $scope.GetHoldMusic();

});