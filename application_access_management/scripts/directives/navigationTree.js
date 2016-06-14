/**
 * Created by Rajinda on 6/13/2016.
 */

mainApp.directive("navigationtree", function (appAccessManageService) {

    return {
        restrict: "EA",
        scope: {
            navigation: '='
        },

        templateUrl: 'application_access_management/view/template/navigationTree.html',


        link: function (scope, element, attributes) {

            scope.vm = {};
            scope.vm.expandAll = expandAll;

            scope.vm.data = newItem(0, scope.navigation.navigationName);
            /*Generate tree*/
            var id = 1;
            angular.forEach(scope.navigation.resources, function (resource) {
                var item1 = addChild(scope.vm.data, resource.scopeName, resource.feature);
                id++;
                addChild(item1, id, "Read");
                id++;
                addChild(item1, id, "Write");
                id++;
                addChild(item1, id, "Delete");
            });

            /*scope.vm.expandAll(scope.vm.data);*/

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

            function expandAll(root, setting) {
                if (!setting) {
                    setting = !root.isExpanded;
                }
                root.isExpanded = setting;
                root.children.forEach(function (branch) {
                    expandAll(branch, setting);
                });
            }

            scope.updateNavigation = function (navigationData) {
                var editedMenus = [];
                angular.forEach(navigationData.children,function(menu){
                    var data={};
                    data = {
                        "menuItem": navigationData.name,//"navigationName": "ARDS_CONFIGURATION",
                        "menuAction": {
                            "Navigatione": menu.id,//"scopeName": "requestmeta",
                            "read": menu.children["0"].isSelected,
                            "write": menu.children["1"].isSelected,
                            "delete": menu.children["2"].isSelected,
                        }
                    };

                    editedMenus.push(data);
                });

                appAccessManageService.AddSelectedNavigationToUser().then(function (response) {


                }, function (error) {
                    $scope.showAlert("Error", "Error", "ok", "There is an error ");
                });
            }

        }

    }
});