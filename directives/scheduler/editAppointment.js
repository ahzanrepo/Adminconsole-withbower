/**
 * Created by Pawan on 7/26/2016.
 */
mainApp.directive("editappointment", function ($filter,$uibModal,scheduleBackendService) {
    console.log("Hit");

    return {
        restrict: "EAA",
        scope: {
            context: "=",
            'updateContext': '&'

        },

        templateUrl: 'views/companyConfig/partials/editContext.html',

        link: function (scope) {

            scope.dayListMode=false;
            scope.editMode = false;
            scope.dayList=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
            scope.currentDayList =[];
            scope.newDayList=[];
            scope.dayString;
            scope.optionChanger = function (option) {

                if(option=="RecurrencePattern")
                {
                    if(scope.appointment.RecurrencePattern=="WEEKLY")
                    {
                        scope.dayListMode=true;
                        if( scope.newDayList.length>0)
                        {
                            for(var i=0;i<scope.newDayList.length;i++)
                            {
                                if(i==0)
                                {
                                    scope.dayString=scope.newDayList[i];
                                }
                                else
                                {
                                    scope.dayString=scope.dayString+","+scope.newDayList[i];
                                }
                            }
                        }
                    }
                    else
                    {
                        scope.dayListMode=false;
                    }
                }

            };
            scope.optionChanger("RecurrencePattern");




            scope.editAppointment = function () {
                scope.editMode = !scope.editMode;
                //console.log(scope.applist);
            };

            scope.querySearch = function (query) {
                if(query === "*" || query === "")
                {
                    if(scope.dayList)
                    {
                        return scope.dayList;
                    }
                    else
                    {
                        return [];
                    }

                }
                else
                {
                    //var results = query ? scope.dayList.filter(createFilterFor(query)) : [];
                    //return results;
                    return [];
                }

            };

            if(scope.appointment.DaysOfWeek)
            {
                scope.currentDayList =scope.appointment.DaysOfWeek.split(',');
                scope.newDayList =scope.appointment.DaysOfWeek.split(',');
                if( scope.newDayList.length>0)
                {
                    for(var i=0;i<scope.newDayList.length;i++)
                    {
                        if(i==0)
                        {
                            scope.dayString=scope.newDayList[i];
                        }
                        else
                        {
                            scope.dayString=scope.dayString+","+scope.newDayList[i];
                        }
                    }
                }
            }


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


            scope.showAlert = function (title,content,type) {

                new PNotify({
                    title: title,
                    text: content,
                    type: type,
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

            scope.cancelUpdate=function()
            {
                scope.editMode=false;
            };

            scope.onChipAdd = function (chip) {

                /* scope.currentDayList.push(chip.DayName);*/
                scope.newDayList.push(chip.DayName);
                console.log(scope.currentDayList);


            };
            scope.onChipDelete = function (chip) {

                var index=scope.currentDayList.indexOf(chip);
                console.log("index ",index);
                if(index>-1)
                {
                    scope.currentDayList.splice(index,1);
                    console.log(scope.currentDayList);

                }

                var index=scope.newDayList.indexOf(chip.DayName);
                console.log("index ",index);
                if(index>-1)
                {
                    scope.newDayList.splice(index,1);
                    console.log(scope.currentDayList);

                }


            };


            scope.modifyAppointment = function () {

                scope.appointment.DaysOfWeek=scope.newDayList;

                if( scope.appointment.RecurrencePattern=="NONE"||scope.appointment.RecurrencePattern=="DAILY")
                {
                    scope.appointment.DaysOfWeek=[];
                    scope.newDayList=[];
                    scope.currentDayList=[];

                }


                scheduleBackendService.updateAppointment(scope.appointment).then(function (response) {

                    if(response.data.Exception)
                    {
                        console.info("Error in updating Appointment "+response.data.Exception);
                        scope.showAlert("Error","Failed to update Appointment"+scope.appointment.AppointmentName,"error");
                    }
                    else
                    {
                        scope.showAlert("Success","Appointment updation succeeded"+scope.appointment.AppointmentName,"success");
                        if( scope.newDayList.length>0)
                        {
                            for(var i=0;i<scope.newDayList.length;i++)
                            {
                                if(i==0)
                                {
                                    scope.dayString=scope.newDayList[i];
                                }
                                else
                                {
                                    scope.dayString=scope.dayString+","+scope.newDayList[i];
                                }
                            }
                        }
                        else

                        {
                            scope.dayString='';
                        }
                        //$scope.MasterAppList = response.data.Result;
                    }
                    scope.editMode=false;

                }), function (error) {
                    scope.showAlert("Error","Failed to update Appointment"+scope.appointment.AppointmentName,"error");
                    scope.editMode=false;
                }

                /* if(scope.newDayList.length>0)
                 {
                 for(var i=0;i<scope.newDayList.length;i++)
                 {
                 if(i==0)
                 {

                 }
                 else
                 {
                 scope.appointment.DaysOfWeek= scope.appointment.DaysOfWeek+","+scope.newDayList[i];
                 }

                 if(i==scope.newDayList.length-1)
                 {

                 }

                 }
                 }*/






            };

            scope.deleteAppointment = function () {

                scheduleBackendService.removeAppointment(scope.appointment.id).then(function (response) {

                    if(response.data.Exception)
                    {
                        console.info("Error in deleting Appointment "+response.data.Exception);
                        scope.showAlert("Error","Error in deleting Appointment "+scope.appointment.AppointmentName,"error");
                    }
                    else
                    {
                        scope.showAlert("Success","Appointment deleting succeeded "+scope.appointment.AppointmentName,"success");
                        scope.updateAppointment(scope.appointment);

                    }
                    scope.editMode=false;

                }), function (error) {
                    scope.showAlert("Error","Failed to delete Appointment "+scope.appointment.AppointmentName,"error");
                    scope.editMode=false;
                }

            };

            scope.hideEdit = function () {
                scope.editMode = !scope.editMode;
            }


        }

    }
});