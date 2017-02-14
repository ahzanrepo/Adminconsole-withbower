/**
 * Created by Heshan.i on 2/8/2017.
 */

(function(){

    var app =angular.module('veeryConsoleApp');


    var numberUploadController = function ($scope, $q, campaignNumberApiAccess, loginService) {
        $scope.campaignNumberObj = {};
        $scope.numberCategory = {};

        $scope.data = [];
        $scope.headerData = [];
        $scope.selectObj = {};
        $scope.campaignNumberObj.Contacts = [];
        $scope.enablePreviewData = false;

        $scope.reset = function() {
            $scope.selectObj = {};
            $scope.headerData = [];
            $scope.campaignNumberObj.Contacts = [];
            $scope.gridOptions.data = [];
            $scope.gridOptions.columnDefs = [];
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
            campaignNumberApiAccess.CreateNumberCategory($scope.numberCategory).then(function(response){
                if(response.IsSuccess)
                {
                    $scope.campaignCategories.push(response.Result);
                    $scope.showAlert('Campaign Number Upload', 'Create Number Category Success', 'success');
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
                var errMsg = "Error occurred while creating number category";
                if(err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Campaign Number Upload', errMsg, 'error');
            });
        };




        $scope.loadCampaignCategories();


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

        $scope.loadCampaignSchedules = function(){
            if($scope.campaignNumberObj) {
                var campaignId = $scope.campaignNumberObj.CampaignId;
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

        $scope.uploadNumbers = function(){
            campaignNumberApiAccess.UploadNumbers($scope.campaignNumberObj).then(function(response){
                if(response.IsSuccess)
                {
                    $scope.showAlert('Campaign Number Upload', 'Upload Success', 'success');
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
                var errMsg = "Error occurred while uploading numbers";
                if(err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Campaign Number Upload', errMsg, 'error');
            });
        };
    };

    app.controller('numberUploadController', numberUploadController);
}());