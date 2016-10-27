/**
 * Created by dinusha on 6/12/2016.
 */
(function ()
{
    var app = angular.module("veeryConsoleApp");

    var myNumbersCtrl = function ($scope, phnNumApiAccess, voxboneApi)
    {

        $scope.showAlert = function (title, type, content) {

            new PNotify({
                title: title,
                text: content,
                type: type,
                styling: 'bootstrap3'
            });
        };



        $scope.newDropDownState = false;
        $scope.newDropDownStatePhoneNum = false;
        $scope.currentTrunk = {};

        $scope.pressNewButtonPhoneNum = function()
        {
            if(!$scope.newDropDownStatePhoneNum)
            {
                $scope.newDropDownStatePhoneNum = true;
            }
        };

        $scope.pressNewButton = function()
        {
            if(!$scope.newDropDownState)
            {
                $scope.newDropDownState = true;
            }
        };

        $scope.pressCancelButton = function()
        {
            $scope.newDropDownState = false;
        };

        $scope.pressCancelButtonPhoneNum = function()
        {
            $scope.newDropDownStatePhoneNum = false;
        };

        $scope.phnNum = {};
        $scope.searchCriteria = "";

        var resetForm = function()
        {
            $scope.phnNum = {};
            $scope.currentTrunk = {};
            $scope.searchCriteria = "";
        };

        var resetTrunkForm = function()
        {
            $scope.currentTrunk = {};
            $scope.searchCriteria = "";
        };

        var getLimits = function()
        {
            phnNumApiAccess.getLimits().then(function(data)
            {
                if(data.IsSuccess)
                {
                    $scope.limitList = data.Result;
                }
                else
                {
                    var errMsg = data.CustomMessage;

                    if(data.Exception)
                    {
                        errMsg = data.Exception.Message;
                    }
                    $scope.showAlert('Error', 'error', errMsg);

                }

            }, function(err)
            {
                var errMsg = "Error occurred while loading limits";
                if(err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Error', 'error', errMsg);
            });
        };

        $scope.updateTrunk = function(trunk)
        {
            phnNumApiAccess.updateTrunk(trunk.EditData.id, trunk.EditData).then(function(data)
            {
                if(data.IsSuccess)
                {
                    $scope.showAlert('Success', 'success', 'Phone number added');

                    if(data.Result)
                    {
                        trunk.TrunkName = data.Result.TrunkName;
                        trunk.IpUrl = data.Result.IpUrl;
                        trunk.TranslationId = data.Result.TranslationId;

                        trunk.Enabled = data.Result.Enabled;
                    }

                }
                else
                {
                    var errMsg = "";
                    if(data.Exception && data.Exception.Message)
                    {
                        errMsg = data.Exception.Message;
                    }

                    if(data.CustomMessage)
                    {
                        errMsg = data.CustomMessage;
                    }
                    $scope.showAlert('Error', 'error', errMsg);
                }

            }, function(err)
            {
                var errMsg = "Error updating trunk";
                if(err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Error', 'error', errMsg);
            });
        };

        var loadNumbers = function()
        {
            $scope.myNumList = [];

            phnNumApiAccess.getMyNumbers().then(function(data)
            {
                if(data.IsSuccess)
                {
                    data.Result.forEach(function(phn)
                    {
                        phn.EditData = angular.copy(phn);
                    });
                    $scope.myNumList = data.Result;
                }
                else
                {
                    var errMsg = data.CustomMessage;

                    if(data.Exception)
                    {
                        errMsg = data.Exception.Message;
                    }
                    $scope.showAlert('Error', 'error', errMsg);

                }

            }, function(err)
            {
                var errMsg = "Error occurred while loading numbers";
                if(err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Error', 'error', errMsg);
            });
        };


        $scope.trunkEditMode = function(trunk, mode)
        {
            if(mode === 1)
            {
                if(trunk.OpenStatus === 1)
                {
                    trunk.OpenStatus = 0;
                }
                else
                {
                    trunk.OpenStatus = 1;
                }
            }

            if(mode === 2)
            {
                if(trunk.OpenStatus === 2)
                {
                    trunk.OpenStatus = 0;
                }
                else
                {
                    trunk.OpenStatus = 2;

                    //get ip addresses
                    trunk.IpRangeData = {};
                    loadIpAddresses(trunk);
                }
            }


        };

        $scope.phoneEditMode = function(phone)
        {
            if(phone.OpenStatus === 1)
            {
                phone.OpenStatus = 0;
            }
            else
            {
                phone.OpenStatus = 1;
            }


        };

        $scope.addIpAddress = function(trunk)
        {
            phnNumApiAccess.addTrunkIpAddress(trunk.id, trunk.IpRangeData).then(function(data)
            {
                if(data.IsSuccess)
                {
                    $scope.showAlert('Success', 'success', 'Ip address added');

                    loadIpAddresses(trunk);

                    trunk.IpRangeData = {};
                }
                else
                {
                    var errMsg = "";
                    if(data.Exception && data.Exception.Message)
                    {
                        errMsg = data.Exception.Message;
                    }

                    if(data.CustomMessage)
                    {
                        errMsg = data.CustomMessage;
                    }
                    $scope.showAlert('Error', 'error', errMsg);
                }

            }, function(err)
            {
                var errMsg = "Error adding ip address";
                if(err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Error', 'error', errMsg);
            });
        };

        $scope.ipAddressDelete = function(trunk, trunkIpObj)
        {
            phnNumApiAccess.removeTrunkIpAddress(trunk, trunkIpObj.id).then(function(data)
            {
                if(data.IsSuccess)
                {
                    $scope.showAlert('Success', 'success', 'Ip address deleted');

                    loadIpAddresses(trunk);

                    trunk.IpRangeData = {};
                }
                else
                {
                    var errMsg = "";
                    if(data.Exception && data.Exception.Message)
                    {
                        errMsg = data.Exception.Message;
                    }

                    if(data.CustomMessage)
                    {
                        errMsg = data.CustomMessage;
                    }
                    $scope.showAlert('Error', 'error', errMsg);
                    loadIpAddresses(trunk);
                }

            }, function(err)
            {
                var errMsg = "Error adding ip address";
                if(err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Error', 'error', errMsg);
                loadIpAddresses(trunk);
            });

            return false;
        };


        $scope.phoneNumberDelete = function(number)
        {

            new PNotify({
                title: 'Confirm deletion',
                text: 'Are you sure you want to delete phone number ?',
                type: 'warn',
                hide: false,
                confirm: {
                    confirm: true
                },
                buttons: {
                    closer: false,
                    sticker: false
                },
                history: {
                    history: false
                }
            }).get().on('pnotify.confirm', function()
                {
                    phnNumApiAccess.removeTrunkNumber(number.PhoneNumber).then(function(data)
                    {
                        if(data.IsSuccess)
                        {
                            $scope.showAlert('Success', 'success', 'Ip address deleted');

                            loadNumbers();
                        }
                        else
                        {
                            var errMsg = "";
                            if(data.Exception && data.Exception.Message)
                            {
                                errMsg = data.Exception.Message;
                            }

                            if(data.CustomMessage)
                            {
                                errMsg = data.CustomMessage;
                            }
                            $scope.showAlert('Error', 'error', errMsg);
                        }

                    }, function(err)
                    {
                        var errMsg = "Error deleting phone number";
                        if(err.statusText)
                        {
                            errMsg = err.statusText;
                        }
                        $scope.showAlert('Error', 'error', errMsg);
                    });
                }).on('pnotify.cancel', function() {

                });


            return false;
        };

        $scope.tagAdding = function(tag)
        {
            return false;
        };

        var loadIpAddresses = function(trunk)
        {
            trunk.IpAddressList = [];
            phnNumApiAccess.getTrunkIpAddresses(trunk.id).then(function(data)
            {
                if(data.IsSuccess)
                {
                    if(data.Result)
                    {


                        trunk.IpAddressList = data.Result.map(function(ip){
                            newIpAddressObj = ip;
                            newIpAddressObj.DisplayValue = ip.IpAddress + '/' + ip.Mask;
                            return newIpAddressObj;
                        });
                    }

                    //$scope.trunkList = data.Result;
                }
                else
                {
                    var errMsg = data.CustomMessage;

                    if(data.Exception)
                    {
                        errMsg = data.Exception.Message;
                    }
                    $scope.showAlert('Error', 'error', errMsg);

                }

            }, function(err)
            {
                var errMsg = "Error occurred while loading trunk ip addresses";
                if(err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Error', 'error', errMsg);
            });
        };

        var loadTrunks = function()
        {
            $scope.trunkList = [];
            phnNumApiAccess.getTrunks().then(function(data)
            {
                if(data.IsSuccess)
                {
                    data.Result.forEach(function(trunk)
                    {
                        trunk.EditData = angular.copy(trunk);
                    });
                    $scope.trunkList = data.Result;
                }
                else
                {
                    var errMsg = data.CustomMessage;

                    if(data.Exception)
                    {
                        errMsg = data.Exception.Message;
                    }
                    $scope.showAlert('Error', 'error', errMsg);

                }

            }, function(err)
            {
                var errMsg = "Error occurred while loading trunks";
                if(err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Error', 'error', errMsg);
            });
        };

        var loadTranslations = function()
        {
            phnNumApiAccess.getTranslations().then(function(data)
            {
                if(data.IsSuccess)
                {
                    $scope.transList = data.Result;
                }
                else
                {
                    var errMsg = data.CustomMessage;

                    if(data.Exception)
                    {
                        errMsg = data.Exception.Message;
                    }
                    $scope.showAlert('Error', 'error', errMsg);

                }

            }, function(err)
            {
                var errMsg = "Error occurred while loading translations";
                if(err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Error', 'error', errMsg);
            });
        };

        $scope.addNewTrunk = function()
        {
            phnNumApiAccess.addNewTrunk($scope.currentTrunk).then(function(data)
            {
                if(data.IsSuccess)
                {
                    $scope.showAlert('Success', 'success', 'Phone number added');

                    resetTrunkForm();

                    loadTrunks();
                }
                else
                {
                    var errMsg = "";
                    if(data.Exception && data.Exception.Message)
                    {
                        errMsg = data.Exception.Message;
                    }

                    if(data.CustomMessage)
                    {
                        errMsg = data.CustomMessage;
                    }
                    $scope.showAlert('Error', 'error', errMsg);
                }

            }, function(err)
            {
                var errMsg = "Error saving trunk";
                if(err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Error', 'error', errMsg);
            });
        };

        $scope.addNewNumber = function()
        {

            phnNumApiAccess.savePhoneNumber($scope.phnNum).then(function(data)
            {
                if(data.IsSuccess)
                {
                    $scope.showAlert('Success', 'success', 'Phone number added');

                    resetForm();

                    loadNumbers();
                }
                else
                {
                    var errMsg = "";
                    if(data.Exception && data.Exception.Message)
                    {
                        errMsg = data.Exception.Message;
                    }

                    if(data.CustomMessage)
                    {
                        errMsg = data.CustomMessage;
                    }
                    $scope.showAlert('Error', 'error', errMsg);
                }

            }, function(err)
            {
                var errMsg = "Error saving phone number";
                if(err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Error', 'error', errMsg);
            });
        };

        $scope.updateNumber = function(phnNum)
        {

            phnNumApiAccess.updatePhoneNumber(phnNum.EditData).then(function(data)
            {
                if(data.IsSuccess)
                {
                    $scope.showAlert('Success', 'success', 'Phone number updated');

                    if(data.Result)
                    {
                        phnNum.ObjCategory = data.Result.ObjCategory;
                        phnNum.Enable = data.Result.Enable;
                        phnNum.TrunkId = data.Result.TrunkId;
                        phnNum.InboundLimitId = data.Result.InboundLimitId;
                        phnNum.OutboundLimitId = data.Result.OutboundLimitId;
                        phnNum.BothLimitId = data.Result.BothLimitId;
                    }
                }
                else
                {
                    var errMsg = "";
                    if(data.Exception && data.Exception.Message)
                    {
                        errMsg = data.Exception.Message;
                    }

                    if(data.CustomMessage)
                    {
                        errMsg = data.CustomMessage;
                    }
                    $scope.showAlert('Error', 'error', errMsg);
                }

            }, function(err)
            {
                var errMsg = "Error saving phone number";
                if(err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Error', 'error', errMsg);
            });
        };


        loadTranslations();
        loadTrunks();
        loadNumbers();
        getLimits();

        //voxboneNumber

        $scope.order = undefined;
        $scope.selected = undefined;

        $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

        $scope.modelOptions = {
            debounce: {
                default: 500,
                blur: 250
            },
            getterSetter: true
        };

        $scope.clearOrder = function(){
            $scope.order = {countryCodeA3:$scope.order.countryCodeA3};
        };

        $scope.initiateOrder = function(){
            voxboneApi.OrderDid('', $scope.order).then(function(response){
                if(response.IsSuccess)
                {
                    var jResult = JSON.parse(response.Result);
                    var result = jResult.productCheckoutList[0];
                    $scope.showAlert("Voxbone", "success", result.message);
                }
                else
                {
                    if(Array.isArray(response.Result)){
                        $scope.showAlert("Voxbone", 'error', response.Result[0].apiErrorMessage);
                    }else {
                        var errMsg = response.CustomMessage;

                        if(response.Exception)
                        {
                            errMsg = response.Exception.Message;
                        }
                        $scope.showAlert("Voxbone", 'error', errMsg);
                    }
                }
            }, function(err){
                var errMsg = "Error occurred while initiate order";
                if(err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Voxbone', 'error', errMsg);
            });
        };

        $scope.loadCountryCodes = function(){
            voxboneApi.GetCountryCodes('', 0, 500).then(function(response){
                if(response.IsSuccess)
                {
                    var jResult = JSON.parse(response.Result);
                    $scope.countries = jResult.countries;
                    $scope.autoCompletePlaceHolder = "Select Your Country";
                    $scope.countries.map( function (country) {
                        return {
                            country: country
                        };
                    });
                }
                else
                {
                    if(Array.isArray(response.Result)){
                        $scope.showAlert("Voxbone", 'error', response.Result[0].apiErrorMessage);
                    }else {
                        var errMsg = response.CustomMessage;

                        if(response.Exception)
                        {
                            errMsg = response.Exception.Message;
                        }
                        $scope.showAlert("Voxbone", 'error', errMsg);
                    }
                }
            }, function(err){
                var errMsg = "Error occurred while loading Country Codes";
                if(err.statusText)
                {
                    errMsg = err.statusText;
                }
                $scope.showAlert('Voxbone', 'error', errMsg);
            });
        };
        //$scope.loadCountryCodes();

    };



    app.controller("myNumbersCtrl", myNumbersCtrl);
}());
