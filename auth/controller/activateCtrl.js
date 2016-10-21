/**
 * Created by Damith on 6/1/2016.
 */

mainApp.controller('activateCtrl', function ($rootScope, $scope,$stateParams, $state, $http,
                                          loginService) {



    var showAlert = function (title, type, content) {
        new PNotify({
            title: title,
            text: content,
            type: type,
            styling: 'bootstrap3',
            animate: {
                animate: true,
                in_class: "bounceIn",
                out_class: "bounceOut"
            }
        });
    };

    $scope.ActivateAccount = function () {


        loginService.activateAccount($stateParams.token, function (isSuccess) {
            if(isSuccess){
                showAlert('Success', 'success', "Please login with new password");
                $state.go('login');
            }else{
                showAlert('Error', 'error', "reset failed");
            }
        })



    }

    $scope.BackToLogin= function () {


        $state.go('login');


    }

    $scope.ActivateAccount();


});