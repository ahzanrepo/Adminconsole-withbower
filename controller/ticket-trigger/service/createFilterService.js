/**
 * Created by Damith on 9/29/2016.
 */
mainApp.factory('ticketFilterService', function ($http, authService, baseUrls) {
    return {
        getMainFiledList: function () {
            return $http({
                method: 'get',
                url: baseUrls.ticketUrl + 'TicketSchema',
                headers: {
                    'authorization': authService.GetToken()
                }
            }).then(function (response) {
                return response.data.Result;
            });
        },
        getAllTicketViews: function () {
            return $http({
                method: 'get',
                url: baseUrls.ticketUrl + 'TicketViews',
                headers: {
                    'authorization': authService.GetToken()
                }
            }).then(function (response) {
                return response.data.Result;
            });
        },
        addTicketView: function (ticketViewObj) {
            return $http({
                method: 'post',
                url: baseUrls.ticketUrl + 'TicketView',
                headers: {
                    'authorization': authService.GetToken()
                },
                data: JSON.stringify(ticketViewObj)
            }).then(function (response) {
                return response.data;
            });
        },
        getTicketViewById: function (id) {
            return $http({
                method: 'get',
                url: baseUrls.ticketUrl + 'TicketView/' + id,
                headers: {
                    'authorization': authService.GetToken()
                }
            }).then(function (response) {
                return response.data;
            });
        },
        updateTicketViewById: function (id, ticketViewObj) {
            return $http({
                method: 'put',
                url: baseUrls.ticketUrl + 'TicketView/' + id,
                headers: {
                    'authorization': authService.GetToken()
                },
                data: JSON.stringify(ticketViewObj)
            }).then(function (response) {
                return response.data;
            });
        }
    }
});

