/**
 * Created by Rajinda on 12/31/2015.
 */

var fileModule = angular.module("fileServiceModule", ["download"]);

fileModule.factory("fileService", function ($http, download,authService,baseUrls) {



  var downloadFile = function (id, fileName) {
    $http({
      url: baseUrls.fileServiceUrl+ "File/Download/" + id + "/" + fileName,
      method: "get",
      //data: json, //this is your json data string
      headers: {
        'Content-type': 'application/json',
        'authorization': authService.GetToken()
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

  var getFiles = function (pageSize,pageNo) {
    return $http({
      method: 'get',
      url: baseUrls.fileServiceUrl+ 'Files/50/'+pageNo,
      headers: {
        'authorization': authService.GetToken()
      }
    }).then(function (response) {
      return response.data.Result;
    });
  };

  /*
  var searchFiles = function (categoryId,startTime,endTime) {
    return $http({
      method: 'get',
      url: baseUrls.fileServiceUrl+ 'Files/infoByCategoryID/'+categoryId+'?startDateTime='+startTime+'&endDateTime='+endTime,
      headers: {
        'authorization': authService.GetToken()
      }
    }).then(function (response) {
      return response.data.Result;
    });
  };
  */
  var searchFiles = function (categoryId,startTime,endTime) {
    return $http({
      method: 'get',
      url: baseUrls.fileServiceUrl+ 'Files/infoByCategoryID/'+categoryId,
      params: [{startDateTime: startTime},{endDateTime:endTime}],
      headers: {
        'authorization': authService.GetToken()
      }
    }).then(function (response) {
      return response.data.Result;
    });
  };

  var getFilesCategoryID = function (categoryId,pageSize,pageNo) {
    return $http({
      method: 'get',
      url: baseUrls.fileServiceUrl+ 'FilesInfo/Category/'+categoryId+'/'+pageSize+'/'+pageNo,
      headers: {
        'authorization': authService.GetToken()
      }
    }).then(function (response) {
      return response.data.Result;
    });
  };

  var getFileCountCategoryID = function (categoryId) {
    return $http({
      method: 'get',
      url: baseUrls.fileServiceUrl+ 'File/Count/Category/'+categoryId,
      headers: {
        'authorization': authService.GetToken()
      }
    }).then(function (response) {
      return response.data.Result;
    });
  };

  var deleteFile = function (file) {
    return $http({
      method: 'delete',
      url: baseUrls.fileServiceUrl+'File/' + file.UniqueId,
      headers: {'authorization': authService.GetToken()}
    }).then(function (response) {
      return response.data.IsSuccess;
    });
  };

  var getCatagories = function (token) {

    return $http.get(baseUrls.fileServiceUrl+'FileCategories',
      {
        headers: {'authorization':  authService.GetToken()}
      }
    ).then(function (response) {

        return response.data.Result;
      });

  };

  return {
    GetToken: authService.GetToken(),
    DownloadFile: downloadFile,
    GetFiles: getFiles,
    SearchFiles: searchFiles,
    DeleteFile: deleteFile,
    GetCatagories: getCatagories,
    GetFilesCategoryID:getFilesCategoryID,
    GetFileCountCategoryID:getFileCountCategoryID,
    UploadUrl: baseUrls.fileServiceUrl+ "File/Upload",
    File: {},
    Headers: {'Authorization':  authService.GetToken()}
  }

});

