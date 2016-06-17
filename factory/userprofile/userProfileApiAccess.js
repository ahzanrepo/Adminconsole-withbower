/**
 * Created by dinusha on 6/11/2016.
 */

(function() {

    var userProfileApiAccess = function($http)
    {
        var authToken = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkaW51c2hhZGNrIiwianRpIjoiMjViZjZmZTItZjZjNC00ZWJhLWFmODgtNmMxNjIxOTU4OGRiIiwic3ViIjoiNTZhOWU3NTlmYjA3MTkwN2EwMDAwMDAxMjVkOWU4MGI1YzdjNGY5ODQ2NmY5MjExNzk2ZWJmNDMiLCJleHAiOjE4OTI0NDE2NzIsInRlbmFudCI6MSwiY29tcGFueSI6Mywic2NvcGUiOlt7InJlc291cmNlIjoiYWxsIiwiYWN0aW9ucyI6ImFsbCJ9XSwiaWF0IjoxNDYwNDM4MDcyfQ.aPoVPiTtoGFgnKmhdLBTzwTrQRTGWWliYujHP5NONqU';
        var getProfileByName = function(user)
        {
            return $http({
                method: 'GET',
                url: 'http://userservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/User/' + user + '/profile',
                headers: {
                    'authorization': authToken
                }
            }).then(function(resp)
            {
                return resp.data;
            })
        };

        var getUsers = function()
        {
            return $http({
                method: 'GET',
                url: 'http://userservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/Users',
                headers: {
                    'authorization': authToken
                }
            }).then(function(resp)
            {
                return resp.data;
            })
        };

        var addContactToProfile = function(user, contact, type)
        {
            return $http({
                method: 'PUT',
                url: 'http://userservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/User/' + user + '/profile/contact/' + contact,
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
            var jsonStr = JSON.stringify(userObj);
            return $http({
                method: 'POST',
                url: 'http://userservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/User',
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
            profileInfo.birthday = profileInfo.dob.year+"-"+ profileInfo.dob.month+"-" + profileInfo.dob.day;
            var jsonStr = JSON.stringify(profileInfo);

            return $http({
                    method: 'PUT',
                    url: 'http://userservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/User/' + user + '/profile',
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
            return $http({
                method: 'DELETE',
                url: 'http://userservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/User/' + user + '/profile/contact/' + contact,
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
            return $http({
                method: 'DELETE',
                url: 'http://userservice.104.131.67.21.xip.io/DVP/API/1.0.0.0/User/' + username,
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
