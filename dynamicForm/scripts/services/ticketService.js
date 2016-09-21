/**
 * Created by Rajinda on 12/31/2015.
 */
'use strict';
mainApp.factory("ticketService", function ($http, $log, $filter, authService, baseUrls) {

    var saveForm = function (item) {

        return $http({
            method: 'post',
            url: baseUrls.ticketUrl + 'FormMaster',
            /*headers: {
                'authorization': authService.GetToken()
            },*/
            headers: {
                'authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkdW9hcmFmYXRoIiwianRpIjoiYWU0MGVjZTYtYjM3Mi00ZmNhLWFmYTItNDdhNmVjYzcxNTgwIiwic3ViIjoiQWNjZXNzIGNsaWVudCIsImV4cCI6MTQ3NDg2ODU3MiwidGVuYW50IjoxLCJjb21wYW55IjoxMDMsImF1ZCI6Im15YXBwIiwiY29udGV4dCI6e30sInNjb3BlIjpbeyJyZXNvdXJjZSI6Im15TmF2aWdhdGlvbiIsImFjdGlvbnMiOlsicmVhZCJdfSx7InJlc291cmNlIjoibXlVc2VyUHJvZmlsZSIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJhcmRzcmVzb3VyY2UiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoibm90aWZpY2F0aW9uIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InNpcHVzZXIiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoicmVxdWVzdG1ldGEiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoic3lzbW9uaXRvcmluZyIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJteVVzZXJQcm9maWxlIiwiYWN0aW9ucyI6WyJyZWFkIl19LHsicmVzb3VyY2UiOiJwYWNrYWdlIiwiYWN0aW9ucyI6WyJyZWFkIl19LHsicmVzb3VyY2UiOiJldmVudHMiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiZXh0ZXJuYWxVc2VyIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InVzZXJHcm91cCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJ0aWNrZXQiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoidGFnIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InRpbWVyIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InRpY2tldHZpZXciLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiZm9ybXMiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiZW5nYWdlbWVudCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJpbmJveCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJ1c2VyIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX1dLCJpYXQiOjE0NzQyNjM3NzJ9.1xZzZjsPf90Y_ALSdr22RDn74VY44zM2dQrKxGuxnP0"
            },
            data: item
        }).then(function (response) {
            return response.data.IsSuccess;
        });
    };

    var getFormProfile = function () {

        return $http({
            method: 'get',
            url: baseUrls.ticketUrl + 'FormProfile',
            /*headers: {
             'authorization': authService.GetToken()
             },*/
            headers: {
                'authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkdW9hcmFmYXRoIiwianRpIjoiYWU0MGVjZTYtYjM3Mi00ZmNhLWFmYTItNDdhNmVjYzcxNTgwIiwic3ViIjoiQWNjZXNzIGNsaWVudCIsImV4cCI6MTQ3NDg2ODU3MiwidGVuYW50IjoxLCJjb21wYW55IjoxMDMsImF1ZCI6Im15YXBwIiwiY29udGV4dCI6e30sInNjb3BlIjpbeyJyZXNvdXJjZSI6Im15TmF2aWdhdGlvbiIsImFjdGlvbnMiOlsicmVhZCJdfSx7InJlc291cmNlIjoibXlVc2VyUHJvZmlsZSIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJhcmRzcmVzb3VyY2UiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoibm90aWZpY2F0aW9uIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InNpcHVzZXIiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoicmVxdWVzdG1ldGEiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoic3lzbW9uaXRvcmluZyIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJteVVzZXJQcm9maWxlIiwiYWN0aW9ucyI6WyJyZWFkIl19LHsicmVzb3VyY2UiOiJwYWNrYWdlIiwiYWN0aW9ucyI6WyJyZWFkIl19LHsicmVzb3VyY2UiOiJldmVudHMiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiZXh0ZXJuYWxVc2VyIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InVzZXJHcm91cCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJ0aWNrZXQiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoidGFnIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InRpbWVyIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InRpY2tldHZpZXciLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiZm9ybXMiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiZW5nYWdlbWVudCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJpbmJveCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJ1c2VyIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX1dLCJpYXQiOjE0NzQyNjM3NzJ9.1xZzZjsPf90Y_ALSdr22RDn74VY44zM2dQrKxGuxnP0"
            }
        }).then(function (response) {
            return response.data;
        });
    };

    var saveFormProfile = function (formProfile) {

        return $http({
            method: 'post',
            url: baseUrls.ticketUrl + 'FormProfile',
            /*headers: {
             'authorization': authService.GetToken()
             },*/
            headers: {
                'authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkdW9hcmFmYXRoIiwianRpIjoiYWU0MGVjZTYtYjM3Mi00ZmNhLWFmYTItNDdhNmVjYzcxNTgwIiwic3ViIjoiQWNjZXNzIGNsaWVudCIsImV4cCI6MTQ3NDg2ODU3MiwidGVuYW50IjoxLCJjb21wYW55IjoxMDMsImF1ZCI6Im15YXBwIiwiY29udGV4dCI6e30sInNjb3BlIjpbeyJyZXNvdXJjZSI6Im15TmF2aWdhdGlvbiIsImFjdGlvbnMiOlsicmVhZCJdfSx7InJlc291cmNlIjoibXlVc2VyUHJvZmlsZSIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJhcmRzcmVzb3VyY2UiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoibm90aWZpY2F0aW9uIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InNpcHVzZXIiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoicmVxdWVzdG1ldGEiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoic3lzbW9uaXRvcmluZyIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJteVVzZXJQcm9maWxlIiwiYWN0aW9ucyI6WyJyZWFkIl19LHsicmVzb3VyY2UiOiJwYWNrYWdlIiwiYWN0aW9ucyI6WyJyZWFkIl19LHsicmVzb3VyY2UiOiJldmVudHMiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiZXh0ZXJuYWxVc2VyIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InVzZXJHcm91cCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJ0aWNrZXQiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoidGFnIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InRpbWVyIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InRpY2tldHZpZXciLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiZm9ybXMiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiZW5nYWdlbWVudCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJpbmJveCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJ1c2VyIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX1dLCJpYXQiOjE0NzQyNjM3NzJ9.1xZzZjsPf90Y_ALSdr22RDn74VY44zM2dQrKxGuxnP0"
            },
            data: JSON.stringify(formProfile)
        }).then(function (response) {
            return response.data;
        });
    };

    var updateFormProfile = function (formProfile) {

        return $http({
            method: 'put',
            url: baseUrls.ticketUrl + 'FormProfile',
            /*headers: {
             'authorization': authService.GetToken()
             },*/
            headers: {
                'authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkdW9hcmFmYXRoIiwianRpIjoiYWU0MGVjZTYtYjM3Mi00ZmNhLWFmYTItNDdhNmVjYzcxNTgwIiwic3ViIjoiQWNjZXNzIGNsaWVudCIsImV4cCI6MTQ3NDg2ODU3MiwidGVuYW50IjoxLCJjb21wYW55IjoxMDMsImF1ZCI6Im15YXBwIiwiY29udGV4dCI6e30sInNjb3BlIjpbeyJyZXNvdXJjZSI6Im15TmF2aWdhdGlvbiIsImFjdGlvbnMiOlsicmVhZCJdfSx7InJlc291cmNlIjoibXlVc2VyUHJvZmlsZSIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJhcmRzcmVzb3VyY2UiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoibm90aWZpY2F0aW9uIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InNpcHVzZXIiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoicmVxdWVzdG1ldGEiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoic3lzbW9uaXRvcmluZyIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJteVVzZXJQcm9maWxlIiwiYWN0aW9ucyI6WyJyZWFkIl19LHsicmVzb3VyY2UiOiJwYWNrYWdlIiwiYWN0aW9ucyI6WyJyZWFkIl19LHsicmVzb3VyY2UiOiJldmVudHMiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiZXh0ZXJuYWxVc2VyIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InVzZXJHcm91cCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJ0aWNrZXQiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoidGFnIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InRpbWVyIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InRpY2tldHZpZXciLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiZm9ybXMiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiZW5nYWdlbWVudCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJpbmJveCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJ1c2VyIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX1dLCJpYXQiOjE0NzQyNjM3NzJ9.1xZzZjsPf90Y_ALSdr22RDn74VY44zM2dQrKxGuxnP0"
            },
            data: JSON.stringify(formProfile)
        }).then(function (response) {
            return response.data;
        });
    };

    var loadFormList = function () {

        return $http({
            method: 'get',
            url: baseUrls.ticketUrl + 'FormMasters',
            /*headers: {
             'authorization': authService.GetToken()
             },*/
            headers: {
                'authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkdW9hcmFmYXRoIiwianRpIjoiYWU0MGVjZTYtYjM3Mi00ZmNhLWFmYTItNDdhNmVjYzcxNTgwIiwic3ViIjoiQWNjZXNzIGNsaWVudCIsImV4cCI6MTQ3NDg2ODU3MiwidGVuYW50IjoxLCJjb21wYW55IjoxMDMsImF1ZCI6Im15YXBwIiwiY29udGV4dCI6e30sInNjb3BlIjpbeyJyZXNvdXJjZSI6Im15TmF2aWdhdGlvbiIsImFjdGlvbnMiOlsicmVhZCJdfSx7InJlc291cmNlIjoibXlVc2VyUHJvZmlsZSIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJhcmRzcmVzb3VyY2UiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoibm90aWZpY2F0aW9uIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InNpcHVzZXIiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoicmVxdWVzdG1ldGEiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoic3lzbW9uaXRvcmluZyIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJteVVzZXJQcm9maWxlIiwiYWN0aW9ucyI6WyJyZWFkIl19LHsicmVzb3VyY2UiOiJwYWNrYWdlIiwiYWN0aW9ucyI6WyJyZWFkIl19LHsicmVzb3VyY2UiOiJldmVudHMiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiZXh0ZXJuYWxVc2VyIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InVzZXJHcm91cCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJ0aWNrZXQiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoidGFnIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InRpbWVyIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InRpY2tldHZpZXciLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiZm9ybXMiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiZW5nYWdlbWVudCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJpbmJveCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJ1c2VyIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX1dLCJpYXQiOjE0NzQyNjM3NzJ9.1xZzZjsPf90Y_ALSdr22RDn74VY44zM2dQrKxGuxnP0"
            }
        }).then(function (response) {
            return response.data.Result;
        });
    };
    return {
        SaveForm:saveForm,
        LoadFormList: loadFormList,
        getFormProfile: getFormProfile,
        saveFormProfile: saveFormProfile,
        updateFormProfile: updateFormProfile
    }

});




