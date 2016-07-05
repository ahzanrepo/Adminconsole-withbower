/**
 * Created by Rajinda on 6/29/2016.
 */

mainApp.controller("conferenceController", function ($scope, $compile, $uibModal, $filter, $location, $log, $anchorScroll, conferenceService) {


    $anchorScroll();
    $scope.isLoading = true;
    $scope.isProgress= false;
    $scope.conference = {};
    $scope.reloadPage = function () {
        $scope.isLoading = true;
        $scope.addNewConference = false;
        $scope.loadConferences();
        $scope.LoadExtentions();
        $scope.LoadEnduserList();
    };

    $scope.addNewConference = false;
    $scope.showNewConference = function () {
        $scope.addNewConference = !$scope.addNewConference;
    };

    $scope.addNewExt = false;
    $scope.showNewExt = function () {
        $scope.addNewExt = !$scope.addNewExt;
    };

    $scope.ext = {};
    $scope.StartTime = {
        date: new Date()
    };
    $scope.EndTime = {
        date: new Date()
    };
    $scope.conference.StartTime = $scope.StartTime.date;
    $scope.conference.EndTime = $scope.EndTime.date;

    $scope.openCalendar = function (name) {
        if (name == 'StartTime') {
            $scope.StartTime.open = true;
        }
        else {
            $scope.EndTime.open = true;
        }

    };

    $scope.addNewExtension = function (dta) {

        dta.ObjCategory = "CONFERENCE";
        conferenceService.CreateExtensions(dta).then(function (response) {

            if (response.data && response.data.IsSuccess) {
                if (response.data.IsSuccess) {
                    $scope.LoadExtentions();
                    $scope.addNewExt = false;
                    $scope.ext = {};
                }
                else {
                    $scope.showAlert('Error', 'error', "dfsdfsd");
                }
            } else {
                $scope.showAlert('Error', 'error', response.data.Exception.Message);
            }

        }, function (err) {
            var errMsg = "Error occurred while Add New Extension";
            $scope.showAlert('Error', 'error', errMsg);

        });
    };

    $scope.showAlert = function (title, type, content) {
        new PNotify({
            title: title,
            text: content,
            type: type,
            styling: 'bootstrap3'
        });
    };

    $scope.endUserList = [];
    $scope.LoadEnduserList = function () {
        conferenceService.getDomains().then(function (data) {
            if (data.IsSuccess) {
                $scope.endUserList = data.Result;
                if ($scope.endUserList) {
                    if ($scope.endUserList.length > 0) {
                        $scope.conference.Domain = $scope.endUserList[0].Domain;
                    }
                }
            }
            else {
                var errMsg = data.CustomMessage;

                if (data.Exception) {
                    errMsg = 'Get enduser Error : ' + data.Exception.Message;
                }
                $scope.showAlert('Error', 'error', errMsg);
            }

        }, function (err) {
            var errMsg = "Error occurred while getting end user list";
            if (err.statusText) {
                errMsg = err.statusText;
            }
            $scope.showAlert('Error', 'error', errMsg);
        });
    };
    $scope.LoadEnduserList();

    $scope.LoadExtentions = function () {
        conferenceService.GetExtensions().then(function (response) {
            $scope.extensions = response;
            if ($scope.extensions) {
                if ($scope.extensions.length > 0) {
                    $scope.conference.Extension = $scope.extensions[0].Extension;
                }
            }
        }, function (error) {
            $scope.showAlert('Error', 'error', "Fail To Get Extentions.");
        });
    };
    $scope.LoadExtentions();

    $scope.GetConferenceTemplate = function () {
        conferenceService.GetConferenceTemplate().then(function (response) {
            $scope.Templates = response;
        }, function (error) {
            $scope.showAlert('Error', 'error', "Fail To Get Conference Template");
        });
    };
    $scope.GetConferenceTemplate();


    $scope.previewTemplate = function (template) {
        if (!$scope.conference.MaxUser)
            $scope.conference.MaxUser = 0;

        if (template.MaxUsers < $scope.conference.MaxUser) {
            $scope.showAlert('Error', 'error', "Template Only Support " + template.MaxUsers + " Users. Please Change User Count or Select Different Template.");
            return;
        }

        var modalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'conference_app/views/conTemplateModal.html',
            controller: 'confModalInstanceCtrl',
            size: 'sm',
            resolve: {
                template: function () {
                    return template;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.createConference = function (conference) {

        if (!$scope.conference.MaxUser)
            $scope.conference.MaxUser = 0;

        if (conference.Template.MaxUsers < $scope.conference.MaxUser) {
            $scope.showAlert('Error', 'error', "Template Only Support " + conference.Template.MaxUsers + " Users. Please Change User Count or Select Different Template.");
            return;
        }

        if (conference.StartTime >= conference.EndTime) {
            $scope.showAlert('New Conference', 'error', "End Time Should Be Greater Than Start Time.");
            return;
        }
        $scope.isProgress= true;
        conference.ActiveTemplate = conference.Template.TemplateName;
        conferenceService.CreateConference(conference).then(function (response) {
            if (response) {
                $scope.addNewConference = false;
                $scope.showAlert("Conference Created", "success", "Conference " + response.ConferenceName + " Created Successfully.");
                $scope.reloadPage();$scope.isProgress= false;
            } else {
                $scope.showAlert("Error", "error", "There is an error, Please check conference name availability");
            }
        }, function (error) {
            $scope.showAlert("Error", "Error", "There is an error createConference");$scope.isProgress= false;
        });
    };

    $scope.loadConferences = function () {
        conferenceService.GetConferences().then(function (response) {
            $scope.isLoading=false;
            $scope.conferences = response;
        }, function (error) {
            $scope.isLoading=false;
            $scope.showAlert("Error", "error", "Fail To Get Conference List.");
        });

    };
    $scope.loadConferences();


});

app.controller('confModalInstanceCtrl', function ($scope, $sce, $uibModalInstance, baseUrls, template) {

    $scope.TemplateUrl = "asset/images/conference_template/" + template.TemplateName.trim() + ".png";
    $scope.TemplateName = template.TemplateName.trim();
    $scope.TemplateDecryption = template.Description.trim();
    $scope.ok = function () {
        $uibModalInstance.close($scope.TemplateUrl);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});


