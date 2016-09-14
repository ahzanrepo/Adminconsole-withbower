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
                'authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkdW9hcmFmYXRoIiwianRpIjoiMjQ1Y2ZjMmItOGYzZi00NmIwLTk2MTEtMzNjZDU1MzRjMzdmIiwic3ViIjoiQWNjZXNzIGNsaWVudCIsImV4cCI6MTQ3NDI2MzU5NCwidGVuYW50IjoxLCJjb21wYW55IjoxMDMsImF1ZCI6Im15YXBwIiwiY29udGV4dCI6e30sInNjb3BlIjpbeyJyZXNvdXJjZSI6Im15TmF2aWdhdGlvbiIsImFjdGlvbnMiOlsicmVhZCJdfSx7InJlc291cmNlIjoibXlVc2VyUHJvZmlsZSIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJhcmRzcmVzb3VyY2UiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoibm90aWZpY2F0aW9uIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InNpcHVzZXIiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoicmVxdWVzdG1ldGEiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoic3lzbW9uaXRvcmluZyIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJteVVzZXJQcm9maWxlIiwiYWN0aW9ucyI6WyJyZWFkIl19LHsicmVzb3VyY2UiOiJwYWNrYWdlIiwiYWN0aW9ucyI6WyJyZWFkIl19LHsicmVzb3VyY2UiOiJldmVudHMiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiZXh0ZXJuYWxVc2VyIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InVzZXJHcm91cCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJ0aWNrZXQiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoidGFnIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InRpbWVyIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InRpY2tldHZpZXciLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiZm9ybXMiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiZW5nYWdlbWVudCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJpbmJveCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJ1c2VyIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX1dLCJpYXQiOjE0NzM2NTg3OTR9.eqtZflL2MpXGP00stY09ohJwgN4aQlyZGAwyUoXCtJg"
            },
            data: item
        }).then(function (response) {
            return response.data.IsSuccess;
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
                'authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkdW9hcmFmYXRoIiwianRpIjoiMjQ1Y2ZjMmItOGYzZi00NmIwLTk2MTEtMzNjZDU1MzRjMzdmIiwic3ViIjoiQWNjZXNzIGNsaWVudCIsImV4cCI6MTQ3NDI2MzU5NCwidGVuYW50IjoxLCJjb21wYW55IjoxMDMsImF1ZCI6Im15YXBwIiwiY29udGV4dCI6e30sInNjb3BlIjpbeyJyZXNvdXJjZSI6Im15TmF2aWdhdGlvbiIsImFjdGlvbnMiOlsicmVhZCJdfSx7InJlc291cmNlIjoibXlVc2VyUHJvZmlsZSIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJhcmRzcmVzb3VyY2UiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoibm90aWZpY2F0aW9uIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InNpcHVzZXIiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoicmVxdWVzdG1ldGEiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoic3lzbW9uaXRvcmluZyIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJteVVzZXJQcm9maWxlIiwiYWN0aW9ucyI6WyJyZWFkIl19LHsicmVzb3VyY2UiOiJwYWNrYWdlIiwiYWN0aW9ucyI6WyJyZWFkIl19LHsicmVzb3VyY2UiOiJldmVudHMiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiZXh0ZXJuYWxVc2VyIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InVzZXJHcm91cCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJ0aWNrZXQiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoidGFnIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InRpbWVyIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InRpY2tldHZpZXciLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiZm9ybXMiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiZW5nYWdlbWVudCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJpbmJveCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJ1c2VyIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX1dLCJpYXQiOjE0NzM2NTg3OTR9.eqtZflL2MpXGP00stY09ohJwgN4aQlyZGAwyUoXCtJg"
            }
        }).then(function (response) {
            return response.data.Result;
        });
    };
    return {
        SaveForm:saveForm,
        LoadFormList: loadFormList
    }

});




