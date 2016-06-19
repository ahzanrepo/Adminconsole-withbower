/**
 * Created by Damith on 6/1/2016.
 */

mainApp.controller('loginCtrl', function ($rootScope, $scope, $state, $http,
                                          loginService,
                                          config, $base64) {
        var para = {
            userName: null,
            password: null,
            clientID: $base64.encode(config.client_Id_secret),
        };

        var showAlert = function (title, type, content) {
            new PNotify({
                title: title,
                text: content,
                type: type,
                styling: 'bootstrap3'
            });
        };


        $scope.isLogin = false;

        $scope.onClickSignUp = function () {
            $state.go('signUp');
        };

        $scope.onClickLogin = function () {
            para.userName = $scope.userName;
            para.password = $scope.password;
            //parameter option
            //username
            //password
            //decode clientID
            $scope.isLogin = true;
            loginService.Login(para, function (result) {
                if (result) {
                    loginService.getMyPackages(function (result, status) {
                        if (status == 200) {
                            if (result) {
                                loginService.getUserNavigation(function (isnavigation) {
                                    $state.go('console');
                                })
                            } else {
                                $state.go('pricing');
                            }
                        } else {
                            $state.go('console');
                        }

                    });
                } else {
                    showAlert('Error', 'error', 'Please check login details...');
                    $scope.isLogin = false;
                }
            });
        }
    }
);