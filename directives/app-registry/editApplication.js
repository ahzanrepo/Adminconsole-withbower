/**
 * Created by Pawan on 6/8/2016.
 */
mainApp.directive("editapplication", function ($filter,$uibModal,appBackendService) {

    return {
        restrict: "EAA",
        scope: {
            application: "=",
            applist: "=",
            'updateApplication': '&',
            'reloadpage':'&'
        },

        templateUrl: 'views/app-registry/partials/editApplication.html',

        link: function (scope) {
            scope.IsDeveloper=false;
            scope.Developers=[];

            scope.MasterApps=[];

            scope.application.id=scope.application.id.toString();
            if(scope.application.MasterApplicationId)
            {
                scope.application.MasterApplicationId=(scope.application.MasterApplicationId).toString();
            }

            if(scope.application.ObjClass=="SYSTEM" )
            {
                scope.IsDeveloper=false;
            }
            else if(scope.application.ObjClass=="DEVELOPER" )
            {
                scope.IsDeveloper=true;
                if(scope.application.AppDeveloperId)
                {
                    scope.application.AppDeveloperId=(scope.application.AppDeveloperId).toString();
                }

            }


            scope.setMasterAppList = function () {

                for(var i=0;i<scope.applist.length;i++)
                {
                    if(scope.applist[i].ObjClass=="SYSTEM")
                    {
                        if(scope.applist[i].MasterApplicationId)
                        {
                            scope.applist[i].MasterApplicationId=scope.applist[i].MasterApplicationId.toString();


                        }

                        scope.MasterApps.push(scope.applist[i]);


                    }
                }

            };

            scope.setMasterAppList();

            scope.getAllDevelopers = function () {
                appBackendService.getDevelopers().then(function (response) {

                    if(response.data.IsSuccess)
                    {
                        scope.Developers=response.data.Result;
                    }
                    else
                    {
                        console.log("Error in loading all developers ",response.data.Exception);
                    }
                }, function (error) {
                    console.log("Exception in loading all developers ",error);
                })
            };

            scope.getAllDevelopers();

            scope.editMode = false;

            scope.editApplication = function () {
                scope.editMode = !scope.editMode;
                console.log(scope.applist);
            };

            scope.changeApplicationType = function (appType) {
                if(appType=="SYSTEM")
                {
                    scope.IsDeveloper=false;
                    scope.application.AppDeveloperId=null;
                }
                else
                {
                    scope.IsDeveloper=true;
                }
            };


            scope.UpdateApplication = function () {

                if(scope.application.ObjClass=="SYSTEM")
                {
                    scope.application.AppDeveloperId=null;
                }
                appBackendService.updateApplication(scope.application).then(function (response) {
                    if(response.data.IsSuccess)
                    {
                        //scope.updateRecource(scope.application);
                        appBackendService.ApplicationAssignToDeveloper(scope.application.id,scope.application.AppDeveloperId).then(function (Assignresponse) {
                            if(Assignresponse.data.IsSuccess)
                            {
                                console.log("Application "+scope.application.id+" : "+scope.application.AppName+" Assigned to Developer "+scope.application.AppDeveloperId);
                                scope.reloadpage();
                            }
                            else
                            {
                                console.log("Error in assigning application "+scope.application.AppName+ " to Developer "+scope.application.AppDeveloperId);
                                scope.reloadpage();
                            }
                        }, function (Assignerror) {
                            console.log("Exception in assigning application "+scope.application.AppName+ " to Developer "+scope.application.AppDeveloperId,Assignerror);
                            scope.reloadpage();
                        });

                        //scope.editMode=false;



                    }
                    else
                    {
                        console.info("Error in updating app "+response.data.Exception);
                    }

                }, function (error) {
                    console.info("Error in updating application "+error);
                });
            };


            scope.removeApplication = function (item) {

                scope.showConfirm("Delete File", "Delete", "ok", "cancel", "Do you want to delete " + item.AppName, function (obj) {

                    appBackendService.deleteApplication(scope.application).then(function (response) {
                        if (response) {
                            scope.updateApplication(item);
                            scope.showAlert("Deleted", "Deleted", "ok", "File " + item.AppName + " Deleted successfully");
                        }
                        else
                            scope.showAlert("Error", "Error", "ok", "There is an error ");
                    }, function (error) {
                        scope.showAlert("Error", "Error", "ok", "There is an error ");
                    });

                }, function () {

                }, item);


            };

            scope.showConfirm = function (tittle, label, okbutton, cancelbutton, content, OkCallback, CancelCallBack, okObj) {

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

            scope.selectionsChanged = function () {

                appBackendService.assignMasterApplication(scope.application.MasterApplicationId,scope.application.id).then(function (response) {


                    if(!response.data.IsSuccess)
                    {
                        console.info("Master app Assigning failed "+response.data.Exception);
                    }
                    else
                    {
                        console.info("Master app Assigning Success ");
                    }


                }, function (error) {

                    console.info("Master app Assigning error "+error);
                });

            };




            scope.showAlert = function (tittle, label, button, content) {

                new PNotify({
                    title: tittle,
                    text: content,
                    type: 'notice',
                    styling: 'bootstrap3'
                });
            };

            scope.showConig= function (appid) {
                //modal show
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'views/app-registry/partials/appConfigModal.html',
                    controller: 'modalController',
                    size: 'sm',
                    resolve: {
                        appID: function () {
                            return appid;
                        }
                    }
                });
            };
        }

    }
});