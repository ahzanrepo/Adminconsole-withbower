/**
 * Created by Pawan on 3/22/2017.
 */
mainApp.controller("noticeConfigController", function ($scope, $state, noticeBackendService, loginService,$anchorScroll,notifiSenderService) {


    $anchorScroll();
    $scope.NoticeList = [];
    $scope.searchCriteria = "";
    $scope.userList = [];
    $scope.userObjects=[];
    $scope.groupObjects=[];
    $scope.Rsvrtype="Users";
    $scope.collectionTitle="Add Users here";
    $scope.isSaveEnabled=true;
    $scope.toUser=[];
    $scope.toGroup=[];

    $scope.showAlert = function (tittle, content, type) {

        new PNotify({
            title: tittle,
            text: content,
            type: type,
            styling: 'bootstrap3'
        });
    };

    $scope.removeDeleted = function (item) {

        var index = $scope.NoticeList.indexOf(item);
        if (index != -1) {
            $scope.NoticeList.splice(index, 1);
        }

    };
    $scope.reloadPage = function () {
        $scope.GetSavedNotices();
    };

    $scope.GetSavedNotices = function () {
        noticeBackendService.getNotices().then(function (response) {

            if (!response.data.IsSuccess) {
                console.info("Error in picking Notices " + response.data.Exception);
            }
            else {
                $scope.NoticeList = response.data.Result;
                //$scope.MasterAppList = response.data.Result;
            }

        }, function (error) {
            loginService.isCheckResponse(error);
            console.info("Error in picking Notices " + error);
        })
    };

    $scope.cancleEdit = function () {
        $scope.addNew = false;
    };


    $scope.GetSavedNotices();
    function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(user) {
            if(user.username)
            {
                return (user.username.toLowerCase().indexOf(lowercaseQuery) != -1);
            }
            else
            {
                return (user.username.toLowerCase().indexOf(lowercaseQuery) != -1);
            }


        };
    }

    $scope.querySearch = function (query) {
        if (query === "*" || query === "") {
            if ($scope.userList) {
                return $scope.userList;
            }
            else {
                return [];
            }

        }
        else {
            var results = query ? $scope.userList.filter(createFilterFor(query)) : [];
            return results;
        }

    };


    $scope.onChipAdd = function (chip) {

        if($scope.Rsvrtype=="Users" && $scope.toUser.indexOf(chip)==-1)
        {
            $scope.toUser.push(chip.username);
        }
        else
        {
            if($scope.toGroup.indexOf(chip)==-1)
            {
                $scope.toGroup.push(chip.username);
            }

        }


    };
    $scope.onChipDelete = function (chip) {
        var index=-1;
        if($scope.Rsvrtype=="Users")
        {
            index = $scope.toUser.indexOf(chip.username);
            console.log("index ", index);
            if (index > -1) {
                $scope.toUser.splice(index, 1);
                console.log("rem user " + $scope.toUser);
            }
        }
        else
        {
            index = $scope.toGroup.indexOf(chip.username);
            console.log("index ", index);
            if (index > -1) {
                $scope.toGroup.splice(index, 1);
                console.log("rem Group " + $scope.toGroup);
            }
        }





    };


    $scope.loadUserGroups = function () {

        notifiSenderService.getUserGroupList().then(function (response) {
            if(response.data.IsSuccess)
            {
                $scope.groupObjects=response.data.Result;
            }

        }, function (error) {
            console.log("Getting usergroups failed");
        })
    };

    $scope.attributeGroup;
    $scope.loadUsers = function () {

        notifiSenderService.getUserList().then(function (response) {
            if(response)
            {
                $scope.userObjects=response;
                $scope.userList=$scope.userObjects;
            }

        }, function (error) {
            console.log("Getting user groups failed");
        })
    };

    $scope.loadUserGroups();
    $scope.loadUsers();

    $scope.setUserList = function () {

        $scope.toUser=[];
        $scope.toGroup=[];

        if($scope.Rsvrtype=="Users")
        {
            $scope.userList=$scope.userObjects;
            $scope.attributeGroup=null;
            $scope.collectionTitle="Add Users here";
        }
        else
        {
            $scope.userList=[];
            $scope.userList=$scope.groupObjects.map(function (group) {
                group.username=group.name;
                return group;
            });
            $scope.attributeGroup=null;
            $scope.collectionTitle="Add Groups here";
        }
    }



    $scope.sendNoticeData = function () {

        $scope.isSaveEnabled=false;

        if($scope.Rsvrtype=="Users" )
        {
            $scope.newNotice.toUser=$scope.toUser;
            $scope.newNotice.toGroup=null;
        }
        else
        {
            $scope.newNotice.toGroup=$scope.toGroup;
            $scope.newNotice.toUser=null;
        }

        noticeBackendService.sendNotice($scope.newNotice).then(function (response) {
            console.log("Notice sent");
            $scope.newNotice={};
            $scope.Rsvrtype="Users"
            $scope.attributeGroup=null;
            $scope.isSaveEnabled=true;
            $scope.GetSavedNotices();


            $scope.showAlert("Notice","Notice sent","success");


        }, function (error) {
            console.log("Send failed");
            $scope.isSaveEnabled=true;
            $scope.showAlert("Notice","Notice sending failed","error");
        });



    }

});

