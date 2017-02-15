/**
 * Created by Heshan.i on 2/14/2017.
 */

(function(){

    var app = angular.module('veeryConsoleApp');

    var numberDncController = function($scope, $q, campaignNumberApiAccess, loginService){

        $scope.dncNumberList = [];
        $scope.numbersToUpdate = {};
        $scope.numbersToUpdate.ContactIds = [];
        $scope.manageDncNumbers = true;


        $scope.data = [];
        $scope.headerData = [];
        $scope.selectObj = {};


        $scope.reset = function() {
            $scope.selectObj = {};
            $scope.headerData = [];
            $scope.numbersToUpdate.ContactIds = [];
            $scope.gridOptions2.data = [];
            $scope.gridOptions2.columnDefs = [];
        };


        function validateNumbers(data, filter) {
            var deferred = $q.defer();
            setTimeout(function () {
                var numbers = [];
                data.forEach(function (data) {
                    numbers.push(data[filter])
                });
                deferred.resolve(numbers);
            },1000);
            return deferred.promise;
        }


        $scope.loadNumbers = function(){
            $scope.numbersToUpdate.ContactIds = [];


            var promise = validateNumbers($scope.data, $scope.selectObj.name);
            promise.then(function(numbers) {
                $scope.numbersToUpdate.ContactIds = numbers;
            });
        };



        $scope.gridOptions2 = {
            enableGridMenu: false,
            data: 'data',
            importerDataAddCallback: function ( grid, newObjects ) {
                $scope.data = newObjects;
            },
            onRegisterApi: function(gridApi){
                $scope.gridApi2 = gridApi;
            },
            importerProcessHeaders: function( hData, headerArray ) {
                var myHeaderColumns = [];
                var thisCol;

                headerArray.forEach(function (value, index) {
                    thisCol = mySpecialLookupFunction(value, index);
                    myHeaderColumns.push(thisCol.name);
                    $scope.headerData.push({name: thisCol.name, index: index});
                });

                return myHeaderColumns;
            }
        };

        var mySpecialLookupFunction = function(value, index){
            var headerType = typeof value;
            if(headerType.toLowerCase() !== 'string'){
                return {name:'Undefined Column '+index};
            }else{
                return {name:value};
            }
        };

        var handleFileSelect = function( event ){
            var target = event.srcElement || event.target;

            if (target && target.files && target.files.length === 1) {
                var fileObject = target.files[0];
                $scope.gridApi2.importer.importFile( fileObject );
                target.form.reset();
            }
        };

        var fileChooser = document.querySelectorAll('.file-chooser2');

        if ( fileChooser.length !== 1 ){
            console.log('Found > 1 or < 1 file choosers within the menu item, error, cannot continue');
        } else {
            fileChooser[0].addEventListener('change', handleFileSelect, false);
        }










        $scope.gridOptions3 = {
            enableSorting: true,
            enableFiltering: true,
            treeRowHeaderAlwaysVisible: true,
            multiSelect: true,
            enableRowSelection: true,
            enableSelectAll: true,
            selectionRowHeaderWidth: 35,
            columnDefs: [
                { name: 'DNC Number', field: 'ContactId', width: '50%' },
                { name: 'DNC Type', field: 'DncType', grouping: { groupPriority: 1 }, sort: { priority: 1, direction: 'asc' }, width: '50%', cellFilter: 'mapDncType' }
            ],
            onRegisterApi: function( gridApi ) {
                $scope.gridApi3 = gridApi;
            }
        };

        $scope.selectAll = function() {
            $scope.gridApi3.selection.selectAllRows();
        };

        $scope.clearAll = function() {
            $scope.gridApi3.selection.clearSelectedRows();
        };

        $scope.loadDncNumberList = function(){
            campaignNumberApiAccess.GetDncNumbers().then(function(response){
                if(response.IsSuccess)
                {
                    var tempDncNumList = response.Result;

                    tempDncNumList.forEach(function(dncNumber){
                        if(dncNumber.TenantId === -1 && dncNumber.CompanyId === -1){
                            dncNumber.DncType = 'Global';
                        }else{
                            dncNumber.DncType = 'Company';
                        }
                    });


                    $scope.dncNumberList = tempDncNumList;
                    $scope.gridOptions3.data = $scope.dncNumberList;
                }
                else
                {
                    var errMsg = response.CustomMessage;

                    if(response.Exception)
                    {
                        errMsg = response.Exception.Message;
                    }
                    $scope.showAlert('Dnc Number Upload', errMsg, 'error');
                }
            }, function(err){
                loginService.isCheckResponse(err);
                var errMsg = "Error occurred while loading DNC numbers";
                if(err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Dnc Number Upload', errMsg, 'error');
            });
        };

        $scope.addNumbersToDncList = function(){
            campaignNumberApiAccess.AddNumbersToDnc($scope.numbersToUpdate).then(function(response){
                if(response.IsSuccess)
                {
                    $scope.loadDncNumberList();
                    $scope.showAlert('Dnc Number Upload', 'Add numbers to DNC list success', 'success');
                }
                else
                {
                    var errMsg = response.CustomMessage;

                    if(response.Exception)
                    {
                        errMsg = response.Exception.Message;
                    }
                    $scope.showAlert('Dnc Number Upload', errMsg, 'error');
                }
            }, function(err){
                loginService.isCheckResponse(err);
                var errMsg = "Error occurred while adding numbers to DNC list";
                if(err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Dnc Number Upload', errMsg, 'error');
            });
        };

        $scope.removeNumbersFromDncList = function(){
            var selectedRows = $scope.gridApi3.selection.getSelectedRows();
            var numbersToRemove = {
                ContactIds: selectedRows.map(function (row) {
                    return row.ContactId;
                })
            };
            campaignNumberApiAccess.DeleteNumbersFromDnc(numbersToRemove).then(function(response){
                if(response.IsSuccess)
                {
                    $scope.loadDncNumberList();
                    $scope.showAlert('Dnc Number Upload', 'Remove numbers from DNC list success', 'success');
                }
                else
                {
                    var errMsg = response.CustomMessage;

                    if(response.Exception)
                    {
                        errMsg = response.Exception.Message;
                    }
                    $scope.showAlert('Dnc Number Upload', errMsg, 'error');
                }
            }, function(err){
                loginService.isCheckResponse(err);
                var errMsg = "Error occurred while removing numbers from DNC list";
                if(err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Dnc Number Upload', errMsg, 'error');
            });
        };

        $scope.loadDncNumberList();
    };

    app.controller('numberDncController', numberDncController).filter('mapDncType', function() {
        var dncTypeHash = {
            1: 'Global',
            2: 'Company'
        };

        return function(input) {
            var result;
            var match;
            if (!input){
                return '';
            } else if (result = dncTypeHash[input]) {
                return result;
            } else if ( ( match = input.match(/(.+)( \(\d+\))/) ) && ( result = dncTypeHash[match[1]] ) ) {
                return result + match[2];
            } else {
                return input;
            }
        };
    });

}());