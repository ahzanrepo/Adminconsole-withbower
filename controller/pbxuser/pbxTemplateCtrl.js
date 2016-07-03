/**
 * Created by dinusha on 7/2/2016.
 */

/**
 * Created by dinusha on 7/1/2016.
 */


(function() {
    var app = angular.module("veeryConsoleApp");

    var pbxTemplateCtrl = function ($scope, $rootScope, pbxUserApiHandler)
    {

        $scope.showAlert = function (title, type, content) {

            new PNotify({
                title: title,
                text: content,
                type: type,
                styling: 'bootstrap3'
            });
        };

        var currentUserUuid = null;
        $scope.numberType = 'USER';


        var resetForm = function()
        {
            $scope.destinationNumber = null;
            $scope.numberType = 'USER';
            currentUserUuid = null;
            $scope.pabxTemplList = [];
            $scope.dataReady = false;
        };


        $scope.deleteTemplate = function(templId)
        {
            pbxUserApiHandler.deletePABXTemplate(templId)
                .then(function(data)
                {
                    if(data.IsSuccess)
                    {
                        $scope.showAlert('Success', 'info', 'Template deleted');
                        reloadTemplateList(currentUserUuid);
                    }
                    else
                    {
                        $scope.showAlert('Error', 'error', 'Template deletion failed');
                    }

                },
                function(err)
                {
                    $scope.showAlert('Error', 'error', 'Template deletion failed');

                })


        };

        $scope.saveTemplate = function()
        {
            pbxUserApiHandler.postPABXUserTemplate(currentUserUuid, $scope.destinationNumber, $scope.numberType)
                .then(function(data)
                {
                    if(data.IsSuccess)
                    {
                        $scope.showAlert('Success', 'info', 'Template added successfully');

                        $scope.$emit('PABX_LoadDivertNumbers', currentUserUuid);

                        reloadTemplateList(currentUserUuid);

                    }
                    else
                    {
                        $scope.showAlert('Error', 'error', 'Template failed to add');
                    }

                },
                function(err)
                {
                    $scope.showAlert('Error', 'error', 'Template failed to add');

                });

            $scope.destinationNumber = null;
            $scope.numberType = 'USER';
        };

        var reloadTemplateList = function(uuid)
        {
            pbxUserApiHandler.getPABXUserTemplates(uuid).then(function(data)
            {
                $scope.pabxTemplList = data.Result;
                $scope.dataReady = true;
            }, function(err)
            {
                $scope.showAlert('Error', 'error', 'Failed to load template list');
            });
        };

        $rootScope.$on('PABX_LoadUserData', function(event, args)
        {
            currentUserUuid = args;
            reloadTemplateList(args);
        });

        $rootScope.$on('PABX_ResetForms', function(event, args)
        {
            resetForm();

        });





    };

    app.controller("pbxTemplateCtrl", pbxTemplateCtrl);
}());


