(function() {

    var ticketReportsService = function($http, authService)
    {
        var getTicketSummary = function(sdate, edate, tag, channel, priority, type)
        {
            var postData = {};
            var authToken = authService.GetToken();
            var url = 'http://localhost:3636/DVP/API/1.0.0.0/TicketReport?from=' + sdate + '&to=' + edate;

            if(tag)
            {
                postData.tag = tag;
            }

            if(channel)
            {
                postData.channel = channel;
            }

            if(priority)
            {
                postData.priority = priority;
            }

            if(type)
            {
                postData.type = type;
            }

            var httpHeaders = {
                method: 'POST',
                url: url,
                headers: {
                    'authorization': authToken
                }
            };

            if(tag || channel || priority || type)
            {

                httpHeaders.data = JSON.stringify(postData);
            }

            return $http(httpHeaders).then(function(resp)
            {
                return resp.data;
            })
        };

        var getTagList = function()
        {
            var authToken = authService.GetToken();
            var url = 'http://localhost:3636/DVP/API/1.0.0.0/Tags';

            return $http({
                method: 'GET',
                url: url,
                headers: {
                    'authorization': authToken
                }
            }).then(function(resp)
            {
                return resp.data;
            })
        };

        var getCategoryList = function()
        {
            var authToken = authService.GetToken();
            var url = 'http://localhost:3636/DVP/API/1.0.0.0/TagCategories';

            return $http({
                method: 'GET',
                url: url,
                headers: {
                    'authorization': authToken
                }
            }).then(function(resp)
            {
                return resp.data;
            })
        };

        return {
            getTicketSummary: getTicketSummary,
            getCategoryList: getCategoryList,
            getTagList: getTagList
        };
    };

    var module = angular.module("veeryConsoleApp");
    module.factory("ticketReportsService", ticketReportsService);

}());
