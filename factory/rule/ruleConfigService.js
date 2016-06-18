/**
 * Created by Pawan on 6/3/2016.
 */
/**
 * Created by Pawan on 5/28/2016.
 */

mainApp.factory('ruleconfigservice', function ($http) {
    var authToken = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3YXJ1bmEiLCJqdGkiOiJlNjk1ZDM3Ny1kMTRkLTRjMTgtYTM5Ni0xYzcwZTQ5NGFjYzMiLCJzdWIiOiJBY2Nlc3MgY2xpZW50IiwiZXhwIjoxNDY2NzgzNzA5LCJ0ZW5hbnQiOjEsImNvbXBhbnkiOjI0LCJhdWQiOiJteWFwcCIsImNvbnRleHQiOnt9LCJzY29wZSI6W3sicmVzb3VyY2UiOiJzeXNtb25pdG9yaW5nIiwiYWN0aW9ucyI6WyJyZWFkIl19LHsicmVzb3VyY2UiOiJkYXNoYm9hcmRldmVudCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJkYXNoYm9hcmRncmFwaCIsImFjdGlvbnMiOlsicmVhZCJdfSx7InJlc291cmNlIjoibm90aWZpY2F0aW9uIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiXX0seyJyZXNvdXJjZSI6ImF0dHJpYnV0ZSIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJncm91cCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJyZXNvdXJjZXRhc2thdHRyaWJ1dGUiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoidGFzayIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJwcm9kdWN0aXZpdHkiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiU2hhcmVkIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InRhc2tpbmZvIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6ImFyZHNyZXNvdXJjZSIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJhcmRzcmVxdWVzdCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJyZXF1ZXN0bWV0YSIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJxdWV1ZSIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJyZXF1ZXN0c2VydmVyIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InVzZXIiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoidXNlclByb2ZpbGUiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoib3JnYW5pc2F0aW9uIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiXX0seyJyZXNvdXJjZSI6InJlc291cmNlIiwiYWN0aW9ucyI6WyJyZWFkIl19LHsicmVzb3VyY2UiOiJwYWNrYWdlIiwiYWN0aW9ucyI6WyJyZWFkIl19LHsicmVzb3VyY2UiOiJjb25zb2xlIiwiYWN0aW9ucyI6WyJyZWFkIl19LHsicmVzb3VyY2UiOiJ1c2VyU2NvcGUiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoidXNlckFwcFNjb3BlIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InVzZXJNZXRhIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InVzZXJBcHBNZXRhIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6ImNsaWVudCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJjbGllbnRTY29wZSIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJEaXNwYXRjaCIsImFjdGlvbnMiOlsid3JpdGUiXX0seyJyZXNvdXJjZSI6ImZpbGVzZXJ2aWNlIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiXX0seyJyZXNvdXJjZSI6ImVuZHVzZXIiLCJhY3Rpb25zIjpbInJlYWQiXX0seyJyZXNvdXJjZSI6ImNvbnRleHQiLCJhY3Rpb25zIjpbInJlYWQiXX0seyJyZXNvdXJjZSI6ImFwcHJlZyIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIl19LHsicmVzb3VyY2UiOiJjYWxscnVsZSIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJ0cnVuayIsImFjdGlvbnMiOlsicmVhZCJdfSx7InJlc291cmNlIjoicXVldWVtdXNpYyIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJsaW1pdCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIl19LHsicmVzb3VyY2UiOiJjZHIiLCJhY3Rpb25zIjpbInJlYWQiXX1dLCJpYXQiOjE0NjYxNzg5MDl9.HHLqJV_zYrF6S0X9fyOp1y7AwM44wMHHuLs7ZGbIHts';
    return {

        allRulePicker : function () {
            return $http({
                method: 'GET',
                url: 'http://ruleservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/CallRuleApi/CallRules',
                headers: {
                    'authorization': authToken
                }
            }).then(function(response)
            {
                return response;
            });
        },

        inboundRulePicker : function () {
            return $http({
                method: 'GET',
                url: 'http://ruleservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/CallRuleApi/CallRules/Direction/INBOUND',
                headers: {
                    'authorization': authToken
                }
            }).then(function(response)
            {
                return response;
            });
        },

        outboundRulePicker : function () {
            return $http({
                method: 'GET',
                url: 'http://ruleservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/CallRuleApi/CallRules/Direction/OUTBOUND',
                headers: {
                    'authorization': authToken
                }
            }).then(function(response)
            {
                return response;
            });
        },

        addNewRule : function (newRuleObj) {

            if(!newRuleObj.Context || newRuleObj.Context=="" )
            {
                newRuleObj.Context="ANY"
            }
            if(newRuleObj.Direction=='INBOUND')
            {
                newRuleObj.TrunkNumber=null;
            }

            return $http({
                method: 'POST',
                url: 'http://ruleservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/CallRuleApi/CallRule',
                headers: {
                    'authorization': authToken
                },
                data:newRuleObj
            }).then(function(response)
            {
                return response;
            });
        },

        getContextList : function () {

            return $http({
                method: 'GET',
                url: 'http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/Contexts',
                headers: {
                    'authorization': authToken
                }
            }).then(function(response)
            {
                return response;
            });


        },
        loadTrunks: function () {

            return $http({
                method: 'GET',
                url: 'http://phonenumbertrunkservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/PhoneNumberTrunkApi/TrunkNumbers',
                headers: {
                    'authorization': authToken
                }
            }).then(function(response)
            {
                return response;
            });


        },
        deleteRules: function (rule) {
            return $http({
                method: 'DELETE',
                url: "http://ruleservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/CallRuleApi/CallRule/"+rule.id,
                headers: {
                    'authorization': authToken
                }
            }).then(function(response)
            {
                response.data.id=rule.id;
                return response;
            });

        },
        getRule : function (rID) {

            return $http({
                method: 'GET',
                url: "http://ruleservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/CallRuleApi/CallRule/"+rID,
                headers: {
                    'authorization': authToken
                }
            }).then(function(response)
            {
                return response;
            });


        },

        loadApps : function () {

            return $http({
                method: 'GET',
                url: "http://appregistry.104.131.67.21.xip.io/DVP/API/1.0.0.0/APPRegistry/Applications",
                headers: {
                    'authorization': authToken
                }
            }).then(function(response)
            {
                return response;
            });

        },

        loadTranslations : function () {

            return $http({
                method: 'GET',
                url: "http://ruleservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/CallRuleApi/Translations",
                headers: {
                    'authorization': authToken
                }
            }).then(function(response)
            {
                return response;
            });

        },
         attchDNISTransToRule : function (rID,dtID) {

            return $http({
                method: 'POST',
                url: "http://ruleservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/CallRuleApi/CallRule/"+rID+"/SetDNISTranslation/"+dtID,
                headers: {
                    'authorization': authToken
                }
            }).then(function(response)
            {
                return response;
            });


        },
        attchANITransToRule : function (rID,atID) {

            return $http({
                method: 'POST',
                url: "http://ruleservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/CallRuleApi/CallRule/"+rID+"/SetANITranslation/"+atID,
                headers: {
                    'authorization': authToken
                }
            }).then(function(response)
            {
                return response;
            });

        },

        updateRules :function (rule) {

            return $http({
                method: 'PUT',
                url: 'http://ruleservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/CallRuleApi/CallRule/'+rule.id,
                headers: {
                    'authorization': authToken
                },
                data:rule
            }).then(function(response)
            {
                return response;
            });



        },
        attchAppWithRule : function (rID,aID) {

            return $http({
                method: 'POST',
                url: "http://ruleservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/CallRuleApi/CallRule/"+rID+"/SetApplication/"+aID,
                headers: {
                    'authorization': authToken
                }
            }).then(function(response)
            {
                return response;
            });

        }


    }
});




