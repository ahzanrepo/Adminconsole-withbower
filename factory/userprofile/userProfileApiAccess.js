/**
 * Created by dinusha on 6/11/2016.
 */

(function() {

    var userProfileApiAccess = function($http, authService)
    {

        var getProfileByName = function(user)
        {
            var authToken = authService.GetToken();
            return $http({
                method: 'GET',
                url: 'http://localhost:3637/DVP/API/1.0.0.0/User/' + user + '/profile'

            }).then(function(resp)
            {
                return resp.data;
            })
        };

        var getUsers = function()
        {
            var authToken = authService.GetToken();
            return $http({
                method: 'GET',
                url: 'http://localhost:3637/DVP/API/1.0.0.0/Users'
            }).then(function(resp)
            {
                return resp.data;
            })
        };

        var addContactToProfile = function(user, contact, type)
        {
            var authToken = authService.GetToken();
            return $http({
                method: 'PUT',
                url: 'http://localhost:3637/DVP/API/1.0.0.0/User/' + user + '/profile/contact/' + contact,
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

        var addUser = function(userObj)
        {
            var authToken = authService.GetToken();
            var jsonStr = JSON.stringify(userObj);
            return $http({
                method: 'POST',
                url: 'http://localhost:3637/DVP/API/1.0.0.0/User',
                headers: {
                    'authorization': authToken
                },
                data:jsonStr
            }).then(function(resp)
            {
                return resp.data;
            })
        };

        var updateProfile = function(user, profileInfo)
        {
            var authToken = authService.GetToken();
            profileInfo.birthday = profileInfo.dob.year+"-"+ profileInfo.dob.month+"-" + profileInfo.dob.day;
            var jsonStr = JSON.stringify(profileInfo);

            return $http({
                    method: 'PUT',
                    url: 'http://localhost:3637/DVP/API/1.0.0.0/User/' + user + '/profile',
                    headers: {
                        'authorization': authToken
                    },
                    data:jsonStr
                }).then(function(resp)
                {
                    return resp.data;
                })
        }

        var deleteContactFromProfile = function(user, contact)
        {
            var authToken = authService.GetToken();
            return $http({
                method: 'DELETE',
                url: 'http://localhost:3637/DVP/API/1.0.0.0/User/' + user + '/profile/contact/' + contact,
                headers: {
                    'authorization': authToken
                }
            }).then(function(resp)
            {
                return resp.data;
            })
        };

        var deleteUser = function(username)
        {
            var authToken = authService.GetToken();
            return $http({
                method: 'DELETE',
                url: 'http://localhost:3637/DVP/API/1.0.0.0/User/' + username,
                headers: {
                    'authorization': authToken
                }
            }).then(function(resp)
            {
                return resp.data;
            })
        };

        return {
            getProfileByName: getProfileByName,
            addContactToProfile: addContactToProfile,
            deleteContactFromProfile: deleteContactFromProfile,
            updateProfile: updateProfile,
            getUsers: getUsers,
            addUser: addUser,
            deleteUser: deleteUser
        };
    };



    var module = angular.module("veeryConsoleApp");
    module.factory("userProfileApiAccess", userProfileApiAccess);

}());
