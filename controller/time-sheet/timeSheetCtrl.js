/**
 * Created by Damith on 9/28/2016.
 */

mainApp.controller('timeSheetCtrl', function ($scope, $http, $interval, uiGridGroupingConstants, userProfileApiAccess, timerServiceAccess) {


    $scope.showAlert = function (tittle, type, msg) {
        new PNotify({
            title: tittle,
            text: msg,
            type: type,
            styling: 'bootstrap3',
            icon: false
        });
    };

    $scope.searchObj = {userId:undefined, startDate:undefined, endDate:undefined};

    $scope.gridOptions = {
        enableSorting: true,
        enableFiltering: true,
        showGridFooter: true,
        showColumnFooter: true,
        columnDefs: [
            {name: 'TicketId', width: '10%', field: 'ticket.tid',grouping: { groupPriority: 1 }},
            {name: 'Subject', width: '40%', field: 'ticket.subject'},
            {name: 'Date', width: '10%', field: 'startTime'},
            { name: 'Duration', width: '25%', field: 'time', treeAggregationType: uiGridGroupingConstants.aggregation.SUM, customTreeAggregationFinalizerFn: function( aggregation ) {
                aggregation.rendered = aggregation.value;
            } }
        ],
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            /*$scope.gridApi.treeBase.on.rowExpanded($scope, function (row) {
                if (row.entity.$$hashKey === $scope.gridOptions.data[50].$$hashKey && !$scope.nodeLoaded) {
                    $interval(function () {
                        $scope.gridOptions.data.splice(51, 0,
                            {
                                name: 'Dynamic 1',
                                gender: 'female',
                                age: 53,
                                company: 'Griddable grids',
                                balance: 38000,
                                $$treeLevel: 1
                            },
                            {
                                name: 'Dynamic 2',
                                gender: 'male',
                                age: 18,
                                company: 'Griddable grids',
                                balance: 29000,
                                $$treeLevel: 1
                            }
                        );
                        $scope.nodeLoaded = true;
                    }, 2000, 1);
                }
            });*/
        }
    };// grid option

    /*$http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/500_complex.json')
        .success(function (data) {
            for (var i = 0; i < data.length; i++) {
                data[i].balance = Number(data[i].balance.slice(1).replace(/,/, ''));
            }
            data[0].$$treeLevel = 0;
            data[1].$$treeLevel = 1;
            data[10].$$treeLevel = 1;
            data[20].$$treeLevel = 0;
            data[25].$$treeLevel = 1;
            data[50].$$treeLevel = 0;
            data[51].$$treeLevel = 0;
            $scope.gridOptions.data = data;
        });*/


    $scope.expandAll = function () {
        $scope.gridApi.treeBase.expandAllRows();
    };

    $scope.toggleRow = function (rowNum) {
        $scope.gridApi.treeBase.toggleRowTreeState($scope.gridApi.grid.renderContainers.body.visibleRowCache[rowNum]);
    };

    $scope.toggleExpandNoChildren = function () {
        $scope.gridOptions.showTreeExpandNoChildren = !$scope.gridOptions.showTreeExpandNoChildren;
        $scope.gridApi.grid.refresh();
    };

    $scope.loadUserData = function(){
        userProfileApiAccess.getUsers().then(function (response) {
            if(response){
                if(response.IsSuccess){
                    $scope.userDataList = response.Result;
                }else{
                    var errMsg = response.CustomMessage;
                    $scope.showAlert('Error', 'error', errMsg);
                }
            }else{
                $scope.showAlert('Error', 'error', 'Load User Data Failed');
            }
        }, function (err) {
            var errMsg = "Get User Data Failed";
            if (err.statusText) {
                errMsg = err.statusText;
            }
            $scope.showAlert('Error', 'error', errMsg);
        });
    };

    $scope.searchSheetData = function(){
        timerServiceAccess.getTimersByUser($scope.searchObj.userId, $scope.searchObj.startDate, $scope.searchObj.endDate).then(function (response) {
            if(response){
                if(response.IsSuccess){
                    if(response.Result) {
                        var gidData = [];
                        for (var i = 0; i < response.Result.length; i++) {
                            var result = response.Result[i];
                            if(result && result.ticket){
                                result.startTime =  moment(result.startTime).format("MM-DD-YYYY");
                                var durationObj = moment.duration(result.time);
                                //result.$$treeLevel = i;
                                result.time = durationObj._data.days+'d::'+durationObj._data.hours+'h::'+durationObj._data.minutes+'m::'+durationObj._data.seconds+'s';
                                gidData.push(result);
                            }
                        }
                        $scope.gridOptions.data = gidData;
                    }
                }else{
                    var errMsg = response.CustomMessage;
                    $scope.showAlert('Error', 'error', errMsg);
                }
            }else{
                $scope.showAlert('Error', 'error', 'Load User Data Failed');
            }
        }, function (err) {
            var errMsg = "Search Timers Failed";
            if (err.statusText) {
                errMsg = err.statusText;
            }
            $scope.showAlert('Error', 'error', errMsg);
        });
    };

    $scope.loadUserData();

});






















app.controller('MainCtrl', ['$scope', '$http', '$interval', 'uiGridGroupingConstants', function ($scope, $http, $interval, uiGridGroupingConstants ) {
    $scope.gridOptions = {
        enableFiltering: true,
        treeRowHeaderAlwaysVisible: false,
        columnDefs: [
            { name: 'name', width: '30%' },
            { name: 'gender', grouping: { groupPriority: 1 }, sort: { priority: 1, direction: 'asc' }, width: '20%', cellFilter: 'mapGender' },
            { name: 'age', treeAggregationType: uiGridGroupingConstants.aggregation.MAX, width: '20%' },
            { name: 'company', width: '25%' },
            { name: 'registered', width: '40%', cellFilter: 'date', type: 'date' },
            { name: 'state', grouping: { groupPriority: 0 }, sort: { priority: 0, direction: 'desc' }, width: '35%', cellTemplate: '<div><div ng-if="!col.grouping || col.grouping.groupPriority === undefined || col.grouping.groupPriority === null || ( row.groupHeader && col.grouping.groupPriority === row.treeLevel )" class="ui-grid-cell-contents" title="TOOLTIP">{{COL_FIELD CUSTOM_FILTERS}}</div></div>' },
            { name: 'balance', width: '25%', cellFilter: 'currency', treeAggregationType: uiGridGroupingConstants.aggregation.SUM, customTreeAggregationFinalizerFn: function( aggregation ) {
                aggregation.rendered = aggregation.value;
            } }
        ],
        onRegisterApi: function( gridApi ) {
            $scope.gridApi = gridApi;
        }
    };

    $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/500_complex.json')
        .success(function(data) {
            for ( var i = 0; i < data.length; i++ ){
                var registeredDate = new Date( data[i].registered );
                data[i].state = data[i].address.state;
                data[i].gender = data[i].gender === 'male' ? 1: 2;
                data[i].balance = Number( data[i].balance.slice(1).replace(/,/,'') );
                data[i].registered = new Date( registeredDate.getFullYear(), registeredDate.getMonth(), 1 )
            }
            delete data[2].age;
            $scope.gridOptions.data = data;
        });

    $scope.expandAll = function(){
        $scope.gridApi.treeBase.expandAllRows();
    };

    $scope.toggleRow = function( rowNum ){
        $scope.gridApi.treeBase.toggleRowTreeState($scope.gridApi.grid.renderContainers.body.visibleRowCache[rowNum]);
    };

    $scope.changeGrouping = function() {
        $scope.gridApi.grouping.clearGrouping();
        $scope.gridApi.grouping.groupColumn('age');
        $scope.gridApi.grouping.aggregateColumn('state', uiGridGroupingConstants.aggregation.COUNT);
    };

    $scope.getAggregates = function() {
        var aggregatesTree = [];
        var gender

        var recursiveExtract = function( treeChildren ) {
            return treeChildren.map( function( node ) {
                var newNode = {};
                angular.forEach(node.row.entity, function( attributeCol ) {
                    if( typeof(attributeCol.groupVal) !== 'undefined' ) {
                        newNode.groupVal = attributeCol.groupVal;
                        newNode.aggVal = attributeCol.value;
                    }
                });
                newNode.otherAggregations = node.aggregations.map( function( aggregation ) {
                    return { colName: aggregation.col.name, value: aggregation.value, type: aggregation.type };
                });
                if( node.children ) {
                    newNode.children = recursiveExtract( node.children );
                }
                return newNode;
            });
        }

        aggregatesTree = recursiveExtract( $scope.gridApi.grid.treeBase.tree );

        console.log(aggregatesTree);
    };
}])
    .filter('mapGender', function() {
        var genderHash = {
            1: 'male',
            2: 'female'
        };

        return function(input) {
            var result;
            var match;
            if (!input){
                return '';
            } else if (result = genderHash[input]) {
                return result;
            } else if ( ( match = input.match(/(.+)( \(\d+\))/) ) && ( result = genderHash[match[1]] ) ) {
                return result + match[2];
            } else {
                return input;
            }
        };
    });