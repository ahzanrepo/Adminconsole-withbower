/**
 * Created by Damith on 9/28/2016.
 */

(function () {
    var app = angular.module('veeryConsoleApp');

    var createFilterCtrl = function ($scope, $http, $filter, ticketFilterService) {

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

        $scope.showAlert = function (title,content,type) {

            new PNotify({
                title: title,
                text: content,
                type: type,
                styling: 'bootstrap3'
            });
        };

        $scope.currentFilter = {
            conditions:{
                all:[],
                any:[]
            }
        };

        $scope.IsNewFilterSchema = true;

        $scope.filters = [];
        $scope.data = [];
        var obj = {
            id: '',
            name: '',
            fieldType: '',
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
        ticketFilterService.getMainFiledList().then(function (response) {
            if (response) {
                obj.id = guid();
                $scope.data = response;
                //$scope.filters.push(obj);
                $scope.currentFilter.conditions.all.push(obj);
            }
        }, function (error) {
            console.log(error);
        });

        //---- add new filed
        $scope.addNewFilterToAll = function () {


            var emptyAllFilterObj = {
                uniqueId: guid()
            };

            $scope.currentFilter.conditions.all.push(emptyAllFilterObj);

        };

        $scope.addNewFilterToAny = function () {

            var emptyAnyFilterObj = {
                uniqueId: guid()
            };

            $scope.currentFilter.conditions.any.push(emptyAnyFilterObj);

        };

        var cleanUpEmptyFilters = function(filterArr)
        {

        }


        $scope.saveFilter = function()
        {
            //create body

            if($scope.IsNewFilterSchema)
            {
                //save
                ticketFilterService.addTicketView($scope.currentFilter).then(function(addResult)
                {
                    if(addResult.IsSuccess)
                    {
                        $scope.showAlert('Success', 'Filter Saved Successfully', 'info');

                    }
                    else
                    {
                        $scope.showAlert('Error', 'Filter Save Failed', 'error');
                    }

                }, function(err)
                {
                    $scope.showAlert('Error', 'Filter Save Failed', 'error');
                });
            }
            else
            {
                //update
                ticketFilterService.updateTicketViewById($scope.currentFilter._id, $scope.currentFilter).then(function(updateResult)
                {
                    if(updateResult.IsSuccess)
                    {
                        $scope.showAlert('Success', 'Filter Updated Successfully', 'info');

                    }
                    else
                    {
                        $scope.showAlert('Error', 'Filter Update Failed', 'error');
                    }

                }, function(err)
                {
                    $scope.showAlert('Error', 'Filter Update Failed', 'error');
                });
            }



        };


        //---- remove filed

        $scope.removeAllFilter = function (id) {
            var index = -1;
            for (var i = 0, len = $scope.currentFilter.conditions.all.length; i < len; i++) {
                if ($scope.currentFilter.conditions.all[i].uniqueId === id) {
                    index = i;
                    break;
                }
            }
            if (index >= 0)
                $scope.currentFilter.conditions.all.splice(index, 1);
        };

        $scope.removeAnyFilter = function (id) {
            var index = -1;
            for (var i = 0, len = $scope.currentFilter.conditions.any.length; i < len; i++) {
                if ($scope.currentFilter.conditions.any[i].uniqueId === id) {
                    index = i;
                    break;
                }
            }
            if (index >= 0)
                $scope.currentFilter.conditions.any.splice(index, 1);
        };

        //---- selectedFiled
        $scope.allFromData = [];
        $scope.selectedValues = [];
        $scope.updateValue = function (selectedField) {

            selectedField.value = "";

            var filteredObj = $scope.data.filter(function (item)
            {
                if (item.field === selectedField.field)
                {
                    return true;
                }
                else
                {
                    return false;
                }

            });

            if(filteredObj && filteredObj.length > 0)
            {
                selectedField.type = filteredObj[0].type;

                selectedField.selectedValues = [];
                if (selectedField.type == "Select") {
                    selectedField.selectedValues = filteredObj[0].values;
                }
            }

            //have to find field type
            //var index = $('#filedList option:selected').attr('data-index');

        };

        $scope.loadNewTicketView = function()
        {
            $scope.IsNewFilterSchema = true;
            $scope.currentFilter = {
                uniqueId: guid()
            };

            $scope.currentFilter.conditions = {
                all:[],
                any:[]
            };

            var emptyAllFilterObj = {
                uniqueId: guid()
            };

            $scope.currentFilter.conditions.all.push(emptyAllFilterObj);

            var emptyAnyFilterObj = {
                uniqueId: guid()
            };

            $scope.currentFilter.conditions.any.push(emptyAnyFilterObj);

            $scope.isNewView = !$scope.isNewView;

        };


        $scope.loadSpecificTicketView = function(id)
        {
            $scope.IsNewFilterSchema = false;
            ticketFilterService.getTicketViewById(id).then(function(ticketFilter)
            {
                if(ticketFilter.Result)
                {
                    $scope.currentFilter = ticketFilter.Result;

                    if($scope.currentFilter.conditions)
                    {
                        if(!$scope.currentFilter.conditions.all)
                        {
                            $scope.currentFilter.conditions.all = [];
                        }
                        else
                        {
                            if($scope.currentFilter.conditions.all.length > 0)
                            {
                                $scope.currentFilter.conditions.all.forEach(function(selectedField)
                                {
                                    var filteredObj = $scope.data.filter(function (item)
                                    {
                                        if (item.field === selectedField.field)
                                        {
                                            return true;
                                        }
                                        else
                                        {
                                            return false;
                                        }

                                    });

                                    if(filteredObj && filteredObj.length > 0)
                                    {
                                        selectedField.type = filteredObj[0].type;

                                        selectedField.selectedValues = [];
                                        if (selectedField.type == "Select") {
                                            selectedField.selectedValues = filteredObj[0].values;
                                        }
                                    }


                                })
                            }
                        }

                        if(!$scope.currentFilter.conditions.any)
                        {
                            $scope.currentFilter.conditions.any = [];
                        }
                        else
                        {
                            if($scope.currentFilter.conditions.any.length > 0)
                            {
                                $scope.currentFilter.conditions.any.forEach(function(selectedField)
                                {
                                    var filteredObj = $scope.data.filter(function (item)
                                    {
                                        if (item.field === selectedField.field)
                                        {
                                            return true;
                                        }
                                        else
                                        {
                                            return false;
                                        }

                                    });

                                    if(filteredObj && filteredObj.length > 0)
                                    {
                                        selectedField.type = filteredObj[0].type;

                                        selectedField.selectedValues = [];
                                        if (selectedField.type == "Select") {
                                            selectedField.selectedValues = filteredObj[0].values;
                                        }
                                    }


                                })
                            }
                        }
                    }
                    else
                    {
                        $scope.currentFilter.conditions = {
                            all:[],
                            any:[]
                        }
                    }

                    var emptyAllFilterObj = {
                        uniqueId: guid()
                    };

                    $scope.currentFilter.conditions.all.push(emptyAllFilterObj);

                    var emptyAnyFilterObj = {
                        uniqueId: guid()
                    };

                    $scope.currentFilter.conditions.any.push(emptyAnyFilterObj);

                    $scope.isNewView = !$scope.isNewView;
                }
                else
                {
                    //TODO:route back to list page
                    $scope.showAlert('Error', 'Ticket Filter Not Found', 'error');
                }

            }, function(err)
            {
                //TODO:route back to list page
                $scope.showAlert('Error', 'Error loading ticket filter', 'error');
            });
        };

        //---- Get All ticket views
        $scope.ticketViewsAll = [];
        ticketFilterService.getAllTicketViews().then(function (res) {
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