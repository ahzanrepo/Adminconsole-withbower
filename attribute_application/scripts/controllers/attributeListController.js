mainApp.controller("attributeListController", function ($scope,$compile, $filter, $location, $log, attributeService) {

    $scope.countByCategory = [];
    $scope.categoryId = 0;
    $scope.showPaging = true;
    $scope.currentPage="1";
    $scope.pageTotal="1";
    $scope.pageSize="50";

    /*$scope.toggleInBasket = function(item) {
        alert('toggle in basket');
    };*/

    $scope.editAttribute=function(item){
        console.log("sdfdfsd");
         angular.element(document.getElementById(item.AttributeId))
            .append($compile("<editattribute attribute='item' update-attribute='toggleInBasket(item)'></editattribute>")
            ($scope));
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
    $scope.GetAttributes();

    $scope.GetAttributes("init",1,$scope.pageSize,$scope.pageTotal);


    $scope.showAlert = function (tittle, label, button, content) {

        new PNotify({
            title: tittle,
            text: content,
            type: 'notice',
            styling: 'bootstrap3'
        });
    };

});


