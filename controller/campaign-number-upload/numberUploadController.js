/**
 * Created by Heshan.i on 2/8/2017.
 */

(function(){

    //var app =angular.module('veeryConsoleApp');


    var numberUploadController = function ($scope, $q, campaignNumberApiAccess, loginService, $timeout) {
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

        $scope.campaignNumberObj = {};
        $scope.numberCategory = {};

        $scope.data = [];
        $scope.headerData = [];
        $scope.selectObj = {};
        $scope.campaignNumberObj.Contacts = [];
        $scope.enablePreviewData = false;
        $scope.showUpload = false;
        $scope.uploadState = "Show Upload";
        $scope.numberProgress = 0;
        $scope.uploadButtonValue = "Upload";


        $scope.searchObj = {};
        $scope.isTableLoading = 2;
        $scope.selectedCustomerTags = [];

        $scope.showAlert = function (title,content,type) {
            new PNotify({
                title: title,
                text: content,
                type: type,
                styling: 'bootstrap3'
            });
        };

        $scope.switchUpload = function(){
            $scope.showUpload = !$scope.showUpload;
            if($scope.showUpload){
                $scope.uploadState = "Show Number Base";
            }else{
                $scope.uploadState = "Show Upload";
            }
        };

        $scope.reset = function() {
            $scope.safeApply(function() {
                $scope.target.form.reset();
                $scope.selectObj = {};
                $scope.headerData = [];
                $scope.campaignNumberObj.Contacts = [];
                $scope.gridOptions.data = [];
                $scope.gridOptions.columnDefs = [];
                $scope.numberProgress = 0;
                $scope.uploadButtonValue = "Upload";
            });

        };

        $('.collapse-link').on('click', function() {
            var $BOX_PANEL = $(this).closest('.x_panel'),
                $ICON = $(this).find('i'),
                $BOX_CONTENT = $BOX_PANEL.find('.x_content');

            // fix for some div with hardcoded fix class
            if ($BOX_PANEL.attr('style')) {
                $BOX_CONTENT.slideToggle(200, function(){
                    $BOX_PANEL.removeAttr('style');
                });
            } else {
                $BOX_CONTENT.slideToggle(200);
                $BOX_PANEL.css('height', 'auto');
            }

            $ICON.toggleClass('fa-chevron-up fa-chevron-down');
        });


        //--------------------------------------------------Number Upload Grid-------------------------------------

        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(cTag) {
                return (cTag.name.toLowerCase().indexOf(lowercaseQuery) != -1);

            };
        }

        $scope.querySearch = function (query) {
            if (query === "*" || query === "") {
                if ($scope.customerTags) {
                    return $scope.customerTags;
                }
                else {
                    return [];
                }

            }
            else {
                var results = query ? $scope.customerTags.filter(createFilterFor(query)) : [];
                return results;
            }

        };

        $scope.onChipAdd = function (chip) {

            $scope.selectedCustomerTags.push(chip.name);

        };
        $scope.onChipDelete = function (chip) {

            var index = $scope.selectedCustomerTags.indexOf(chip.name);
            if (index > -1) {
                $scope.selectedCustomerTags.splice(index, 1);
            }


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
            $scope.campaignNumberObj.Contacts = [];


            var promise = validateNumbers($scope.data, $scope.selectObj.name);
            promise.then(function(numbers) {
                $scope.campaignNumberObj.Contacts = numbers;
            });
        };

        $scope.gridOptions = {
            enableGridMenu: false,
            data: 'data',
            importerDataAddCallback: function ( grid, newObjects ) {
                $scope.data = newObjects;
            },
            onRegisterApi: function(gridApi){
                $scope.gridApi = gridApi;
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
            $scope.target = target;

            if (target && target.files && target.files.length === 1) {
                var fileObject = target.files[0];
                $scope.gridApi.importer.importFile( fileObject );
                //target.form.reset();
            }
        };

        var fileChooser = document.querySelectorAll('.file-chooser');

        if ( fileChooser.length !== 1 ){
            console.log('Found > 1 or < 1 file choosers within the menu item, error, cannot continue');
        } else {
            fileChooser[0].addEventListener('change', handleFileSelect, false);
        }


        var loadCustomersByTags = function(){
            $scope.headerData = [];
            campaignNumberApiAccess.GetCustomersByTags($scope.selectedCustomerTags).then(function(response){
                if(response.IsSuccess)
                {
                    var externalUserResult = response.Result;
                    $scope.data = externalUserResult.map(function(eur){
                        return{
                            ExternalUser: eur.firstname+ " "+eur.lastname,
                            Number: eur.phone
                        };
                    });

                    $scope.headerData.push({name: 'ExternalUser', index: 0});
                    $scope.headerData.push({name: 'Number', index: 1});
                    console.log($scope.data);
                }
                else
                {
                    var errMsg = response.CustomMessage;

                    if(response.Exception)
                    {
                        errMsg = response.Exception.Message;
                    }
                    $scope.showAlert('Campaign Number Upload', errMsg, 'error');
                }
            }, function(err){
                loginService.isCheckResponse(err);
                var errMsg = "Error occurred while loading numbers from profile";
                if(err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Campaign Number Upload', errMsg, 'error');
            });
        };

        var loadCustomers = function(){
            $scope.headerData = [];
            campaignNumberApiAccess.GetCustomers().then(function(response){
                if(response.IsSuccess)
                {
                    var externalUserResult = response.Result;
                    $scope.data = externalUserResult.map(function(eur){
                        return{
                            ExternalUser: eur.firstname+ " "+eur.lastname,
                            Number: eur.phone
                        };
                    });

                    $scope.headerData.push({name: 'ExternalUser', index: 0});
                    $scope.headerData.push({name: 'Number', index: 1});
                    console.log($scope.data);
                }
                else
                {
                    var errMsg = response.CustomMessage;

                    if(response.Exception)
                    {
                        errMsg = response.Exception.Message;
                    }
                    $scope.showAlert('Campaign Number Upload', errMsg, 'error');
                }
            }, function(err){
                loginService.isCheckResponse(err);
                var errMsg = "Error occurred while loading numbers from profile";
                if(err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Campaign Number Upload', errMsg, 'error');
            });
        };

        $scope.searchFromProfile = function(){
            if($scope.selectedCustomerTags && $scope.selectedCustomerTags.length > 0){
                loadCustomersByTags();
            }else{
                loadCustomers();
            }
        };


        //--------------------------------Number Base Grid---------------------------------------------------


        $scope.gridOptions3 = {
            enableSorting: true,
            enableFiltering: true,
            treeRowHeaderAlwaysVisible: true,
            onRegisterApi: function( gridApi ) {
                $scope.gridApi3 = gridApi;
            }
        };



        //-----------------------CampaignCategory---------------------------------------

        $scope.loadCampaignCategories = function(){
            campaignNumberApiAccess.GetNumberCategories().then(function(response){
                if(response.IsSuccess)
                {
                    $scope.campaignCategories = response.Result;
                }
                else
                {
                    var errMsg = response.CustomMessage;

                    if(response.Exception)
                    {
                        errMsg = response.Exception.Message;
                    }
                    $scope.showAlert('Campaign Number Upload', errMsg, 'error');
                }
            }, function(err){
                loginService.isCheckResponse(err);
                var errMsg = "Error occurred while loading number categories";
                if(err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Campaign Number Upload', errMsg, 'error');
            });
        };

        $scope.createCampaignCategories = function(){
            if(typeof $scope.campaignNumberObj.CategoryID ==="string") {
                var reqData = {CategoryName: $scope.campaignNumberObj.CategoryID};
                campaignNumberApiAccess.CreateNumberCategory(reqData).then(function (response) {
                    if (response.IsSuccess) {
                        $scope.campaignCategories.push(response.Result);
                        $scope.showAlert('Campaign Number Upload', 'Create Number Category Success', 'success');
                    }
                    else {
                        var errMsg = response.CustomMessage;

                        if (response.Exception) {
                            errMsg = response.Exception.Message;
                        }
                        $scope.showAlert('Campaign Number Upload', errMsg, 'error');
                    }
                }, function (err) {
                    loginService.isCheckResponse(err);
                    var errMsg = "Error occurred while creating number category";
                    if (err.statusText) {
                        errMsg = err.statusText;
                    }
                    $scope.showAlert('Campaign Number Upload', errMsg, 'error');
                });
            }
        };

        $scope.loadCustomerTags = function(){
            campaignNumberApiAccess.GetCustomersTags().then(function (response) {
                if (response.IsSuccess) {
                    $scope.customerTags = response.Result;
                }
                else {
                    var errMsg = response.CustomMessage;
                     if (response.Exception) {
                         errMsg = response.Exception.Message;
                     }
                    $scope.showAlert('Campaign Number Upload', errMsg, 'error');
                }
            }, function (err) {
                loginService.isCheckResponse(err);
                var errMsg = "Error occurred while loading customer tags";
                if (err.statusText) {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Campaign Number Upload', errMsg, 'error');
            });
        };

        $scope.loadCampaignCategories();
        $scope.loadCustomerTags();


        //-----------------------Campaign---------------------------------------

        $scope.loadNewlyCreatedCampaigns = function(){
            campaignNumberApiAccess.GetNewlyCreatedCampaigns().then(function(response){
                if(response.IsSuccess)
                {
                    $scope.newlyCreatedCampaigns = response.Result;
                }
                else
                {
                    var errMsg = response.CustomMessage;

                    if(response.Exception)
                    {
                        errMsg = response.Exception.Message;
                    }
                    $scope.showAlert('Campaign Number Upload', errMsg, 'error');
                }
            }, function(err){
                loginService.isCheckResponse(err);
                var errMsg = "Error occurred while loading campaigns";
                if(err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Campaign Number Upload', errMsg, 'error');
            });
        };

        $scope.loadCampaignSchedules = function(campaignId){
            if($scope.campaignNumberObj) {
                $scope.campaignSchedules = [];
                $scope.enablePreviewData = false;
                if (campaignId) {
                    for (var i = 0; i < $scope.newlyCreatedCampaigns.length; i++) {
                        var newCamp = $scope.newlyCreatedCampaigns[i];
                        if (newCamp.CampaignId.toString() === campaignId) {
                            $scope.campaignSchedules = newCamp.CampScheduleInfo;
                            if(newCamp.CampaignChannel.toLowerCase() === 'call' && newCamp.DialoutMechanism.toLowerCase() === 'preview'){
                                $scope.enablePreviewData = true;
                            }
                            break;
                        }
                    }
                    //campaignNumberApiAccess.GetCampaignSchedule(campaignId).then(function (response) {
                    //    if (response.IsSuccess) {
                    //        $scope.campaignSchedules = response.Result;
                    //    }
                    //    else {
                    //        var errMsg = response.CustomMessage;
                    //
                    //        if (response.Exception) {
                    //            errMsg = response.Exception.Message;
                    //        }
                    //        $scope.showAlert('Campaign Number Upload', errMsg, 'error');
                    //    }
                    //}, function (err) {
                    //    loginService.isCheckResponse(err);
                    //    var errMsg = "Error occurred while loading campaign schedules";
                    //    if (err.statusText) {
                    //        errMsg = err.statusText;
                    //    }
                    //    $scope.showAlert('Campaign Number Upload', errMsg, 'error');
                    //});
                }
            }
        };

        $scope.loadNewlyCreatedCampaigns();



        //-----------------------Campaign Numbers---------------------------------------

        var batchedHTTP = function(items, current) {

            if (items.length < current) {
                return;
            }

            var end = current + 1;
            var execPromises = items.slice(current, end);

            //$q.all(execPromises).then(function (response) {
            //    $scope.numberProgress = Math.ceil((end / items.length)*100);
            //    batchedHTTP(items, end);
            //});

            execPromises[0].then(function (response) {
                $scope.numberProgress = Math.ceil((end / items.length)*100);
                batchedHTTP(items, end);
            });
        };

        $scope.uploadNumbers = function(){
            if(typeof $scope.campaignNumberObj.CategoryID === "number") {
                if($scope.campaignNumberObj && $scope.campaignNumberObj.Contacts.length > 0) {
                    $scope.numberProgress = 0;
                    var numberCount = $scope.campaignNumberObj.Contacts.length;
                    var numOfIterations = Math.ceil(numberCount / 1000);
                    var funcArray = [];

                    var numberArray = [];

                    for (var i = 0; i < numOfIterations; i++) {
                        var start = i * 1000;
                        var end = (i * 1000) + 1000;
                        var numberChunk = $scope.campaignNumberObj.Contacts.slice(start, end);

                        var sendObj = {
                            CampaignId: $scope.campaignNumberObj.CampaignId,
                            CamScheduleId: $scope.campaignNumberObj.CamScheduleId,
                            CategoryID: $scope.campaignNumberObj.CategoryID,
                            Contacts: numberChunk
                        };
                        numberArray.push(sendObj);
                    }

                    $scope.uploadButtonValue = "Uploading...";

                    $scope.BatchUploader(numberArray).then(function () {

                        console.log("Upload done ..................");
                        $scope.reset();
                        $scope.showAlert('Campaign Number Upload', 'Numbers uploaded successfully', 'success');
                    }, function (reason) {

                    });
                }else{
                    $scope.showAlert('Campaign Number Upload', 'Please select number column before upload', 'error');
                }
            }else{
                $scope.showAlert('Campaign Number Upload', 'Add number category before use', 'error');
            }

        };



        $scope.BatchUploader =function(array){
            var index = 0;


            return new Promise(function(resolve, reject) {

                function next() {
                    $scope.numberProgress = Math.ceil((index / array.length)*100);
                    if (index < array.length) {
                        campaignNumberApiAccess.UploadNumbers(array[index++]).then(next, reject);
                    } else {
                        resolve();
                    }
                }
                next();
            });
        };


        var searchNumbersByCategories = function(){
            $scope.gridOptions3.data = [];
            $scope.gridOptions3.columnDefs = [];
            $scope.isTableLoading = 0;

            campaignNumberApiAccess.GetNumbersByCategory($scope.searchObj.CategoryID).then(function(response){
                if(response.IsSuccess)
                {
                    if(response.Result && response.Result.CampContactInfo && response.Result.CampContactInfo.length >0){
                        $scope.gridOptions3.data = response.Result.CampContactInfo.map(function(contact){

                            return contact;

                        });
                        $scope.isTableLoading = 1;
                    }else{
                        $scope.isTableLoading = 2;
                    }

                }
                else
                {
                    $scope.isTableLoading = 2;
                    var errMsg = response.CustomMessage;

                    if(response.Exception)
                    {
                        errMsg = response.Exception.Message;
                    }
                    $scope.showAlert('Number Base', errMsg, 'error');
                }
            }, function(err){
                $scope.isTableLoading = 2;
                loginService.isCheckResponse(err);
                var errMsg = "Error occurred while loading numbers";
                if(err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Number Base', errMsg, 'error');
            });
        };

        var searchNumbersByCampaignAndSchedule = function(){
            $scope.gridOptions3.data = [];
            $scope.gridOptions3.columnDefs = [];
            $scope.isTableLoading = 0;

            campaignNumberApiAccess.GetNumbersByCampaignAndSchedule($scope.searchObj.CampaignId, $scope.searchObj.CamScheduleId).then(function(response){
                if(response.IsSuccess)
                {
                    if(response.Result && response.Result.length >0){
                        $scope.gridOptions3.data = response.Result.map(function(contact){

                            return {ContactId: contact.CampContactInfo.ContactId, ExtraData: contact.ExtraData};

                        });
                        $scope.isTableLoading = 1;
                    }else{
                        $scope.isTableLoading = 2;
                    }

                }
                else
                {
                    $scope.isTableLoading = 2;
                    var errMsg = response.CustomMessage;

                    if(response.Exception)
                    {
                        errMsg = response.Exception.Message;
                    }
                    $scope.showAlert('Number Base', errMsg, 'error');
                }
            }, function(err){
                $scope.isTableLoading = 2;
                loginService.isCheckResponse(err);
                var errMsg = "Error occurred while loading numbers";
                if(err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Number Base', errMsg, 'error');
            });
        };

        var searchNumbersByCampaign = function(){
            $scope.gridOptions3.data = [];
            $scope.gridOptions3.columnDefs = [];
            $scope.isTableLoading = 0;

            campaignNumberApiAccess.GetNumbersByCampaign($scope.searchObj.CampaignId).then(function(response){
                if(response.IsSuccess)
                {
                    if(response.Result && response.Result.length >0){
                        $scope.gridOptions3.data = response.Result.map(function(contact){

                            return {ContactId: contact.CampContactInfo.ContactId, ExtraData: contact.ExtraData};

                        });
                        $scope.isTableLoading = 1;
                    }else{
                        $scope.isTableLoading = 2;
                    }

                }
                else
                {
                    $scope.isTableLoading = 2;
                    var errMsg = response.CustomMessage;

                    if(response.Exception)
                    {
                        errMsg = response.Exception.Message;
                    }
                    $scope.showAlert('Number Base', errMsg, 'error');
                }
            }, function(err){
                $scope.isTableLoading = 2;
                loginService.isCheckResponse(err);
                var errMsg = "Error occurred while loading numbers";
                if(err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Number Base', errMsg, 'error');
            });
        };


        $scope.searchNumbers = function () {
            if ($scope.searchObj.CampaignId) {
                if ($scope.searchObj.CamScheduleId) {
                    searchNumbersByCampaignAndSchedule();
                }
                else {
                    searchNumbersByCampaign();
                }
            }
            else {
                searchNumbersByCategories();
            }
        };

    };

    mainApp.controller('numberUploadController', numberUploadController);
}());