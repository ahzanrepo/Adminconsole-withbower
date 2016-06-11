mainApp.controller("appAccessManageController",function($scope,appAccessManageService) {
    /*var vm = this;
    vm.expandAll = expandAll;
    vm.data = newItem(0,"Console App Navigation's");
    var item1 = addChild(vm.data, 1, "ARDS Configurations");
   /!* item4.isSelected=true;
    item1.isExpanded = true;*!/
    var item9 = addChild(item1, 5, "Request Metadata");
    addChild(item9, 6, "Read");
    addChild(item9, 7, "Write");
    addChild(item9, 8, "Delete");*/

    /*Load Application list*/
    $scope.consoleAppList = [];
    $scope.loadUserData=function(){
        var str ='{"_id":"575a60bbbb7565600a9e8bfb","consoleName":"ADMIN","created_at":"2016-06-10T06:39:55.693Z","updated_at":"2016-06-11T14:18:12.179Z","__v":0,"consoleNavigation":[{"_id":"575c1da37f1f1d7c171b2736","updated_at":"2016-06-11T14:18:11.503Z","created_at":"2016-06-11T14:18:11.503Z","navigationStatus":true,"navigationName":"ARDS_CONFIGURATION","scopes":[{"scopeName":"requestmeta","feature":"ards configuration access","_id":"575c1da37f1f1d7c171b2738","actions":["read","write","delete"]}]}],"consoleUserRoles":["admin","supervisor"]}';
        $scope.consoleAppList = JSON.parse(str);
    };
    $scope.loadUserData();


    var vm = this;
    vm.expandAll = expandAll;
    vm.data = newItem(0,"Console App Navigation's");

    /*Generate tree*/
    var id=1;
    angular.forEach($scope.consoleAppList.consoleNavigation,function(navigation){
        var item1 = addChild(vm.data, id, navigation.navigationName);
        id++;
        angular.forEach(navigation.scopes,function(scopeData){
            var item9 = addChild(item1, id, scopeData.scopeName);
            id++;
            addChild(item9, id, "Read");id++;
            addChild(item9, id, "Write");id++;
            addChild(item9, id, "Delete");
        });


    });

    vm.expandAll(vm.data);





    function newItem(id, name) {
        return {
            id: id,
            name: name,
            children: [],
            isExpanded: false,
            isSelected: false,
        };
    }

    function addChild(parent, id, name) {
        var child = newItem(id, name);
        child.parent = parent;
        parent.children.push(child);
        return child;
    }

    function expandAll(root, setting){
        if(! setting){
            setting = ! root.isExpanded;
        }
        root.isExpanded = setting;
        root.children.forEach(function(branch){
            expandAll(branch, setting);
        });
    }



    $scope.userList = [];
    $scope.GetUserList = function () {

        appAccessManageService.GetUserList().then(function (response) {
            $scope.userList = response;
        }, function (error) {
            $scope.showAlert("Error", "Error", "ok", "There is an error ");
        });

    };
    $scope.GetUserList();



});


/*
mainApp.controller("appAccessManageController", function ($scope, $filter, $location, $log, appAccessManageService) {

    $scope.vm = {};
    $scope.vm.expandAll = $scope.expandAll;


    $scope.vm.data = newItem(0,"Portal");
    var item1 = addChild($scope.vm.data, 1, "Search");
    var item2 = addChild($scope.vm.data, 2, "Dashboard");
    var item3 = addChild($scope.vm.data, 3, "Item 3");
    var item4 = addChild($scope.vm.data, 4, "Item 4");

    item4.isSelected=true;
    item1.isExpanded = true;
    addChild(item1, 5, "Policy Search.");
    addChild(item1, 6, "Claims Search.");
    addChild(item2, 7, "Underwriter Dashboard.");
    addChild(item2, 8, "Claims Dashboard.");


    function newItem(id, name) {
        return {
            id: id,
            name: name,
            children: [],
            isExpanded: false,
            isSelected: false,
        };
    }

    function addChild(parent, id, name) {
        var child = newItem(id, name);
        child.parent = parent;
        parent.children.push(child);
        return child;
    }

    function expandAll(root, setting){
        if(! setting){
            setting = ! root.isExpanded;
        }
        root.isExpanded = setting;
        root.children.forEach(function(branch){
            expandAll(branch, setting);
        });
    }


    $scope.userList = [];
    $scope.GetUserList = function () {

        appAccessManageService.GetUserList().then(function (response) {
            $scope.userList = response;
        }, function (error) {
            $scope.showAlert("Error", "Error", "ok", "There is an error ");
        });

    };
    $scope.GetUserList();


    $scope.userList = [];
    $scope.loadUserData=function(){

    };
});

*/
