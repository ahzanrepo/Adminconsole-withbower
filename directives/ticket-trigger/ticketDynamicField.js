/**
 * Created by Heshan.i on 8/19/2016.
 */
(function(){
    var app =angular.module('veeryConsoleApp');
    var ticketDynamicField = function($templateCache, $compile) {
        return {
            scope: {
                ticketField: "=",
                ticketSchema: "=",
                companyUsers: "=",
                companyUserGroups: "=",
                ngModel: "="
            },
            template: 'Select Field to continue',
            link: function (scope, element) {
                scope.$watch('ticketField', function(newValue, oldValue) {
                    if (newValue) {
                        var template = scope.getTemplate(newValue);
                        element.html(template);
                        $compile(element.contents())(scope);
                    }
                }, true);
                scope.$watch('companyUsers', function(newValue, oldValue) {
                    if (newValue) {
                        companyUsers = newValue;
                    }
                }, true);
                scope.$watch('companyUserGroups', function(newValue, oldValue) {
                    if (newValue) {
                        companyUserGroups = newValue;
                    }
                }, true);
                scope.$watch('ticketSchema', function(newValue, oldValue) {
                    if (newValue) {
                        ticketSchema = newValue;
                    }
                }, true);

                scope.getTemplate = function(field){
                    switch (field){
                        case "due_at":
                            return '<div class="col-sm-3"> <label>Due Date</label> <input type="text" class="form-control" ng-model="ngModel.value" name="DueDate" datepicker> </div>';
                        case "active":
                            return '<div class="col-md-5 col-sm-5 col-xs-12 form-group has-feedback"> <select class="form-control has-feedback-left" ng-model="ngModel.value"> <option>TRUE</option> <option>FALSE</option> </select> <span class="fa fa-envelope form-control-feedback left" aria-hidden="true"></span> </div>';
                        case "is_sub_ticket":
                            return '<div class="col-md-5 col-sm-5 col-xs-12 form-group has-feedback"> <select class="form-control has-feedback-left" ng-model="ngModel.value"> <option>TRUE</option> <option>FALSE</option> </select> <span class="fa fa-envelope form-control-feedback left" aria-hidden="true"></span> </div>';
                        case "type":
                            return '<div><input type="text" class="form-control has-feedback-left" ng-model="ngModel.value" style="" id="actionValue" placeholder="Value"> <span class="fa fa-envelope form-control-feedback left" aria-hidden="true"></span></div>';
                        case "subject":
                            return '<div><input type="text" class="form-control has-feedback-left" ng-model="ngModel.value" style="" id="actionValue" placeholder="Value"> <span class="fa fa-envelope form-control-feedback left" aria-hidden="true"></span></div>';
                        case "reference":
                            return '<div><input type="text" class="form-control has-feedback-left" ng-model="ngModel.value" style="" id="actionValue" placeholder="Value"> <span class="fa fa-envelope form-control-feedback left" aria-hidden="true"></span></div>';
                        case "description":
                            return '<div><input type="text" class="form-control has-feedback-left" ng-model="ngModel.value" style="" id="actionValue" placeholder="Value"> <span class="fa fa-envelope form-control-feedback left" aria-hidden="true"></span></div>';
                        case "priority":
                            return '<div class="col-md-5 col-sm-5 col-xs-12 form-group has-feedback"> <select class="form-control has-feedback-left" placeholder="Select Priority" ng-model="ngModel.value"> <option value="" disabled selected>Select Priority</option> <option ng-repeat="priority in ticketSchema.priority.enum" value="{{priority}}"> {{priority}} </option> </select> <span class="fa fa-envelope form-control-feedback left" aria-hidden="true"></span> </div>';
                        case "status":
                            return '<div class="col-md-5 col-sm-5 col-xs-12 form-group has-feedback"> <select class="form-control has-feedback-left" placeholder="Select Status" ng-model="ngModel.value"> <option value="" disabled selected>Select Status</option> <option ng-repeat="status in ticketSchema.status.enum" value="{{status}}"> {{status}} </option> </select> <span class="fa fa-envelope form-control-feedback left" aria-hidden="true"></span> </div>';
                        case "assignee":
                            if(companyUsers){
                                return '<div class="col-md-5 col-sm-5 col-xs-12 form-group has-feedback"> <select class="form-control has-feedback-left" placeholder="Select User" ng-model="ngModel.value"> <option value="" disabled selected>Select User</option> <option ng-repeat="user in companyUsers" value="{{user._id}}"> {{user.firstname}} </option> </select> <span class="fa fa-envelope form-control-feedback left" aria-hidden="true"></span> </div>';
                            }else{
                                return '<div class="col-md-5 col-sm-5 col-xs-12 form-group has-feedback"> <select class="form-control has-feedback-left" placeholder="Select User" ng-model="ngModel.value"> <option value="" disabled selected>No User</option> </select> <span class="fa fa-envelope form-control-feedback left" aria-hidden="true"></span> </div>';
                            }
                        case "assignee_group":
                            if(companyUserGroups){
                                return '<div class="col-md-5 col-sm-5 col-xs-12 form-group has-feedback"> <select class="form-control has-feedback-left" placeholder="Select User Group" ng-model="ngModel.value"> <option value="" disabled selected>Select User Group</option> <option ng-repeat="group in companyUserGroups" value="{{group._id}}"> {{group.name}} </option> </select> <span class="fa fa-envelope form-control-feedback left" aria-hidden="true"></span> </div>';
                            }else{
                                return '<div class="col-md-5 col-sm-5 col-xs-12 form-group has-feedback"> <select class="form-control has-feedback-left" placeholder="Select User Group" ng-model="ngModel.value"> <option value="" disabled selected>No User Group</option> </select> <span class="fa fa-envelope form-control-feedback left" aria-hidden="true"></span> </div>';
                            }
                        case "channel":
                            return '<div><input type="text" class="form-control has-feedback-left" ng-model="ngModel.value" style="" id="actionValue" placeholder="Value"> <span class="fa fa-envelope form-control-feedback left" aria-hidden="true"></span></div>';
                        case "tags":
                            return '<div><input type="text" class="form-control has-feedback-left" ng-model="ngModel.value" style="" id="actionValue" placeholder="Value"> <span class="fa fa-envelope form-control-feedback left" aria-hidden="true"></span></div>';
                        case "SLAViolated":
                            return '<div class="col-md-5 col-sm-5 col-xs-12 form-group has-feedback"> <select class="form-control has-feedback-left" ng-model="ngModel.value"> <option>TRUE</option> <option>FALSE</option> </select> <span class="fa fa-envelope form-control-feedback left" aria-hidden="true"></span> </div>';
                            //return '<checkbox class="btn-success" ng-model="ngModel.value"></checkbox> <label> <small>Violated</small> </label>';
                        default :
                            break;
                    }
                };
            }

        }
    };



    app.directive('ticketDynamicField', ticketDynamicField);
}());