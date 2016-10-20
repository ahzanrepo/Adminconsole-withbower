/**
 * Created by dinusha on 6/12/2016.
 */
(function ()
{
    var app = angular.module("veeryConsoleApp");

    var myNumbersCtrl = function ($scope, phnNumApiAccess, authService)
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
            var token = authService.GetToken();
            phnNumApiAccess.getLimits(token).then(function(data)
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

        var loadNumbers = function()
        {
            var token = authService.GetToken();
            phnNumApiAccess.getMyNumbers(token).then(function(data)
            {
                if(data.IsSuccess)
                {
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

        var loadTrunks = function()
        {
            $scope.trunkList = [];
            phnNumApiAccess.getTrunks().then(function(data)
            {
                if(data.IsSuccess)
                {
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
                    $scope.showAlert('Success', 'info', 'Phone number added');

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
            var token = authService.GetToken();

            phnNumApiAccess.savePhoneNumber(token, $scope.phnNum).then(function(data)
            {
                if(data.IsSuccess)
                {
                    if($scope.phnNum && $scope.phnNum.PhoneNumber && $scope.phnNum.InboundLimitId)
                    {
                        phnNumApiAccess.setInboundLimitToNumber(token, $scope.phnNum.PhoneNumber, $scope.phnNum.InboundLimitId).then(function(data)
                        {

                        }, function(err)
                        {
                            var errMsg = "Error mapping limit Id";
                            if(err.statusText)
                            {
                                errMsg = err.statusText;
                            }
                            $scope.showAlert('Error', 'error', errMsg);
                        });

                    }

                    if($scope.phnNum && $scope.phnNum.PhoneNumber && $scope.phnNum.OutboundLimitId)
                    {
                        phnNumApiAccess.setOutboundLimitToNumber(token, $scope.phnNum.PhoneNumber, $scope.phnNum.OutboundLimitId).then(function(data)
                        {

                        }, function(err)
                        {
                            var errMsg = "Error mapping limit Id";
                            if(err.statusText)
                            {
                                errMsg = err.statusText;
                            }
                            $scope.showAlert('Error', 'error', errMsg);
                        });

                    }

                    if($scope.phnNum && $scope.phnNum.PhoneNumber && $scope.phnNum.BothLimitId)
                    {
                        phnNumApiAccess.setBothLimitToNumber(token, $scope.phnNum.PhoneNumber, $scope.phnNum.BothLimitId).then(function(data)
                        {

                        }, function(err)
                        {
                            var errMsg = "Error mapping limit Id";
                            if(err.statusText)
                            {
                                errMsg = err.statusText;
                            }
                            $scope.showAlert('Error', 'error', errMsg);
                        });

                    }

                    $scope.showAlert('Success', 'info', 'Phone number added');

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


        loadTranslations();
        loadTrunks();
        loadNumbers();
        getLimits();

    };

    app.controller("myNumbersCtrl", myNumbersCtrl);
}());
