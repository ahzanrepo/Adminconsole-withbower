/**
 * Created by Pawan on 1/17/2018.
 */


mainApp.directive("editinviteconfig", function (invitationApiAccess) {

    return {
        restrict: "EAA",
        scope: {
            invite: "=",
            'reloadpage':'&'
        },

        templateUrl: 'views/invitation-config/partials/editInvitation.html',

        link: function (scope) {




            scope.showAlert = function (title,content,type) {

                new PNotify({
                    title: title,
                    text: content,
                    type: type,
                    styling: 'bootstrap3'
                });
            };


            scope.cancelInvitation = function () {
                invitationApiAccess.cancelSentInvitation(scope.invite._id).then(function (resCancel) {

                    if(resCancel.data.IsSuccess)
                    {
                        scope.showAlert("Success","Invitation Canceled to "+scope.invite.to,"success");
                        scope.invite.status="canceled";
                    }
                    else
                    {
                        scope.showAlert("Error","Failed to Cancel invitation  to "+scope.invite.to,"error");
                    }

                },function (errCancel) {
                    scope.showAlert("Error","Failed to Cancel invitation  to "+scope.invite.to,"error");
                });
            }



        }

    }
});