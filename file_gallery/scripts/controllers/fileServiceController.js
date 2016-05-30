var app = angular.module("veeryConsoleApp");

app.controller('FileEditController', ['$scope', '$filter', 'FileUploader', 'clusterService', function ($scope, $filter, FileUploader, clusterService) {
  $scope.file = {};
  var uploader = $scope.uploader = new FileUploader({
    url: clusterService.UploadUrl,
    headers: clusterService.Headers
  });

  // FILTERS

  uploader.filters.push({
    name: 'customFilter',
    fn: function (item /*{File|FileLikeObject}*/, options) {
      return this.queue.length < 10;
    }
  });

  //uploader.formData.push({'DuoType' : 'fax'});

  // CALLBACKS

  uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
    console.info('onWhenAddingFileFailed', item, filter, options);
  };
  uploader.onAfterAddingFile = function (fileItem) {
    console.info('onAfterAddingFile', fileItem);
  };
  uploader.onAfterAddingAll = function (addedFileItems) {
    if (!$scope.file.category) {
      uploader.clearQueue();
      new PNotify({
        title: 'File Upload!',
        text: 'Please Select File Category.',
        type: 'notice',
        styling: 'bootstrap3'
      });
      return;
    }
    console.info('onAfterAddingAll', addedFileItems);
  };
  uploader.onBeforeUploadItem = function (item) {
    item.formData.push({'fileCategory': $scope.file.category});
    console.info('onBeforeUploadItem', item);
  };
  uploader.onProgressItem = function (fileItem, progress) {
    console.info('onProgressItem', fileItem, progress);
  };
  uploader.onProgressAll = function (progress) {
    console.info('onProgressAll', progress);
  };
  uploader.onSuccessItem = function (fileItem, response, status, headers) {
    console.info('onSuccessItem', fileItem, response, status, headers);
  };
  uploader.onErrorItem = function (fileItem, response, status, headers) {
    console.info('onErrorItem', fileItem, response, status, headers);
  };
  uploader.onCancelItem = function (fileItem, response, status, headers) {
    console.info('onCancelItem', fileItem, response, status, headers);
  };
  uploader.onCompleteItem = function (fileItem, response, status, headers) {
    console.info('onCompleteItem', fileItem, response, status, headers);
  };
  uploader.onCompleteAll = function () {
    console.info('onCompleteAll');
  };

  console.info('uploader', uploader);

  $scope.file = {};
  $scope.loadFileService = function () {
    clusterService.GetCatagories().then(function (response) {

      $scope.Categorys = $filter('filter')(response, {Owner: "user"});

    }, function (error) {
      console.info("GetCatagories err" + error);

    });
  };

  $scope.loadFileService();


}]);

app.controller("FileListController", function ($scope, $location, $log, $filter, $http, clusterService, fileServiceInternalUrl) {

  $scope.internalUrl = fileServiceInternalUrl;
  $scope.isImage = function (source) {
    Utils.isImage(source).then(function (result) {
      $log.debug("isImage" + result);
      return result;
    });
  };

  $scope.FileCounts = [];
  $scope.loadCatagories = function () {
    clusterService.GetCatagories().then(function (response) {
      var ids = $filter('filter')(response, {Owner: "user"});
      angular.forEach(ids, function (item) {
        clusterService.GetFileCountCategoryID(item.id).then(function (counts) {
          if (counts) {
            $scope.FileCounts.push(counts);
            console.info("GetFileCountCategoryID : " + $scope.FileCounts);
          }
        }, function (error) {
          console.info("GetFileCountCategoryID err" + error);
        });
      });
    }, function (error) {
      console.info("GetCatagories err" + error);

    });
  };
  $scope.loadCatagories();

  $scope.files = [];
  $scope.loadFileList = function () {
    clusterService.GetFiles(1).then(function (response) {
      $scope.files = response;

    }, function (err) {
    });
  };
  $scope.loadFileList();

  $scope.getFilesCategoryID = function (categoryId, pageNo) {
    clusterService.GetFilesCategoryID(categoryId, pageNo).then(function (response) {
      $scope.files = response;
    }, function (err) {
    });
  };

  $scope.showConfirm = function (tittle, label, okbutton, cancelbutton, content, OkCallback, CancelCallBack, okObj) {

    (new PNotify({
      title: tittle,
      text: content,
      icon: 'glyphicon glyphicon-question-sign',
      hide: false,
      confirm: {
        confirm: true
      },
      buttons: {
        closer: false,
        sticker: false
      },
      history: {
        history: false
      }
    })).get().on('pnotify.confirm', function () {
        OkCallback("confirm");
      }).on('pnotify.cancel', function () {

      });

  };

  $scope.showAlert = function (tittle, label, button, content) {

    new PNotify({
      title: tittle,
      text: content,
      type: 'notice',
      styling: 'bootstrap3'
    });
  };

  $scope.deleteFile = function (file) {

    $scope.showConfirm("Delete File", "Delete", "ok", "cancel", "Do you want to delete " + file.Filename, function (obj) {

      clusterService.DeleteFile(file, $scope.Headers).then(function (response) {
        if (response) {
          $location.path("/file/list");
          $scope.showAlert("Deleted", "Deleted", "ok", "File " + file.Filename + " Deleted successfully");
        }

        else
          $scope.showAlert("Error", "Error", "ok", "There is an error ");
      }, function (error) {
        $scope.showAlert("Error", "Error", "ok", "There is an error ");
      });

    }, function () {

    }, file)
  };

  $scope.downloadFile = function (file) {
    clusterService.DownloadFile(file.UniqueId, file.Filename);
  };


  $scope.GetToken = function () {
    clusterService.Headers = {'Authorization': clusterService.GetToken};
  };
  $scope.GetToken();

});

app.controller('SidebarController', function ($scope, sidebar) {
    $scope.sidebar = sidebar;
  }
);

app.controller('VideoController', function ($sce, $scope) {
    $scope.playVideo = function (file) {
      $scope.sources = [
        {
          src: $sce.trustAsResourceUrl("http://0.s3.envato.com/h264-video-previews/80fad324-9db4-11e3-bf3d-0050569255a8/490527.mp4"),
          type: "video/mp4"
        }
      ];
    };

    this.config = {
      preload: "none",
      sources: [
        {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.mp4"), type: "video/mp4"}
      ]
    };
  }
);

app.directive('onErrorSrc', function () {
  return {
    link: function (scope, element, attrs) {
      element.bind('error', function () {
        if (attrs.src != attrs.onErrorSrc) {
          attrs.$set('src', attrs.onErrorSrc);
        }
      });
    }
  }
});
