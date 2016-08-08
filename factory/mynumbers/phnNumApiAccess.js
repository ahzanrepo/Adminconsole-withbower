/**
 * Created by dinusha on 6/11/2016.
 */

(function() {

    var phnNumApiAccess = function($http)
    {
        //var authToken = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ3YXJ1bmEiLCJqdGkiOiJhNmE4MzliMS1iYzYyLTQ4ZGEtOTA2OS01NzFiZWIzOWE4ZmIiLCJzdWIiOiJBY2Nlc3MgY2xpZW50IiwiZXhwIjoxNDY2NzYxMjkwLCJ0ZW5hbnQiOjEsImNvbXBhbnkiOjI0LCJhdWQiOiJteWFwcCIsImNvbnRleHQiOnt9LCJzY29wZSI6W3sicmVzb3VyY2UiOiJhcmRzcmVzb3VyY2UiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiYXJkc3JlcXVlc3QiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoidXNlciIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJ1c2VyUHJvZmlsZSIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJvcmdhbmlzYXRpb24iLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSJdfSx7InJlc291cmNlIjoicmVzb3VyY2UiLCJhY3Rpb25zIjpbInJlYWQiXX0seyJyZXNvdXJjZSI6InBhY2thZ2UiLCJhY3Rpb25zIjpbInJlYWQiXX0seyJyZXNvdXJjZSI6ImNvbnNvbGUiLCJhY3Rpb25zIjpbInJlYWQiXX0seyJyZXNvdXJjZSI6InVzZXJTY29wZSIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJ1c2VyQXBwU2NvcGUiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoidXNlck1ldGEiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoidXNlckFwcE1ldGEiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiY2xpZW50IiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6ImNsaWVudFNjb3BlIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InN5c21vbml0b3JpbmciLCJhY3Rpb25zIjpbInJlYWQiXX0seyJyZXNvdXJjZSI6ImRhc2hib2FyZGV2ZW50IiwiYWN0aW9ucyI6WyJyZWFkIl19LHsicmVzb3VyY2UiOiJkYXNoYm9hcmRncmFwaCIsImFjdGlvbnMiOlsicmVhZCJdfV0sImlhdCI6MTQ2NjE1NjQ5MH0.gpRVdXlv9ideKcCxZX4jUGEBXKS7ew_sHm0QSzVT7gI';
        var getMyNumbers = function(authToken)
        {
            return $http({
                method: 'GET',
                url: 'http://phonenumbertrunkservice.app.veery.cloud/DVP/API/1.0.0.0/PhoneNumberTrunkApi/TrunkNumbers',
                headers: {
                    'authorization': authToken
                }
            }).then(function(resp)
            {
                return resp.data;
            })
        };

        var getLimits = function(authToken)
        {
            return $http({
                method: 'GET',
                url: 'http://limithandler.app.veery.cloud/DVP/API/1.0.0.0/LimitAPI/Limit/Info',
                headers: {
                    'authorization': authToken
                }
            }).then(function(resp)
            {
                return resp.data;
            })
        };

        var savePhoneNumber = function(authToken, phnNumInfo)
        {
            phnNumInfo.TrunkId = 1;
            phnNumInfo.Enable = true;

            var jsonStr = JSON.stringify(phnNumInfo);

            return $http({
                method: 'POST',
                url: 'http://phonenumbertrunkservice.app.veery.cloud/DVP/API/1.0.0.0/PhoneNumberTrunkApi/TrunkNumber',
                headers: {
                    'authorization': authToken
                },
                data : jsonStr
            }).then(function(resp)
            {
                return resp.data;
            })
        };

        var setInboundLimitToNumber = function(authToken, trunkNumber, limitId)
        {

            return $http({
                method: 'POST',
                url: 'http://phonenumbertrunkservice.app.veery.cloud/DVP/API/1.0.0.0/PhoneNumberTrunkApi/TrunkNumber/' + trunkNumber + '/SetInboundLimit/' + limitId,
                headers: {
                    'authorization': authToken
                }
            }).then(function(resp)
            {
                return resp.data;
            })
        };

        var setOutboundLimitToNumber = function(authToken, trunkNumber, limitId)
        {

            return $http({
                method: 'POST',
                url: 'http://phonenumbertrunkservice.app.veery.cloud/DVP/API/1.0.0.0/PhoneNumberTrunkApi/TrunkNumber/' + trunkNumber + '/SetOutboundLimit/' + limitId,
                headers: {
                    'authorization': authToken
                }
            }).then(function(resp)
            {
                return resp.data;
            })
        };


        var setBothLimitToNumber = function(authToken, trunkNumber, limitId)
        {

            return $http({
                method: 'POST',
                url: 'http://phonenumbertrunkservice.app.veery.cloud/DVP/API/1.0.0.0/PhoneNumberTrunkApi/TrunkNumber/' + trunkNumber + '/SetBothLimit/' + limitId,
                headers: {
                    'authorization': authToken
                }
            }).then(function(resp)
            {
                return resp.data;
            })
        };


        return {
            getMyNumbers: getMyNumbers,
            getLimits: getLimits,
            savePhoneNumber: savePhoneNumber,
            setInboundLimitToNumber: setInboundLimitToNumber,
            setOutboundLimitToNumber: setOutboundLimitToNumber,
            setBothLimitToNumber: setBothLimitToNumber
        };



    };



    var module = angular.module("veeryConsoleApp");
    module.factory("phnNumApiAccess", phnNumApiAccess);

}());
