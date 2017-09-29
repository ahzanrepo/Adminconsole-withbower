/**
 * Created by Pawan on 9/26/2017.
 */
mainApp.factory('queueSettingsBackendService', function ($http, authService,baseUrls) {

    return {

        getQueueSettingRecords: function () {


            return $http({
                method: 'GET',
                url: baseUrls.resourceServiceBaseUrl+"QueueSettings"
            }).then(function(response)
            {
                return response;
            });
        },
        deleteSettingRecord: function (recordID) {

            return $http({
                method: 'DELETE',
                url: baseUrls.resourceServiceBaseUrl+'QueueSetting/'+recordID

            }).then(function(response)
            {
                return response;
            });
        },

        saveQueueSetting: function (record) {

            return $http({
                method: 'POST',
                url: baseUrls.resourceServiceBaseUrl+"QueueSetting",
                data:record

            }).then(function(response)
            {
                return response;
            });
        }

    }
});