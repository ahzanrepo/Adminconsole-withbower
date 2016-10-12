/**
 * Created by dinusha on 5/29/2016.
 */

(function() {

    var cdrApiHandler = function($http, authService)
    {
        var getCDRForTimeRange = function(startDate, endDate, limit, offsetId, agent, skill, direction, record, custNumber)
        {
            var authToken = authService.GetToken();
            var url = 'http://cdrprocessor.app.veery.cloud/DVP/API/1.0.0.0/CallCDR/GetCallDetailsByRange?startTime=' + startDate + '&endTime=' + endDate + '&limit=' + limit;

            if(agent)
            {
                url = url + '&agent=' + agent;
            }
            if(skill)
            {
                url = url + '&skill=' + skill;
            }
            if(direction)
            {
                url = url + '&direction=' + direction;
            }
            if(record)
            {
                url = url + '&recording=' + record;
            }

            if(offsetId)
            {
                url = url + '&offset=' + offsetId;
            }

            if(custNumber)
            {
                url = url + '&custnumber=' + custNumber;
            }

            return $http({
                method: 'GET',
                url: url,
                timeout: 240000,
                headers: {
                    'authorization': authToken
                }
            }).then(function(resp)
            {
                return resp.data;
            })
        };

        var getProcessedCDRByFilter = function(startDate, endDate, agent, skill, direction, record, custNumber)
        {
            var authToken = authService.GetToken();
            var url = 'http://cdrprocessor.app.veery.cloud/DVP/API/1.0.0.0/CallCDR/GetProcessedCallDetailsByRange?startTime=' + startDate + '&endTime=' + endDate;

            if(agent)
            {
                url = url + '&agent=' + agent;
            }
            if(skill)
            {
                url = url + '&skill=' + skill;
            }
            if(direction)
            {
                url = url + '&direction=' + direction;
            }
            if(record)
            {
                url = url + '&recording=' + record;
            }

            if(custNumber)
            {
                url = url + '&custnumber=' + custNumber;
            }
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

        var prepareDownloadCDRByType = function(startDate, endDate, agent, skill, direction, record, custNumber, fileType, tz)
        {
            var authToken = authService.GetToken();
            var url = 'http://cdrprocessor.app.veery.cloud/DVP/API/1.0.0.0/CallCDR/Download?startTime=' + startDate + '&endTime=' + endDate;

            if(agent)
            {
                url = url + '&agent=' + agent;
            }
            if(skill)
            {
                url = url + '&skill=' + skill;
            }
            if(direction)
            {
                url = url + '&direction=' + direction;
            }
            if(record)
            {
                url = url + '&recording=' + record;
            }

            if(custNumber)
            {
                url = url + '&custnumber=' + custNumber;
            }

            if(fileType)
            {
                url = url + '&fileType=' + fileType;
            }

            if(tz)
            {
                url = url + '&tz=' + tz;
            }

            return $http({
                method: 'GET',
                url: url,
                timeout: 240000,
                headers: {
                    'authorization': authToken
                }
            }).then(function(resp)
            {
                return resp.data;
            })
        };

        var getAbandonCDRForTimeRange = function(startDate, endDate, limit, offsetId)
        {
            var authToken = authService.GetToken();
            var url = 'http://cdrprocessor.app.veery.cloud/DVP/API/1.0.0.0/CallCDR/GetAbandonCallDetailsByRange?startTime=' + startDate + '&endTime=' + endDate + '&limit=' + limit;

            if(offsetId)
            {
                url = url + '&offset=' + offsetId;
            }

            return $http({
                method: 'GET',
                url: url,
                timeout: 240000,
                headers: {
                    'authorization': authToken
                }
            }).then(function(resp)
            {
                return resp.data;
            })
        };

        var getCallSummaryForHr = function(date, tz)
        {
            var authToken = authService.GetToken();
            var url = 'http://cdrprocessor.app.veery.cloud/DVP/API/1.0.0.0/CallCDR/CallCDRSummary/Hourly?date=' + date + '&tz=' + tz;

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

        var getAgentStatusList = function(startDate, endDate, statusList, agentList)
        {
            var authToken = authService.GetToken();
            var url = 'http://cdrprocessor.app.veery.cloud/DVP/API/1.0.0.0/CallCDR/AgentStatus?startDate=' + startDate + '&endDate=' + endDate;

            var body = {
                agentList: null,
                statusList: null
            };

            if(agentList)
            {
                body.agentList = agentList
            }

            if(statusList)
            {
                body.statusList = statusList
            }

            return $http({
                method: 'POST',
                url: url,
                headers: {
                    'authorization': authToken
                },
                data: JSON.stringify(body)
            }).then(function(resp)
            {
                return resp.data;
            })
        };

        var getCallSummaryForDay = function(sdate, edate, tz)
        {
            var authToken = authService.GetToken();
            var url = 'http://cdrprocessor.app.veery.cloud/DVP/API/1.0.0.0/CallCDR/CallCDRSummary/Daily?startDate=' + sdate + '&endDate=' + edate + '&tz=' + tz;

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
            getCDRForTimeRange: getCDRForTimeRange,
            getAbandonCDRForTimeRange: getAbandonCDRForTimeRange,
            getCallSummaryForHr: getCallSummaryForHr,
            getCallSummaryForDay: getCallSummaryForDay,
            getAgentStatusList: getAgentStatusList,
            prepareDownloadCDRByType: prepareDownloadCDRByType,
            getProcessedCDRByFilter: getProcessedCDRByFilter
        };
    };

    var module = angular.module("veeryConsoleApp");
    module.factory("cdrApiHandler", cdrApiHandler);

}());
