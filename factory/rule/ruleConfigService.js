/**
 * Created by Pawan on 6/3/2016.
 */
/**
 * Created by Pawan on 5/28/2016.
 */

mainApp.factory('ruleconfigservice', function ($http) {
    var authToken = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkaW51c2hhZGNrIiwianRpIjoiMjViZjZmZTItZjZjNC00ZWJhLWFmODgtNmMxNjIxOTU4OGRiIiwic3ViIjoiNTZhOWU3NTlmYjA3MTkwN2EwMDAwMDAxMjVkOWU4MGI1YzdjNGY5ODQ2NmY5MjExNzk2ZWJmNDMiLCJleHAiOjE4OTI0NDE2NzIsInRlbmFudCI6MSwiY29tcGFueSI6Mywic2NvcGUiOlt7InJlc291cmNlIjoiYWxsIiwiYWN0aW9ucyI6ImFsbCJ9XSwiaWF0IjoxNDYwNDM4MDcyfQ.aPoVPiTtoGFgnKmhdLBTzwTrQRTGWWliYujHP5NONqU';
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




