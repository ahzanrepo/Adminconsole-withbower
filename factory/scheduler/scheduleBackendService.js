/**
 * Created by Pawan on 7/26/2016.
 */

mainApp.factory('scheduleBackendService', function ($http, authService, baseUrls) {
    return {

        getSchedules: function () {
            var authToken = authService.GetToken();
            return $http({
                method: 'GET',
                url: "http://limithandler.app.veery.cloud/DVP/API/1.0.0.0/LimitAPI/Schedules",
                headers: {
                    'authorization': authToken
                }
            }).then(function (response) {
                return response;
            });
        },

        getAppointments: function (scheduleId) {
            var authToken = authService.GetToken();
            return $http({
                method: 'GET',
                url: 'http://limithandler.app.veery.cloud/DVP/API/1.0.0.0/LimitAPI/Schedule/' + scheduleId + '/Appointments',
                headers: {
                    'authorization': authToken
                }
            }).then(function (response) {
                return response;
            });
        },

        saveNewSchedule: function (resource) {
            var authToken = authService.GetToken();

            return $http({
                method: 'POST',
                url: "http://limithandler.app.veery.cloud/DVP/API/1.0.0.0/LimitAPI/Schedule",
                headers: {
                    'authorization': authToken
                },
                data: resource

            }).then(function (response) {
                return response;
            });
        },

        saveNewAppointment: function (resource) {
            var authToken = authService.GetToken();

            return $http({
                method: 'POST',
                url: "http://limithandler.app.veery.cloud/DVP/API/1.0.0.0/LimitAPI/Schedule/Appointment",
                headers: {
                    'authorization': authToken
                },
                data: resource

            }).then(function (response) {
                return response;
            });
        },

        updateSchedule: function (resource) {
            var authToken = authService.GetToken();

            return $http({
                method: 'POST',
                url: 'http://limithandler.app.veery.cloud/DVP/API/1.0.0.0/LimitAPI/Schedule/' + resource.id,
                headers: {
                    'authorization': authToken
                },
                data: resource

            }).then(function (response) {
                return response;
            });
        },
        updateAppointment: function (resource) {
            var authToken = authService.GetToken();

            return $http({
                method: 'POST',
                url: 'http://limithandler.app.veery.cloud/DVP/API/1.0.0.0/LimitAPI/Schedule/Appointment/' + resource.id,
                headers: {
                    'authorization': authToken
                },
                data: resource

            }).then(function (response) {
                return response;
            });
        },
        removeSchedule: function (scheduleId) {
            var authToken = authService.GetToken();

            return $http({
                method: 'DELETE',
                url: 'http://limithandler.app.veery.cloud/DVP/API/1.0.0.0/LimitAPI/Schedule/' + scheduleId,
                headers: {
                    'authorization': authToken
                }

            }).then(function (response) {
                return response;
            });
        },
        removeAppointment: function (appointmentId) {
            var authToken = authService.GetToken();

            return $http({
                method: 'DELETE',
                url: 'http://limithandler.app.veery.cloud/DVP/API/1.0.0.0/LimitAPI/Appointment/' + appointmentId,
                headers: {
                    'authorization': authToken
                }

            }).then(function (response) {
                return response;
            });
        },
        getAppointmentActions: function () {
            var authToken = authService.GetToken();
            return $http({
                method: 'GET',
                url: baseUrls.appointment + "Actions",
                headers: {
                    'authorization': authToken
                }

            }).then(function (response) {
                return response;
            });
        }


    }
});