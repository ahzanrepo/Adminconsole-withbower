mainApp.controller("attributeListController", function ($scope,$compile, $filter, $location, $log, attributeService) {


    $scope.countByCategory = [];
    $scope.categoryId = 0;
    $scope.showPaging = true;
    $scope.currentPage="1";
    $scope.pageTotal="1";
    $scope.pageSize="50";

    $scope.safeApply = function(fn) {
        var phase = this.$root.$$phase;
        if(phase == '$apply' || phase == '$digest') {
            if(fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

    $scope.removeDeleted = function(item) {

        $scope.safeApply(function() {
            var index = $scope.attribData.indexOf(item);
            if (index != -1) {
                $scope.attribData.splice(index, 1);
            }
        });



        /*alert('toggle in basket');*/
    };

    $scope.addNew=false;
    $scope.addAttribute=function(){
        $scope.addNew=!$scope.addNew;
    };

    $scope.saveAttribute= function(item){
        attributeService.SaveAttribute(item).then(function (response) {
            console.info("SaveAttribute : " + response);
            if(response.IsSuccess){
                $scope.attribData.splice(0, 0, response.Result);
            }
            $scope.addNew=!response.IsSuccess;
        }, function (error) {
            console.info("SaveAttribute err" + error);
        });
    };

    $scope.GetAttributeCount = function () {
        attributeService.GetAttributeCount().then(function (response) {
            $log.debug("GetAttributeCount: response" + response);
            $scope.pageTotal= response;
        }, function (error) {
            $log.debug("GetAttributeCount err");
            $scope.showAlert("Error", "Error", "ok", "There is an error ");
        });

    };


    $scope.attribData = [];
    $scope.GetAttributes = function (Paging, page, pageSize, total) {
        attributeService.GetAttributes(pageSize,page).then(function (response) {

            $log.debug("GetAttributes: response" + response);
            $scope.attribData = response;
        }, function (error) {
            $log.debug("GetAttributes err");
            $scope.showAlert("Error", "Error", "ok", "There is an error ");
        });

    };
    $scope.GetAttributes("init",1,$scope.pageSize,$scope.pageTotal);


    /*get Groups*/

    $scope.currentGrpPage="1";
    $scope.pageGrpTotal="1";
    $scope.pageSize="50";

    $scope.addGrp=false;
    $scope.addGrop=function(){
        $scope.addGrp=!$scope.addGrp;
    };

    $scope.groupsData = {};
    $scope.GetGroups = function (Paging, page, pageSize, total) {
        attributeService.GetGroups(pageSize,page).then(function (response) {

            $log.debug("GetGroups: response" + response);
            $scope.groupsData = response;
        }, function (error) {
            $log.debug("GetGroups err");
            $scope.showAlert("Error", "Error", "ok", "There is an error ");
        });

    };
    $scope.GetGroups("init",1,$scope.pageSize,$scope.pageGrpTotal);

    $scope.saveGroup = function (item) {
        attributeService.SaveGroup(item).then(function (response) {
            if(response.IsSuccess){
                $scope.groupsData.splice(0, 0, response.Result);
            }
            $scope.addGrp=!response.IsSuccess;
        }, function (error) {
            $log.debug("saveGroup err");
            $scope.showAlert("Error", "Error", "ok", "There is an error ");
        });

    };

    $scope.removeDeletedGroup = function(item) {

        $scope.safeApply(function() {
            var index = $scope.groupsData.indexOf(item);
            if (index != -1) {
                $scope.groupsData.splice(index, 1);
            }
        });

    };

    $scope.showAlert = function (tittle, label, button, content) {

        new PNotify({
            title: tittle,
            text: content,
            type: 'notice',
            styling: 'bootstrap3'
        });
    };

});


