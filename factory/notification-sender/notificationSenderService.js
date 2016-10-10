/**
 * Created by Pawan on 10/10/2016.
 */
mainApp.factory('notifiSenderService', function ($http, authService)
{
    return {

        getProfileDetails: function () {
            var authToken = authService.GetToken();
            return $http({
                method: 'GET',
                url:  baseUrls.ardsmonitoringBaseUrl+"MONITORING/resources",
                headers: {
                    'authorization':authToken
                }
            }).then(function(response)
            {
                if (response.data && response.data.IsSuccess) {
                    return response.data.Result;
                } else {
                    return 0;
                }
            });
        },

        getUserList: function () {
            var authToken = authService.GetToken();
            return $http({
                method: 'GET',
                url: baseUrls.UserServiceBaseUrl + "Users",
                headers: {
                    'authorization':authToken
                }
            }).then(function(response)
            {
                if (response.data && response.data.IsSuccess) {
                    return response.data.Result;
                } else {
                    return 0;
                }
            });
        },

        broadcastNotification: function (notificationData) {
            var authToken = authService.GetToken();
            return $http({
                method: 'POST',
                url: baseUrls.notification + "NotificationService/Notification/Broadcast",
                headers: {
                    'authorization':authToken
                },
                data: notificationData

            }).then(function(response)
            {
                return response.data;
            });
        } ,
        getUserGroupList: function () {
            var authToken = authService.GetToken();
            return $http({
                method: 'GET',
                url: baseUrls.UserServiceBaseUrl+"UserGroups",
                headers: {
                    'authorization':authToken
                }

            }).then(function(response)
            {
                return response;
            });
        },
        sendNotification: function (notificationData, eventName, eventUuid) {
            var authToken = authService.GetToken();
            return $http({
                method: 'POST',
                url: baseUrls.notification + "NotificationService/Notification/initiate",

                headers: {
                    'authorization': authToken,
                    'Content-Type': 'application/json',
                    'eventname': eventName,
                    'eventuuid': eventUuid
                },
                data: notificationData

            }).then(function(response)
            {
                return response;
            });
        }



    }
});