mainApp.factory('twitterService', function ($q, $http, baseUrls) {

    var authorizationResult = false;

    return {
        initialize: function () {
            //initialize OAuth.io with public key of the application
            OAuth.initialize('mLdYPWjwkq8lAsaGtPfopq039Uk', {cache: true});
            //try to create an authorization result when the page loads, this means a returning user won't have to click the twitter button again
            authorizationResult = OAuth.create('twitter');
        },
        isReady: function () {
            return (authorizationResult);
        },
        connectTwitter: function () {
            var deferred = $q.defer();
            OAuth.popup('twitter', {cache: true}, function (error, result) { //cache means to execute the callback if the tokens are already present
                if (!error) {
                    authorizationResult = result;
                    deferred.resolve();
                } else {
                    //do something if there's an error
                }
            });
            return deferred.promise;
        },
        getAuth: function () {
            return authorizationResult;
        },
        clearCache: function () {
            OAuth.clearCache('twitter');
            authorizationResult = false;
        },
        getLatestTweets: function () {
            //create a deferred object using Angular's $q service
            var deferred = $q.defer();
            var promise = authorizationResult.me().done(function (data) { //https://dev.twitter.com/docs/api/1.1/get/statuses/home_timeline
                //when the data is retrieved resolved the deferred object
                deferred.resolve(data)
            });
            //return the promise of the deferred object
            return deferred.promise;
        },
        addTwitterAccountToSystem: function (postData) {
            postData.access_token_key = authorizationResult.oauth_token;
            postData.access_token_secret = authorizationResult.oauth_token_secret;

            return $http({
                method: 'POST',
                url: baseUrls.socialConnectorUrl + "Twitter",
                data: postData
            }).then(function (response) {
                if (response.data && response.data.IsSuccess) {
                    return response.data.Result;
                } else {
                    return false;
                }
            });
        },

        getTwitterAccounts: function () {
            return $http({
                method: 'GET',
                url: baseUrls.socialConnectorUrl + "Twitters"
            }).then(function (response) {
                if (response.data && response.data.IsSuccess) {
                    return response.data.Result;
                } else {
                    return undefined;
                }
            });
        },

        deleteTwitterAccount: function (id) {
            return $http({
                method: 'DELETE',
                url: baseUrls.socialConnectorUrl + "Twitter/" + id
            }).then(function (response) {
                if (response.data && response.data.IsSuccess) {
                    return response.data.IsSuccess;
                } else {
                    return false;
                }
            });
        },

        activateTwitterAccount: function (id) {
            var postData = {
                access_token_key: authorizationResult.oauth_token,
                access_token_secret: authorizationResult.oauth_token_secret
            };
            return $http({
                method: 'PUT',
                url: baseUrls.socialConnectorUrl + "Twitter/" + id+"/activate",
                data: postData
            }).then(function (response) {
                if (response.data && response.data.IsSuccess) {
                    return response.data.IsSuccess;
                } else {
                    return false;
                }
            });
        },
        startCronJob: function (id) {

            return $http({
                method: 'POST',
                url: baseUrls.socialConnectorUrl + "Twitter/"+id+"/Cron/Start"
            }).then(function (response) {
                if (response.data && response.data.IsSuccess) {
                    return response.data.IsSuccess;
                } else {
                    return false;
                }
            });
        },

        updateTwitterAccountPicture: function (id, postData) {
            return $http({
                method: 'PUT',
                url: baseUrls.socialConnectorUrl + "Twitter/" + id + "/picture",
                data: postData
            }).then(function (response) {
                if (response.data && response.data.IsSuccess) {
                    return response.data.IsSuccess;
                } else {
                    return false;
                }
            });
        }
    }

});