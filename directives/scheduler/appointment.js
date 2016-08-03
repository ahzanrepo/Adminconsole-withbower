/**
 * Created by Pawan on 7/26/2016.
 */
mainApp.directive("appointmentdir", function ($filter,$uibModal,scheduleBackendService) {
    console.log("Hit");

    return {
        restrict: "EAA",
        scope: {
            schedule:"=",
            'viewAction':'&'
        },

        templateUrl: 'views/scheduler/appointments.html',

        link: function (scope) {
            scope.AppointmetList=[];
            scope.dayListMode=false;
            scope.newDayList=[];
            // scope.dayList=[{day:"Monday"},{day:"Tuesday"},{day:"Wednesday"},{day:"Thursday"},{day:"Friday"},{day:"Saturday"},{day:"Sunday"}];

            scope.dayList=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

            scope.removeDeleted = function (item) {

                console.log("Hit remDel");
                var index = scope.AppointmetList.indexOf(item);
                if (index != -1) {
                    scope.AppointmetList.splice(index, 1);
                }

            };

            scope.optionChanger = function (option) {

                if(option=="RecurrencePattern")
                {
                    if(scope.newAppointment.RecurrencePattern=="WEEKLY")
                    {
                        scope.dayListMode=true;
                    }
                    else
                    {
                        scope.dayListMode=false;
                    }
                }

            };

            scope.LoadAppointments = function (scheduleId) {

                scheduleBackendService.getAppointments(scheduleId).then(function (response) {

                    if(response.data.Exception)
                    {
                        console.info("Error in picking Appointment list "+response.data.Exception);
                    }
                    else
                    {
                        scope.AppointmetList = response.data.Result;
                        //$scope.MasterAppList = response.data.Result;
                    }

                }), function (error) {
                    console.info("Error in picking App service "+error);
                }

            }

            scope.LoadAppointments(scope.schedule.id);

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
                    //return [];
                    var results = query ? scope.dayList.filter(createFilterFor(query)) : [];
                    return results;
                }

            };

            function createFilterFor(query) {
                var lowercaseQuery = angular.lowercase(query);
                return function filterFn(days) {
                    return (days.toLowerCase().indexOf(lowercaseQuery) != -1);
                };
            };


            scope.onChipAdd = function (chip) {

                scope.newDayList.push(chip.DayName);
                console.log(scope.newDayList);


            };
            scope.onChipDelete = function (chip) {

                var index=scope.newDayList.indexOf(chip.DayName);
                console.log("index ",index);
                if(index>-1)
                {
                    scope.newDayList.splice(index,1);
                    console.log(scope.newDayList);

                }


            };


            scope.saveAppointment = function () {

                if(!scope.newAppointment.RecurrencePattern)
                {
                    scope.newAppointment.RecurrencePattern="NONE";
                }

                if(scope.newDayList.length>0)
                {
                    scope.newAppointment.DaysOfWeek = scope.newDayList;
                }

                if( scope.newAppointment.RecurrencePattern=="NONE"||scope.newAppointment.RecurrencePattern=="DAILY")
                {
                    scope.newAppointment.DaysOfWeek=[];
                    scope.newDayList=[];

                }



                scope.newAppointment.ScheduleId= scope.schedule.id;

                scheduleBackendService.saveNewAppointment(scope.newAppointment).then(function (response) {

                    if(!response.data.IsSuccess)
                    {

                        console.info("Error in adding new appointment "+response.data.Exception.Message);
                        //scope.showAlert("Error", "There is an error in saving appointment ","error");
                        //$scope.showAlert("Error",)
                    }
                    else
                    {

                        //scope.showAlert("Success", "New appointment added successfully.","success");

                        scope.AppointmetList.splice(0, 0, response.data.Result);
                        scope.newAppointment={};


                    }

                }), function (error) {
                    console.info("Error in adding new Application "+error);
                    scope.showAlert("Error", "There is an Exception in saving appointment "+error,"error");

                }



            };

            scope.hideAppointments= function () {
                scope.viewAction();
            }

            scope.showEdits = function () {
                console.log("hit show "+ scope.configMode);
                scope.configMode=!scope.configMode;

            };




        }

    }
});