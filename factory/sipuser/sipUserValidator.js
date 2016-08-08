/**
 * Created by dinusha on 6/3/2016.
 */

(function(){

    var app = angular.module("veeryConsoleApp");

    app.directive("usernamecheck", function ($q, $http, authService)
    {

        var validateUsername = function (usr)
        {
            var authToken = authService.GetToken();
            return $http({
                method: 'GET',
                url: 'http://sipuserendpointservice.app.veery.cloud/DVP/API/1.0.0.0/SipUser/User/' + usr,
                headers: {
                    'authorization': authToken
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

    app.directive("extcheck", function($q, $http, authService)
    {

        var validateExtension = function(ext)
        {
            var authToken = authService.GetToken();
            return $http({
                method: 'GET',
                url: 'http://sipuserendpointservice.app.veery.cloud/DVP/API/1.0.0.0/SipUser/Extension/' + ext,
                headers: {
                    'authorization': authToken
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
