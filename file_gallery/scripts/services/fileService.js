/**
 * Created by Rajinda on 12/31/2015.
 */

var fileModule = angular.module("fileServiceModule", ["download"]);

fileModule.factory("clusterService", function ($http, download,authService,fileServiceUrl) {



  var downloadFile = function (id, fileName) {
    $http({
      url: fileServiceUrl+ "File/Download/" + id + "/" + fileName,
      method: "get",
      //data: json, //this is your json data string
      headers: {
        'Content-type': 'application/json',
        'authorization': authService.Token
      },
      responseType: 'arraybuffer'
    }).success(function (data, status, headers, config) {

      /*
       var blob = new Blob([data], {type: "application/image/png"});
       var objectUrl = URL.createObjectURL(blob);
       window.open(objectUrl);
       */

      var myBlob = new Blob([data]);
      var blobURL = (window.URL || window.webkitURL).createObjectURL(myBlob);
      var anchor = document.createElement("a");
      anchor.download = fileName;
      anchor.href = blobURL;
      anchor.click();

    }).error(function (data, status, headers, config) {
      //upload failed
    });

  };

  var getFiles = function (pageNo) {
    return $http({
      method: 'get',
      url: fileServiceUrl+ 'Files/20/'+pageNo,
      headers: {
        'authorization': authService.Token
      }
    }).then(function (response) {
      return response.data.Result;
    });
  };

  var getFilesCategoryID = function (categoryId,pageNo) {
    return $http({
      method: 'get',
      url: fileServiceUrl+ 'FilesInfo/Category/'+categoryId+'/50/'+pageNo,
      headers: {
        'authorization': authService.Token
      }
    }).then(function (response) {
      return response.data.Result;
    });
  };

  var getFileCountCategoryID = function (categoryId) {
    return $http({
      method: 'get',
      url: fileServiceUrl+ 'File/Count/Category/'+categoryId,
      headers: {
        'authorization': authService.Token
      }
    }).then(function (response) {
      return response.data.Result;
    });
  };

  var deleteFile = function (file) {
    return $http({
      method: 'delete',
      url: fileServiceUrl+'File/' + file.UniqueId,
      headers: {'authorization': authService.Token}
    }).then(function (response) {
      return response.data.IsSuccess;
    });
  };

  var getCatagories = function (token) {

    return $http.get(fileServiceUrl+'FileCategories',
      {
        headers: {'authorization':  authService.Token}
      }
    ).then(function (response) {

        return response.data.Result;
      });

  };

  return {
    GetToken: authService.Token,
    DownloadFile: downloadFile,
    GetFiles: getFiles,
    DeleteFile: deleteFile,
    GetCatagories: getCatagories,
    GetFilesCategoryID:getFilesCategoryID,
    GetFileCountCategoryID:getFileCountCategoryID,
    UploadUrl: fileServiceUrl+ "File/Upload",
    File: {},
    Headers: {'Authorization':  authService.Token}
  }

});

