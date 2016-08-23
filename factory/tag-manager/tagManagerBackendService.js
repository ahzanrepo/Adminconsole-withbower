/**
 * Created by Pawan on 8/22/2016.
 */
/**
 * Created by Pawan on 6/8/2016.
 */

mainApp.factory('tagBackendService', function ($http, authService)
{
    return {

        getTagCategories: function (tagCatID) {
            var authToken = authService.GetToken();
            return $http({
                method: 'GET',
                url: "http://localhost:3636/DVP/API/1.0.0.0/TagCategory/"+tagCatID,
                headers: {
                    'authorization':authToken
                }
            }).then(function(response)
            {
                alert(response.data.Result.name);
                return response;
            });
        },

        getTagDetails: function (tagID) {
            var authToken = authService.GetToken();
            return $http({
                method: 'GET',
                url: "http://localhost:3636/DVP/API/1.0.0.0/Tag/"+tagID,
                headers: {
                    'authorization':authToken
                }
            }).then(function(response)
            {
                return response;
            });
        },

     saveAndAttachNewTag: function (tagID,resource) {
      var authToken = authService.GetToken();

      return $http({
       method: 'POST',
       url: "http://localhost:3636/DVP/API/1.0.0.0/Tag/"+tagID,
       headers: {
        'authorization':authToken
       },
       data:resource

      }).then(function(response)
      {
       return response;
      });
     }
        /*,

         saveNewApplication: function (resource) {
         var authToken = authService.GetToken();

         return $http({
         method: 'POST',
         url: "http://appregistry.app.veery.cloud/DVP/API/1.0.0.0/APPRegistry/Application",
         headers: {
         'authorization':authToken
         },
         data:resource

         }).then(function(response)
         {
         return response;
         });
         },

         assignMasterApplication: function (masterId,childId) {
         var authToken = authService.GetToken();

         return $http({
         method: 'POST',
         url: "http://appregistry.app.veery.cloud/DVP/API/1.0.0.0/APPRegistry/Application/"+childId+"/SetAsMasterApp/"+masterId,
         headers: {
         'authorization':authToken
         }

         }).then(function(response)
         {
         return response;
         });
         },

         updateApplication: function (resource) {
         var authToken = authService.GetToken();

         return $http({
         method: 'PUT',
         url: "http://appregistry.app.veery.cloud/DVP/API/1.0.0.0/APPRegistry/Application/"+resource.id,
         headers: {
         'authorization':authToken
         },
         data:resource

         }).then(function(response)
         {
         return response;
         });
         },

         deleteApplication: function (resource) {

         var authToken = authService.GetToken();
         return $http({
         method: 'DELETE',
         url: "http://appregistry.app.veery.cloud/DVP/API/1.0.0.0/APPRegistry/Application/"+resource.id,
         headers: {
         'authorization':authToken
         }

         }).then(function(response)
         {
         return response;
         });
         },
         getUnassignedFiles: function () {

         var authToken = authService.GetToken();
         return $http({
         method: 'GET',
         url: "http://fileservice.app.veery.cloud/DVP/API/1.0.0.0/FileService/Files?fileCategory=IVRCLIPS&fileFormat=audio/wav&assignedState=false",
         headers: {
         'authorization':authToken
         }

         }).then(function(response)
         {
         return response;
         });
         },
         getFilesOfApplication: function (appID) {

         var authToken = authService.GetToken();
         return $http({
         method: 'GET',
         url: "http://fileservice.app.veery.cloud/DVP/API/1.0.0.0/FileService/Files/Info/"+appID,
         headers: {
         'authorization':authToken
         }

         }).then(function(response)
         {
         return response;
         });
         },

         attachFilesWithApplication: function (appID,fileID) {

         var authToken = authService.GetToken();
         return $http({
         method: 'POST',
         url: "http://fileservice.app.veery.cloud/DVP/API/1.0.0.0/FileService/File/"+fileID+"/AssignToApplication/"+appID,
         headers: {
         'authorization':authToken
         }

         }).then(function(response)
         {
         return response;
         });
         } ,
         detachFilesFromApplication: function (fileID) {

         var authToken = authService.GetToken();
         return $http({
         method: 'POST',
         url: "http://fileservice.app.veery.cloud/DVP/API/1.0.0.0/FileService/File/"+fileID+"/DetachFromApplication",
         headers: {
         'authorization':authToken
         }

         }).then(function(response)
         {
         return response;
         });
         },
         getDevelopers: function () {

         var authToken = authService.GetToken();
         return $http({
         method: 'GET',
         url: "http://appregistry.app.veery.cloud/DVP/API/1.0.0.0/APPRegistry/Developers",
         headers: {
         'authorization':authToken
         }

         }).then(function(response)
         {
         return response;
         });
         },
         ApplicationAssignToDeveloper: function (appId,devId) {

         var authToken = authService.GetToken();

         return $http({
         method: 'POST',
         url: "http://appregistry.app.veery.cloud/DVP/API/1.0.0.0/APPRegistry/Application/"+appId+"/AssignToDeveloper/"+devId,
         headers: {
         'authorization':authToken
         }

         }).then(function(response)
         {
         return response;
         });
         }*/

    }
});