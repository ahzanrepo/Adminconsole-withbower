/**
 * Created by Pawan on 7/26/2016.
 */

mainApp.controller("scheduleController", function ($scope, $state, $uibModal, scheduleBackendService, loginService) {

    $scope.showAlert = function (tittle, content, type) {

        new PNotify({
            title: tittle,
            text: content,
            type: type,
            styling: 'bootstrap3'
        });
    };

    $scope.uiconfig = {
        calendar:{}
    };
    $scope.events = [];
    $scope.eventsources = [];



    $scope.ScheduleList = [];
    $scope.newApplication = {};
    $scope.addNew = false;
    $scope.MasterAppList = [];
    $scope.IsDeveloper = false;
    $scope.Developers = [];
    $scope.searchCriteria = "";
    $scope.scheduleAppId = -1;

    $scope.advancedAppointmentList = [];

    $scope.showModalAppointments = function (scheduleId) {

        $scope.advancedAppointmentList = [];
        $scope.scheduleAppId = scheduleId;
        //modal show
        $scope.modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'views/scheduler/advancedAppointments.html',
            size: 'lg',
            scope: $scope
        });

        //get appointments for schedule

        /*scheduleBackendService.getAppointments(scheduleId)
        .then(function(appointments)
        {
            if(appointments && appointments.data && appointments.data.Result)
            {
                $scope.advancedAppointmentList = appointments.data.Result;

            }
            else
            {
                if(appointments && appointments.data && !appointments.data.IsSuccess)
                {
                    $scope.showAlert('Appointments', appointments.data.Exception.Message, 'error')
                }
            }


        }).catch(function(err)
        {
            $scope.showAlert('Appointments', 'Error occurred while loading appointments', 'error')
        })*/
    };


    $scope.saveSchedule = function () {


        scheduleBackendService.saveNewSchedule($scope.newSchedule).then(function (response) {

            if (!response.data.IsSuccess) {

                console.info("Error in adding new Application " + response.data.Exception);
                $scope.showAlert("Error", "There is an error in saving Application ", "error");
                //$scope.showAlert("Error",)
            }
            else {
                $scope.searchCriteria = "";
                $scope.addNew = !response.data.IsSuccess;
                $scope.showAlert("Success", "New Application added sucessfully.", "success");

                $scope.ScheduleList.splice(0, 0, response.data.Result);
                $scope.newSchedule = {};
            }
        }, function (error) {
            loginService.isCheckResponse(error);
            console.info("Error in adding new Application " + error);
            $scope.showAlert("Error", "There is an Exception in saving Application " + error, "error");
        });
    };


    $scope.removeDeleted = function (item) {

        console.log("Hit remDel");
        var index = $scope.ScheduleList.indexOf(item);
        if (index != -1) {
            $scope.ScheduleList.splice(index, 1);
        }

    };
    $scope.reloadPage = function () {
        $scope.GetSchedules();
    };

    $scope.GetSchedules = function () {
        scheduleBackendService.getSchedules().then(function (response) {

            if (!response.data.IsSuccess) {
                console.info("Error in picking App list " + response.data.Exception);
            }
            else {
                $scope.ScheduleList = response.data.Result;
                //$scope.MasterAppList = response.data.Result;
            }

        }, function (error) {
            loginService.isCheckResponse(error);
            console.info("Error in picking App service " + error);
        });
    };

    $scope.cancleEdit = function () {
        $scope.addNew = false;
    };

    $scope.GetSchedules();

});