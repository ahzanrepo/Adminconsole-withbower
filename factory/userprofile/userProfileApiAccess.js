/**
 * Created by dinusha on 6/11/2016.
 */

(function() {

    var userProfileApiAccess = function($http)
    {
        var authToken = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ3YXJ1bmEiLCJqdGkiOiJhNmE4MzliMS1iYzYyLTQ4ZGEtOTA2OS01NzFiZWIzOWE4ZmIiLCJzdWIiOiJBY2Nlc3MgY2xpZW50IiwiZXhwIjoxNDY2NzYxMjkwLCJ0ZW5hbnQiOjEsImNvbXBhbnkiOjI0LCJhdWQiOiJteWFwcCIsImNvbnRleHQiOnt9LCJzY29wZSI6W3sicmVzb3VyY2UiOiJhcmRzcmVzb3VyY2UiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiYXJkc3JlcXVlc3QiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoidXNlciIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJ1c2VyUHJvZmlsZSIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJvcmdhbmlzYXRpb24iLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSJdfSx7InJlc291cmNlIjoicmVzb3VyY2UiLCJhY3Rpb25zIjpbInJlYWQiXX0seyJyZXNvdXJjZSI6InBhY2thZ2UiLCJhY3Rpb25zIjpbInJlYWQiXX0seyJyZXNvdXJjZSI6ImNvbnNvbGUiLCJhY3Rpb25zIjpbInJlYWQiXX0seyJyZXNvdXJjZSI6InVzZXJTY29wZSIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJ1c2VyQXBwU2NvcGUiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoidXNlck1ldGEiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoidXNlckFwcE1ldGEiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiY2xpZW50IiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6ImNsaWVudFNjb3BlIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InN5c21vbml0b3JpbmciLCJhY3Rpb25zIjpbInJlYWQiXX0seyJyZXNvdXJjZSI6ImRhc2hib2FyZGV2ZW50IiwiYWN0aW9ucyI6WyJyZWFkIl19LHsicmVzb3VyY2UiOiJkYXNoYm9hcmRncmFwaCIsImFjdGlvbnMiOlsicmVhZCJdfV0sImlhdCI6MTQ2NjE1NjQ5MH0.gpRVdXlv9ideKcCxZX4jUGEBXKS7ew_sHm0QSzVT7gI';
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
