/**
 * Created by Damith on 6/18/2016.
 */

mainApp.controller('signUpCtrl', function ($rootScope, $scope, $state, signUpServices) {

    //go to login
    $scope.onClickLogIn = function () {
        $state.go('login');
    };

    $scope.isSignUp = false;

    //fire notification
    var showAlert = function (title, type, content) {
        new PNotify({
            title: title,
            text: content,
            type: type,
            styling: 'bootstrap3'
        });
    };


    var newUser = {
        username: '',
        phone: '',
        firstname: '',
        lastname: '',
        password: '',
        email: ''
    };
    //create new user
    $scope.onClickCreateAccount = function () {
        newUser.username = $scope.userName;
        newUser.phone = $scope.phoneNo;
        newUser.firstname = $scope.firstName;
        newUser.lastname = $scope.lastName;
        newUser.password = $scope.password;
        newUser.mail = $scope.email;
        $scope.isSignUp = true;
        signUpServices.createNewUser(newUser, function (result) {
            if (result) {
                var organisation = {
                    username: $scope.userName,
                    password: $scope.password,
                    organisationName: $scope.userName
                };
                signUpServices.createOrganisation(organisation, function (result) {
                    if (result) {
                        showAlert('Job Done', 'success', 'Registration successfully...');
                        $state.go('login');
                    }
                });
            } else {
                showAlert('Error', 'error', 'User Registration error...');
                $scope.isSignUp = false;
            }
        });
    }


});

//Password verification
mainApp.directive('passwordVerify', function () {
    return {
        require: "ngModel",
        scope: {
            passwordVerify: '='
        },
        link: function (scope, element, attrs, ctrl) {
            scope.$watch(function () {
                var combined;
                if (scope.passwordVerify || ctrl.$viewValue) {
                    combined = scope.passwordVerify + '_' + ctrl.$viewValue;
                }
                return combined;
            }, function (value) {
                if (value) {
                    ctrl.$parsers.unshift(function (viewValue) {
                        var origin = scope.passwordVerify;
                        if (origin !== viewValue) {
                            ctrl.$setValidity("passwordVerify", false);
                            return undefined;
                        } else {
                            ctrl.$setValidity("passwordVerify", true);
                            return viewValue;
                        }
                    });
                }
            });
        }
    };
})