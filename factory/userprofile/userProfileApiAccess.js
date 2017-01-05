/**
 * Created by dinusha on 6/11/2016.
 */

(function() {

    var userProfileApiAccess = function($http, authService, baseUrls)
    {

        var getProfileByName = function(user)
        {

            return $http({
                method: 'GET',
                url: baseUrls.UserServiceBaseUrl + 'User/' + user + '/profile'

            }).then(function(resp)
            {
                return resp.data;
            })
        };

        var getUsers = function()
        {

            return $http({
                method: 'GET',
                url: baseUrls.UserServiceBaseUrl + 'Users'
            }).then(function(resp)
            {
                return resp.data;
            })
        };


        var addContactToProfile = function(user, contact, type)
        {
            return $http({
                method: 'PUT',
                url: baseUrls.UserServiceBaseUrl + 'User/' + user + '/profile/contact/' + contact,
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
                url: baseUrls.UserServiceBaseUrl + 'User',
                data:jsonStr
            }).then(function(resp)
            {
                return resp.data;
            })
        };

        var updateProfile = function(user, profileInfo)
        {

            delete profileInfo.email;

            profileInfo.birthday = profileInfo.dob.year+"-"+ profileInfo.dob.month+"-" + profileInfo.dob.day;
            var jsonStr = JSON.stringify(profileInfo);

            return $http({
                    method: 'PUT',
                    url: baseUrls.UserServiceBaseUrl + 'User/' + user + '/profile',
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
                url: baseUrls.UserServiceBaseUrl + 'User/' + user + '/profile/contact/' + contact
            }).then(function(resp)
            {
                return resp.data;
            })
        };

        var deleteUser = function(username)
        {
            return $http({
                method: 'DELETE',
                url: baseUrls.UserServiceBaseUrl + 'User/' + username
            }).then(function(resp)
            {
                return resp.data;
            })
        };

        var getUserGroups = function()
        {

            return $http({
                method: 'GET',
                url: baseUrls.UserServiceBaseUrl + 'UserGroups'
            }).then(function(resp)
            {
                return resp.data;
            })
        };
        var getGroupMembers = function(groupID)
        {

            return $http({
                method: 'GET',
                url: baseUrls.UserServiceBaseUrl + 'UserGroup/'+groupID+"/members",
            }).then(function(resp)
            {
                return resp.data;
            })
        };

        var addUserGroup = function(userObj)
        {

            return $http({
                method: 'POST',
                url: baseUrls.UserServiceBaseUrl + 'UserGroup',
                data:userObj
            }).then(function(resp)
            {
                return resp.data;
            })
        };
        var removeUserFromGroup = function(gripID,userID)
        {

            return $http({
                method: 'DELETE',
                url: baseUrls.UserServiceBaseUrl + 'UserGroup/'+gripID+"/User/"+userID
            }).then(function(resp)
            {
                return resp.data;
            })
        };
        var addMemberToGroup = function(gripID,userID)
        {

            return $http({
                method: 'PUT',
                url: baseUrls.UserServiceBaseUrl + 'UserGroup/'+gripID+"/User/"+userID
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
            deleteUser: deleteUser,
            addUserGroup:addUserGroup,
            getUserGroups:getUserGroups,
            removeUserFromGroup:removeUserFromGroup,
            getGroupMembers:getGroupMembers,
            addMemberToGroup:addMemberToGroup
        };
    };



    var module = angular.module("veeryConsoleApp");
    module.factory("userProfileApiAccess", userProfileApiAccess);

}());
