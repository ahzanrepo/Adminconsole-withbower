/**
 * Created by dinusha on 12/30/2015.
 */
(function() {

  var pbxAdminApiHandler = function($http, authService)
  {
    var getPABXMasterData = function()
    {

      return $http({
        method: 'GET',
        url: 'http://pbxservice.app.veery.cloud/DVP/API/1.0.0.0/PBXService/PBXMasterData',
        headers: {
          'authorization': authService.GetToken()
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var getFeatureCodes = function()
    {

      return $http({
        method: 'GET',
        url: 'http://pbxservice.app.veery.cloud/DVP/API/1.0.0.0/PBXService/FeatureCodes',
        headers: {
          'authorization': authService.GetToken()
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };



    var savePBXMasterData = function(masterData)
    {
      return $http({
        method: 'POST',
        url: 'http://pbxservice.app.veery.cloud/DVP/API/1.0.0.0/PBXService/PBXMasterData',
        headers: {
          'authorization': authService.GetToken()
        },
        data:JSON.stringify(masterData)
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var saveFeatureCodes = function(fcData)
    {
      return $http({
        method: 'POST',
        url: 'http://pbxservice.app.veery.cloud/DVP/API/1.0.0.0/PBXService/FeatureCodeTemplate',
        headers: {
          'authorization': authService.GetToken()
        },
        data:JSON.stringify(fcData)
      }).then(function(resp)
      {
        return resp.data;
      })
    };


    var getEmergencyNumbers = function()
    {
      return $http({
        method: 'GET',
        url: 'http://sipuserendpointservice.app.veery.cloud/DVP/API/1.0.0.0/SipUser/EmergencyNumbers',
        headers: {
          'authorization': authService.GetToken()
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var getTransferCodes = function()
    {
      return $http({
        method: 'GET',
        url: 'http://sipuserendpointservice.app.veery.cloud/DVP/API/1.0.0.0/SipUser/TransferCode',
        headers: {
          'authorization': authService.GetToken()
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var saveTransferCodes = function(transCodes)
    {
      return $http({
        method: 'POST',
        url: 'http://sipuserendpointservice.app.veery.cloud/DVP/API/1.0.0.0/SipUser/TransferCode',
        headers: {
          'authorization': authService.GetToken()
        },
        data:JSON.stringify(transCodes)
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var deleteEmergencyNumber = function(emergencyNum)
    {
      return $http({
        method: 'DELETE',
        url: 'http://sipuserendpointservice.app.veery.cloud/DVP/API/1.0.0.0/SipUser/EmergencyNumber/' + emergencyNum,
        headers: {
          'authorization': authService.GetToken()
        }
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    var addEmergencyNumber = function(emNum)
    {
      return $http({
        method: 'POST',
        url: 'http://sipuserendpointservice.app.veery.cloud/DVP/API/1.0.0.0/SipUser/EmergencyNumber',
        headers: {
          'authorization': authService.GetToken()
        },
        data:JSON.stringify(emNum)
      }).then(function(resp)
      {
        return resp.data;
      })
    };

    return {
      getPABXMasterData: getPABXMasterData,
      savePBXMasterData: savePBXMasterData,
      getFeatureCodes: getFeatureCodes,
      saveFeatureCodes: saveFeatureCodes,
      getEmergencyNumbers: getEmergencyNumbers,
      deleteEmergencyNumber: deleteEmergencyNumber,
      addEmergencyNumber: addEmergencyNumber,
      getTransferCodes: getTransferCodes,
      saveTransferCodes: saveTransferCodes

    };
  };

  var module = angular.module("veeryConsoleApp");
  module.factory("pbxAdminApiHandler", pbxAdminApiHandler);

}());
