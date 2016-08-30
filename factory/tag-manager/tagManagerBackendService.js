/**
 * Created by Pawan on 8/22/2016.
 */
/**
 * Created by Pawan on 6/8/2016.
 */

mainApp.factory('tagBackendService', function ($http, authService,baseUrls)
{
 return {

  getTagCategories: function () {
   var authToken = authService.GetToken();
   return $http({
    method: 'GET',
    url: baseUrls.liteticket+"TagCategories",
    headers: {
     'authorization':authToken
    }
   }).then(function(response)
   {
    return response;
   });
  },

  getTagCategory: function (tagCatID) {
   var authToken = authService.GetToken();
   return $http({
    method: 'GET',
    url: baseUrls.liteticket+"TagCategory"+tagCatID,
    headers: {
     'authorization':authToken
    }
   }).then(function(response)
   {
    return response;
   });
  },

  getTagDetails: function (tagID) {
   var authToken = authService.GetToken();
   return $http({
    method: 'GET',
    url: baseUrls.liteticket+"Tag/"+tagID,
    headers: {
     'authorization':authToken
    }
   }).then(function(response)
   {
    return response;
   });
  },

  getAllTags: function () {
   var authToken = authService.GetToken();
   return $http({
    method: 'GET',
    url: baseUrls.liteticket+"Tags",
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
    url: baseUrls.liteticket+"Tag/"+tagID,
    headers: {
     'authorization':authToken
    },
    data:resource

   }).then(function(response)
   {
    return response;
   });
  },

  saveAndAttachNewTagToCategory: function (tagCatID,resource) {
   var authToken = authService.GetToken();

   return $http({
    method: 'PUT',
    url: baseUrls.liteticket+"TagCategory/"+tagCatID+"/Tag",
    headers: {
     'authorization':authToken
    },
    data:resource

   }).then(function(response)
   {
    return response;
   });
  },

  attachTagToCategory: function (tagCatID,tagID) {
   var authToken = authService.GetToken();

   return $http({
    method: 'PUT',
    url: baseUrls.liteticket+"Tag/"+tagID+"/AttachToCategory/"+tagCatID,
    headers: {
     'authorization':authToken
    }

   }).then(function(response)
   {
    return response;
   });
  },

  detachTagFromTag: function (parentID,childID) {
   var authToken = authService.GetToken();
   return $http({
    method: 'DELETE',
    url: baseUrls.liteticket+"/Tag/"+childID+"/DetachFrom/"+parentID,
    headers: {
     'authorization':authToken
    }
   }).then(function(response)
   {
    return response;
   });
  },

  detachTagFromCategory: function (parentID,childID) {
   var authToken = authService.GetToken();
   return $http({
    method: 'DELETE',
    url: baseUrls.liteticket+"Tag/"+childID+"/DetachFromCategory/"+parentID,
    headers: {
     'authorization':authToken
    }
   }).then(function(response)
   {
    return response;
   });
  },

  attachTagToTag: function (parentTagID,childTagID) {
   var authToken = authService.GetToken();

   return $http({
    method: 'PUT',
    url: baseUrls.liteticket+"Tag/"+childTagID+"/AttachToTag/"+parentTagID,
    headers: {
     'authorization':authToken
    }

   }).then(function(response)
   {
    return response;
   });
  },

  deleteTagFromDB: function (tagID) {
   var authToken = authService.GetToken();
   return $http({
    method: 'DELETE',
    url: baseUrls.liteticket+"Tag/"+tagID,
    headers: {
     'authorization':authToken
    }
   }).then(function(response)
   {
    return response;
   });
  },

  deleteTagCategoryFromDB: function (tagCatID) {
   var authToken = authService.GetToken();
   return $http({
    method: 'DELETE',
    url: baseUrls.liteticket+"TagCategory/"+tagCatID,
    headers: {
     'authorization':authToken
    }
   }).then(function(response)
   {
    return response;
   });
  },

  addNewTagCategory: function (resource) {
   var authToken = authService.GetToken();
   return $http({
    method: 'POST',
    url: baseUrls.liteticket+"TagCategory",
    headers: {
     'authorization':authToken
    },
    data:resource
   }).then(function(response)
   {
    return response;
   });
  },

  addNewTagDetails: function (resource) {
   var authToken = authService.GetToken();
   return $http({
    method: 'POST',
    url: baseUrls.liteticket+"Tag",
    headers: {
     'authorization':authToken
    },
    data:resource
   }).then(function(response)
   {
    return response;
   });
  }


 }
});