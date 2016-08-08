/**
 * Created by dinusha on 6/11/2016.
 */

(function() {

    var myUserProfileApiAccess = function($http, authService)
    {


        var getMyProfile = function()
        {
            var authToken = authService.GetToken();
            return $http({
                method: 'GET',
                url: 'http://userservice.app.veery.cloud/DVP/API/1.0.0.0/Myprofile',
                headers: {
                    'authorization': authToken
                }
            }).then(function(resp)
            {
                return resp.data;
            })
        };




        var addContactToMyProfile = function( contact, type)
        {
            var authToken = authService.GetToken();
            return $http({
                method: 'PUT',
                url: 'http://userservice.app.veery.cloud/DVP/API/1.0.0.0/Myprofile/contact/' + contact,
                headers: {
                    'authorization': authToken
                },
                data:{
                    type: type
                }
            }).then(function(resp)
            {
                return resp.data;
            })
        };



        var updateMyProfile = function(profileInfo)
        {
            var authToken = authService.GetToken();
            profileInfo.birthday = profileInfo.dob.year+"-"+ profileInfo.dob.month+"-" + profileInfo.dob.day;
            var jsonStr = JSON.stringify(profileInfo);

            return $http({
                    method: 'PUT',
                    url: 'http://userservice.app.veery.cloud/DVP/API/1.0.0.0/Myprofile',
                    headers: {
                        'authorization': authToken
                    },
                    data:jsonStr
                }).then(function(resp)
                {
                    return resp.data;
                })
        }

        var deleteContactFromMyProfile = function( contact)
        {
            var authToken = authService.GetToken();
            return $http({
                method: 'DELETE',
                url: 'http://userservice.app.veery.cloud/DVP/API/1.0.0.0/Myprofile/contact/' + contact,
                headers: {
                    'authorization': authToken
                }
            }).then(function(resp)
            {
                return resp.data;
            })
        };



        return {
            addContactToProfile: addContactToMyProfile,
            deleteContactFromMyProfile: deleteContactFromMyProfile,
            updateMyProfile: updateMyProfile,
            getMyProfile: getMyProfile
        };
    };



    var module = angular.module("veeryConsoleApp");
    module.factory("myUserProfileApiAccess", myUserProfileApiAccess);

}());
