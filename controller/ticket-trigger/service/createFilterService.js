/**
 * Created by Damith on 9/29/2016.
 */
mainApp.factory('createFileServices', function ($http, authService, baseUrls) {
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
        }
    }
});

