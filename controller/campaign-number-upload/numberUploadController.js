/**
 * Created by Heshan.i on 2/8/2017.
 */

(function(){

    var app =angular.module('veeryConsoleApp');


    app.controller('numberUploadController', ['$scope', function ($scope) {
        $scope.data = [];

        $scope.reset = function() {
            $scope.gridOptions.data = [];
            $scope.gridOptions.columnDefs = [];
        };

        $scope.menuItems = [
            {
                title: 'Number',
                shown: function () {
                    return this.context.col.displayName === 'Company';
                },
                action: function() {
                    alert(this.context.col.displayName);
                }
            }
        ];
        $scope.gridOptions = {
            enableGridMenu: false,
            data: 'data',
            importerDataAddCallback: function ( grid, newObjects ) {
                $scope.data = newObjects;
            },
            onRegisterApi: function(gridApi){
                $scope.gridApi = gridApi;
            }
        };

        var handleFileSelect = function( event ){
            var target = event.srcElement || event.target;

            if (target && target.files && target.files.length === 1) {
                var fileObject = target.files[0];
                $scope.gridApi.importer.importFile( fileObject );
                target.form.reset();
            }
        };

        var fileChooser = document.querySelectorAll('.file-chooser');

        if ( fileChooser.length !== 1 ){
            console.log('Found > 1 or < 1 file choosers within the menu item, error, cannot continue');
        } else {
            fileChooser[0].addEventListener('change', handleFileSelect, false);
        }

    }]);
}());