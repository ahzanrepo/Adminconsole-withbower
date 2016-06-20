mainApp.controller("attributeListController", function ($scope, $compile, $filter, $location, $log, attributeService) {


    $scope.countByCategory = [];
    $scope.categoryId = 0;
    $scope.showPaging = false;
    $scope.currentPage = "1";
    $scope.pageTotal = "1";
    $scope.pageSize = "50";

    $scope.GetAttributeCount = function () {
        attributeService.GetAttributeCount().then(function (response) {
            $scope.pageTotal = response;
        }, function (error) {
            $log.debug("GetAttributeCount err");
            $scope.showAlert("Error", "Error", "ok", "There is an error ");
        });

    };
    $scope.GetAttributeCount();


    $scope.getPageData = function (model, page, pageSize, total) {
        if (model == "attribute") {
            $scope.GetAttributes(model, page, pageSize);
        }
        else {
            $scope.GetGroups(model, page, pageSize);
        }
    };

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

    $scope.removeDeleted = function (item) {

        $scope.safeApply(function () {
            var index = $scope.attribData.indexOf(item);
            if (index != -1) {
                $scope.attribData.splice(index, 1);
            }
        });
        $scope.GetAttributeCount();

        /*alert('toggle in basket');*/
    };

    $scope.addNew = false;
    $scope.addAttribute = function () {
        $scope.addNew = !$scope.addNew;
    };

    $scope.saveAttribute = function (item) {
        attributeService.SaveAttribute(item).then(function (response) {
            console.info("SaveAttribute : " + response);
            if (response.IsSuccess) {
                $scope.GetAttributes("init", 1, $scope.pageSize);
                $scope.attribute={};
                $scope.showAlert("Info", "Info", "ok", "Save Successfully");
            }
            $scope.addNew = !response.IsSuccess;
            $scope.GetAttributeCount();
        }, function (error) {
            console.info("SaveAttribute err" + error);
        });
    };

    $scope.attribData = [];
    $scope.GetAttributes = function (Paging, page, pageSize) {
        $scope.showPaging = false;
        attributeService.GetAttributes(pageSize, page).then(function (response) {
            $log.debug("GetAttributes: response" + response);
            $scope.attribData = response;
            $scope.showPaging = true;
        }, function (error) {
            $log.debug("GetAttributes err");
            $scope.showAlert("Error", "Error", "ok", "There is an error ");
        });

    };
    $scope.GetAttributes("init", 1, $scope.pageSize);


    /*get Groups*/

    $scope.currentGrpPage = "1";
    $scope.pageGrpTotal = "1";

    $scope.GroupsCount = function () {
        attributeService.GroupsCount().then(function (response) {
            $log.debug("GroupsCount: response" + response);
            $scope.pageGrpTotal = response;
        }, function (error) {
            $log.debug("GroupsCount err");
            $scope.showAlert("Error", "Error", "ok", "There is an error ");
        });

    };
    $scope.GroupsCount();
    $scope.addGrp = false;
    $scope.addGrop = function () {
        $scope.addGrp = !$scope.addGrp;
    };

    $scope.groupsData = {};
    $scope.GetGroups = function (Paging, page, pageSize) {
        attributeService.GetGroups(pageSize, page).then(function (response) {

            $log.debug("GetGroups: response" + response);
            $scope.groupsData = response;
        }, function (error) {
            $log.debug("GetGroups err");
            $scope.showAlert("Error", "Error", "ok", "There is an error ");
        });

    };

    $scope.GetGroups("init", 1, $scope.pageSize);

    $scope.saveGroup = function (item) {
        attributeService.SaveGroup(item).then(function (response) {
            if (response.IsSuccess) {
                $scope.GetGroups("init", 1, $scope.pageSize);
                $scope.showAlert("Info", "Info", "ok", "Save Successfully");
            }
            $scope.addGrp = !response.IsSuccess;
            $scope.GroupsCount();
        }, function (error) {
            $log.debug("saveGroup err");
            $scope.showAlert("Error", "Error", "ok", "There is an error ");
        });

    };

    $scope.removeDeletedGroup = function (item) {

        $scope.safeApply(function () {
            var index = $scope.groupsData.indexOf(item);
            if (index != -1) {
                $scope.groupsData.splice(index, 1);
            }
        });
        $scope.GroupsCount();
    };

    $scope.showAlert = function (tittle, label, button, content) {

        new PNotify({
            title: tittle,
            text: content,
            type: 'success',
            styling: 'bootstrap3'
        });
    };

    //update code by damith
    //on click change attribute view
    $scope.attributes = false;
    $scope.changeView = function (state) {
        $scope.attributes = state;
    }


});


