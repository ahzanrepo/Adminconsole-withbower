/**
 * Created by dinusha on 6/3/2016.
 */

(function(){

    var app = angular.module("veeryConsoleApp");

    app.directive("usernamecheck", function ($q, $http)
    {

        var validateUsername = function (usr)
        {
            return $http({
                method: 'GET',
                url: 'http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/User/' + usr,
                headers: {
                    'authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkaW51c2hhZGNrIiwianRpIjoiZTBhMGFlYzItMDViYi00YTZiLThlYjctMzFmZjBjYWE4OGI0Iiwic3ViIjoiNTZhOWU3NTlmYjA3MTkwN2EwMDAwMDAxMjVkOWU4MGI1YzdjNGY5ODQ2NmY5MjExNzk2ZWJmNDMiLCJleHAiOjE4OTIzNTM2NDksInRlbmFudCI6MSwiY29tcGFueSI6Mywic2NvcGUiOlt7InJlc291cmNlIjoiYWxsIiwiYWN0aW9ucyI6ImFsbCJ9XSwiaWF0IjoxNDYwMzUwMDQ5fQ.CJuBzazkYKiGWVhxvZ4NweilYP3n5RQFvTk2VoHYa2c'
                }
            }).then(function (resp)
            {
                return resp.data;
            })
        };

        return {
            restrict: "A",
            require: "ngModel",
            link: function (scope, element, attributes, ngModel)
            {
                ngModel.$asyncValidators.usernamecheck = function (modelValue)
                {
                    var defer = $q.defer();
                    validateUsername(modelValue).then(function (data)
                        {
                            if (scope.IsEdit)
                            {
                                defer.resolve();
                            }
                            else
                            {
                                if (data.IsSuccess)
                                {
                                    if (data.Result)
                                    {
                                        defer.reject();
                                    }
                                    else
                                    {
                                        defer.resolve();
                                    }
                                }
                                else
                                {
                                    defer.reject();
                                }
                            }
                        },
                        function (err)
                        {
                            defer.reject();
                        });

                    return defer.promise;
                }
            }
        };
    })

    app.directive("extcheck", function($q, $http)
    {

        var validateExtension = function(ext)
        {
            return $http({
                method: 'GET',
                url: 'http://sipuserendpointservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/SipUser/Extension/' + ext,
                headers: {
                    'authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkaW51c2hhZGNrIiwianRpIjoiZTBhMGFlYzItMDViYi00YTZiLThlYjctMzFmZjBjYWE4OGI0Iiwic3ViIjoiNTZhOWU3NTlmYjA3MTkwN2EwMDAwMDAxMjVkOWU4MGI1YzdjNGY5ODQ2NmY5MjExNzk2ZWJmNDMiLCJleHAiOjE4OTIzNTM2NDksInRlbmFudCI6MSwiY29tcGFueSI6Mywic2NvcGUiOlt7InJlc291cmNlIjoiYWxsIiwiYWN0aW9ucyI6ImFsbCJ9XSwiaWF0IjoxNDYwMzUwMDQ5fQ.CJuBzazkYKiGWVhxvZ4NweilYP3n5RQFvTk2VoHYa2c'
                }
            }).then(function (resp) {
                return resp.data;
            })
        };

        return {
            restrict: "A",
            require: "ngModel",
            link: function(scope, element, attributes, ngModel) {
                ngModel.$asyncValidators.extcheck = function(modelValue) {
                    var defer = $q.defer();
                    if(scope.IsEdit)
                    {
                        defer.resolve();
                    }
                    else
                    {
                        validateExtension(modelValue).then(function(data){
                                if (data.IsSuccess)
                                {
                                    if(data.Result)
                                    {
                                        defer.reject();
                                    }
                                    else
                                    {
                                        defer.resolve();
                                    }
                                }
                                else
                                {
                                    defer.reject();
                                }},
                            function(err)
                            {
                                defer.reject();
                            })
                    }


                    return defer.promise;
                }
            }
        };
    });
}());
