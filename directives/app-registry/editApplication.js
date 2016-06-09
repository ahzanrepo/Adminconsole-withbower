/**
 * Created by Pawan on 6/8/2016.
 */
mainApp.directive("editapplication", function ($filter,appBackendService,$state) {

    return {
        restrict: "EAA",
        scope: {
            application: "=",
            applist: "=",
            'updateRecource': '&',
            'reloadpage':'&'
        },

        templateUrl: 'views/app-registry/partials/editApplication.html',

        link: function (scope) {

            scope.MasterApps=[];

            scope.application.id=scope.application.id.toString();
            if(scope.application.MasterApplicationId)
            {
                scope.application.MasterApplicationId=(scope.application.MasterApplicationId).toString();
            }


            scope.setMasterAppList = function () {

                for(var i=0;i<scope.applist.length;i++)
                {
                    if(scope.applist[i].ObjClass=="SYSTEM")
                    {
                        if(scope.applist[i].MasterApplicationId)
                        {
                            scope.applist[i].MasterApplicationId=scope.applist[i].MasterApplicationId.toString();
                            console.log(scope.applist[i]);


                        }

                        scope.MasterApps.push(scope.applist[i]);


                    }
                }

            };

            scope.setMasterAppList();

            /*$(document).ready(function () {
             angular.forEach(scope.resource.ResResourceTask, function(item){
             if(item){

             var items = $filter('filter')(scope.tasks, {TaskId: item.TaskId})
             if (items) {
             var index = scope.tasks.indexOf(items[0]);
             scope.attachedTasks.push(scope.tasks[index]);
             }
             }
             });

             scope.resource.tasks = scope.attachedTasks;

             $(".select2_multiple").select2({
             placeholder: "Select Tasks",
             allowClear: true
             });
             });*/

            console.log("yoooooo "+JSON.stringify(scope.applist));
            console.log("xoooooo "+JSON.stringify(scope.application));
            console.log(typeof ( scope.application.MasterApplicationId));

            scope.editMode = false;

            scope.editApplication = function () {
                scope.editMode = !scope.editMode;
                console.log(scope.applist);
                console.log("Hit");
            };

            scope.UpdateApplication = function () {

                appBackendService.updateApplication(scope.application).then(function (response) {
                    if(response.data.IsSuccess)
                    {
                        //scope.updateRecource(scope.application);
                        scope.reloadpage();
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
                            scope.updateRecource(item);
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

                console.log("Child "+scope.application.id);
                console.log("type child "+typeof (scope.application.id));
                console.log("Master "+scope.application.MasterApplicationId);
                console.log("type Master "+typeof (scope.application.MasterApplicationId));
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
        }

    }
});