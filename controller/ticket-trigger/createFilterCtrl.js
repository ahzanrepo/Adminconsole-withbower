/**
 * Created by Damith on 9/28/2016.
 */

(function () {
    var app = angular.module('veeryConsoleApp');

    var createFilterCtrl = function ($scope, $http, createFileServices) {

        //get all filed and types
        $scope.conditiones = [
            "is",
            "less_than",
            "greater_than",
            "is_not",
            "included",
            "not_included",
            "greater_than_or_equal",
            "less_than_or_equal"
        ];
        $scope.filters = [];
        $scope.data = [];
        var obj = {
            id: '',
            name: '',
            selectedFiled: '',
        };

        //--- create random number --
        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }

            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }

        var data = null;
        createFileServices.getMainFiledList().then(function (response) {
            if (response) {
                obj.id = guid();
                $scope.data = response;
                $scope.filters.push(obj);
            }
        }, function (error) {
            console.log(error);
        });

        //---- add new filed
        $scope.addNewFilter = function () {
            var obj = {
                id: guid(),
                name: '',
                selectedFiled: '',
                data: data
            };
            $scope.filters.push(obj);
            console.log($scope.filters);
        };

        //---- remove filed
        var index = -1;
        $scope.removeFilter = function (id) {
            for (var i = 0, len = $scope.filters.length; i < len; i++) {
                if ($scope.filters[i].id === id) {
                    index = i;
                    break;
                }
            }
            if (index >= 0)
                $scope.filters.splice(index, 1);
        };

        //---- selectedFiled
        $scope.allFromData = []
        $scope.selectedValues = [];
        $scope.updateValue = function (type) {
            var index = $('#filedList option:selected').attr('data-index');
            $scope.selectedValues = [];
            if (type == "Select") {
                $scope.selectedValues = $scope.data[index].values;
            }
        };

        //---- Get All ticket views
        $scope.ticketViewsAll = [];
        createFileServices.getAllTicketViews().then(function (res) {
            if (res) {
                $scope.ticketViewsAll = res;
                console.log($scope.ticketViewsAll);
            }


        }, function (error) {

        });//end

        $scope.isNewView = false;
        $scope.createNewView = function () {
            $scope.isNewView = !$scope.isNewView;
        };//end
    };

    app.controller('createFilterCtrl', createFilterCtrl);
})();