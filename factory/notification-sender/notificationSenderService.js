/**
 * Created by Pawan on 10/10/2016.
 */
mainApp.factory('notifiSenderService', function ($http, baseUrls)
{
    return {

        getProfileDetails: function () {
            return $http({
                method: 'GET',
                url:  baseUrls.ardsmonitoringBaseUrl+"MONITORING/resources"
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
            return $http({
                method: 'GET',
                url: baseUrls.UserServiceBaseUrl + "Users"
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
            return $http({
                method: 'POST',
                url: baseUrls.notification + "DVP/API/1.0.0.0/NotificationService/Notification/Broadcast",
                data: notificationData

            }).then(function(response)
            {
                return response.data;
            });
        } ,
        getUserGroupList: function () {
            return $http({
                method: 'GET',
                url: baseUrls.UserServiceBaseUrl+"UserGroups"

            }).then(function(response)
            {
                return response;
            });
        },
        sendNotification: function (notificationData, eventName, eventUuid, level) {
            return $http({
                method: 'POST',
                url: baseUrls.notification + "DVP/API/1.0.0.0/NotificationService/Notification/initiate",

                headers: {
                    'Content-Type': 'application/json',
                    'eventname': eventName,
                    'eventuuid': eventUuid,
                    'eventlevel': level

                },
                data: notificationData

            }).then(function(response)
            {
                return response;
            });
        },
        RemovePersistenceMessage : function (mID) {

            return $http({
                method: 'DELETE',
                url: baseUrls.notification + "/DVP/API/1.0.0.0/NotificationService/PersistenceMessage/"+mID
            }).then(function (response) {
                return response;
            });
        },
         RemoveAllPersistenceMessages : function () {

            return $http({
                method: 'DELETE',
                url: baseUrls.notification + "/DVP/API/1.0.0.0/NotificationService/PersistenceMessages"
            }).then(function (response) {
                return response;
            });
        }


    }
});