/**
 * Created by dinusha on 6/2/2016.
 */
(function() {

  var sipUserApiHandler = function($http, authService, baseUrls)
  {
    var getSIPUsers = function()
    {
      var authToken = authService.GetToken();
      return $http({
        method: 'GET',
        url: baseUrls.sipUserendpoint + 'Users',
        headers: {
          'authorization': authToken
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var validateUsername = function (usr)
    {
      var authToken = authService.GetToken();
      return $http({
        method: 'GET',
        url: baseUrls.sipUserendpoint + 'User/' + usr,
        headers: {
          'authorization': authToken
        }
      }).then(function (resp)
      {
        return resp.data;
      })
    };

    var validateExtension = function(ext)
    {
      var authToken = authService.GetToken();
      return $http({
        method: 'GET',
        url: baseUrls.sipUserendpoint + 'Extension/' + ext,
        headers: {
          'authorization': authToken
        }
      }).then(function (resp) {
        return resp.data;
      })
    };

    var getGroups = function()
    {
      var authToken = authService.GetToken();
      return $http({
        method: 'GET',
        url: baseUrls.sipUserendpoint + 'Groups',
        headers: {
          'authorization': authToken
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var deleteGroup = function(grpId)
    {
      var authToken = authService.GetToken();
      return $http({
        method: 'DELETE',
        url: baseUrls.sipUserendpoint + 'Group/' + grpId,
        headers: {
          'authorization': authToken
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var getGroup = function(id)
    {
      var authToken = authService.GetToken();
      return $http({
        method: 'GET',
        url: baseUrls.sipUserendpoint + 'Group/' + id,
        headers: {
          'authorization': authToken
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var getUsersForGroup = function(id)
    {
      var authToken = authService.GetToken();
      return $http({
        method: 'GET',
        url: baseUrls.sipUserendpoint + 'Users/InGroup/' + id,
        headers: {
          'authorization': authToken
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var getSIPUser = function(username)
    {
      var authToken = authService.GetToken();
      return $http({
        method: 'GET',
        url: baseUrls.sipUserendpoint + 'User/' + username,
        headers: {
          'authorization': authToken
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var getExtension = function(extId)
    {
      var authToken = authService.GetToken();
      return $http({
        method: 'GET',
        url: baseUrls.sipUserendpoint + 'Extension/' + extId,
        headers: {
          'authorization': authToken
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };


    var addUserToGroup = function(usrId, grpId)
    {
      var authToken = authService.GetToken();
      return $http({
        method: 'POST',
        url: baseUrls.sipUserendpoint + usrId + '/AssignToGroup/' + grpId,
        headers: {
          'authorization': authToken
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var removeUserFromGroup = function(usrId, grpId)
    {
      var authToken = authService.GetToken();
      return $http({
        method: 'POST',
        url: baseUrls.sipUserendpoint + usrId + '/RemoveFromGroup/' + grpId,
        headers: {
          'authorization': authToken
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var saveSIPUser = function(usrObj)
    {
      var authToken = authService.GetToken();
      return $http({
        method: 'POST',
        url: baseUrls.sipUserendpoint + 'User',
        headers: {
          'authorization': authToken
        },
        data:usrObj
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var setPublicUser = function(usrObj)
    {
      var authToken = authService.GetToken();
      return $http({
        method: 'POST',
        url: baseUrls.sipUserendpoint + 'DuoWorldUser',
        headers: {
          'authorization': authToken
        },
        data:usrObj
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var saveTransferCodes = function(transCodes)
    {
      var authToken = authService.GetToken();
      return $http({
        method: 'POST',
        url: baseUrls.sipUserendpoint + 'TransferCodes',
        headers: {
          'authorization': authToken
        },
        data:transCodes
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var updateTransferCodes = function(transCodes)
    {
      var authToken = authService.GetToken();
      return $http({
        method: 'PUT',
        url: baseUrls.sipUserendpoint + 'TransferCode/' + transCodes.id,
        headers: {
          'authorization': authToken
        },
        data:transCodes
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var getTransferCodes = function()
    {
      var authToken = authService.GetToken();
      return $http({
        method: 'GET',
        url: baseUrls.sipUserendpoint + 'TransferCode',
        headers: {
          'authorization': authToken
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var saveGroup = function(grpObj)
    {
      var authToken = authService.GetToken();
      return $http({
        method: 'POST',
        url: baseUrls.sipUserendpoint + 'Group',
        headers: {
          'authorization': authToken
        },
        data:grpObj
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var updateGroup = function(grpObj)
    {
      var authToken = authService.GetToken();
      return $http({
        method: 'PUT',
        url: baseUrls.sipUserendpoint + 'Group/' + grpObj.id,
        headers: {
          'authorization': authToken
        },
        data:grpObj
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var getContexts = function()
    {
      var authToken = authService.GetToken();
      return $http({
        method: 'GET',
        url: baseUrls.sipUserendpoint + 'Context',
        headers: {
          'authorization': authToken
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var assignExtensionToUser = function(ext, sipUserId)
    {
      var authToken = authService.GetToken();
      return $http({
        method: 'POST',
        url: baseUrls.sipUserendpoint + 'Extension/' + ext + '/AssignToSipUser/' + sipUserId,
        headers: {
          'authorization': authToken
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var assignExtensionToGroup = function(ext, grpId)
    {
      var authToken = authService.GetToken();
      return $http({
        method: 'POST',
        url: baseUrls.sipUserendpoint + 'Extension/' + ext + '/AssignToGroup/' + grpId,
        headers: {
          'authorization': authToken
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var addNewExtension = function(extObj)
    {
      var authToken = authService.GetToken();
      return $http({
        method: 'POST',
        url: baseUrls.sipUserendpoint + 'Extension',
        headers: {
          'authorization': authToken
        },
        data:extObj
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var deleteExtension = function(ext)
    {
      var authToken = authService.GetToken();
      return $http({
        method: 'DELETE',
        url: baseUrls.sipUserendpoint + 'Extension/' + ext,
        headers: {
          'authorization': authToken
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var getSchedules = function()
    {
      var authToken = authService.GetToken();
      return $http({
        method: 'GET',
        url: baseUrls.limitHandlerUrl + 'LimitAPI/Schedules/byCompany',
        headers: {
          'authorization': authToken
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var getGreetingFileMetadata = function(refId)
    {
      var authToken = authService.GetToken();
      return $http({
        method: 'GET',
        url: baseUrls.fileServiceUrl + 'Files/' + refId + '/PABX/USER/GREETING',
        headers: {
          'authorization': authToken
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var updateUser = function(usrObj)
    {
      var authToken = authService.GetToken();

      return $http({
        method: 'PUT',
        url: baseUrls.sipUserendpoint + 'User/' + usrObj.SipUsername,
        headers: {
          'authorization': authToken
        },
        data: usrObj
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var getDomains = function()
    {
      var authToken = authService.GetToken();
      return $http({
        method: 'GET',
        url: baseUrls.clusterconfigUrl + 'CloudEndUsers',
        headers: {
          'authorization': authToken
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    return {
      getGreetingFileMetadata: getGreetingFileMetadata,
      getSIPUsers: getSIPUsers,
      getSchedules: getSchedules,
      getContexts: getContexts,
      getSIPUser: getSIPUser,
      saveSIPUser: saveSIPUser,
      addNewExtension: addNewExtension,
      assignExtensionToUser: assignExtensionToUser,
      getGroups: getGroups,
      getGroup: getGroup,
      getUsersForGroup: getUsersForGroup,
      addUserToGroup: addUserToGroup,
      saveGroup: saveGroup,
      updateGroup: updateGroup,
      getExtension: getExtension,
      saveTransferCodes: saveTransferCodes,
      updateTransferCodes: updateTransferCodes,
      getTransferCodes: getTransferCodes,
      setPublicUser: setPublicUser,
      updateUser: updateUser,
      getDomains: getDomains,
      removeUserFromGroup: removeUserFromGroup,
      deleteGroup: deleteGroup,
      assignExtensionToGroup: assignExtensionToGroup,
      deleteExtension: deleteExtension,
      validateUsername: validateUsername,
      validateExtension: validateExtension

    };
  };

  var module = angular.module("veeryConsoleApp");
  module.factory("sipUserApiHandler", sipUserApiHandler);

}());
