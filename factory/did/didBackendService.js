/**
 * Created by Pawan on 6/30/2016.
 */


mainApp.factory('didBackendService', function ($http, authService) {

    return {

        getDidRecords: function () {
            var authToken = authService.GetToken();
            return $http({
                method: 'GET',
                url: 'http://sipuserendpointservice.app.veery.cloud/DVP/API/1.0.0.0/SipUser/DidNumbers',
                headers: {
                    'authorization': authToken
                }})
                .then(function(response){
                    return response;
                });
        },
        deleteDidRecords: function (id) {
            var authToken = authService.GetToken();
            return $http({
                method: 'DELETE',
                url: 'http://sipuserendpointservice.app.veery.cloud/DVP/API/1.0.0.0/SipUser/DidNumber/'+id,
                headers: {
                    'authorization': authToken
                }})
                .then(function(response){
                    return response;
                });
        },
        pickExtensionRecords: function () {
            var authToken = authService.GetToken();
            return $http({
                method: 'GET',
                url: 'http://sipuserendpointservice.app.veery.cloud/DVP/API/1.0.0.0/SipUser/Extensions',
                headers: {
                    'authorization': authToken
                }})
                .then(function(response){
                    return response;
                });
        },
        updateDidExtension: function (didNum,extension) {
            var authToken = authService.GetToken();
            return $http({
                method: 'POST',
                url: 'http://sipuserendpointservice.app.veery.cloud/DVP/API/1.0.0.0/SipUser/DidNumber/'+didNum+'/AssignToExt/'+extension,
                headers: {
                    'authorization': authToken
                }})
                .then(function(response){
                    return response;
                });
        },
        addNewDidNumber: function (didData) {
            console.log("Did Data "+JSON.stringify(didData));
            var authToken = authService.GetToken();
            return $http({
                method: 'POST',
                url: "http://sipuserendpointservice.app.veery.cloud/DVP/API/1.0.0.0/SipUser/DidNumber",
                headers: {
                    'authorization':authToken
                },
                data:didData

            }).then(function(response)
            {
                return response;
            });
        },
        pickPhoneNumbers: function () {
            console.log("Did Data "+JSON.stringify(didData));
            var authToken = authService.GetToken();
            return $http({
                method: 'POST',
                url: "http://sipuserendpointservice.app.veery.cloud/DVP/API/1.0.0.0/SipUser/DidNumber",
                headers: {
                    'authorization':authToken
                },
                data:didData

            }).then(function(response)
            {
                return response;
            });
        },


    }
});