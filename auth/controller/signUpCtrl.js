/**
 * Created by Damith on 6/18/2016.
 */

mainApp.controller('signUpCtrl', function ($rootScope, $scope, $state, signUpServices, $auth, baseUrls) {

    //go to login
    $scope.onClickLogIn = function () {
        $state.go('login');
    };

    $scope.isSignUp = false;
    $scope.password = '';

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

        $auth.signup(newUser)
            .then(function (response) {
                //$auth.setToken(response);
                showAlert('Job Done', 'success', 'Registration successfully please check email for verification...');
                $state.go('login');
            })
            .catch(function (response) {
                showAlert('Error', 'error', 'User Registration error...');
                $scope.isSignUp = false;
            });

        /*
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
         });*/
    }

    $scope.recaptcha = {
        siteKey: baseUrls.siteKey,
        SecretKey: baseUrls.secretKey
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
});


mainApp.directive('passwordStrength', [
    function () {
        return {
            require: 'ngModel',
            restrict: 'E',
            scope: {
                password: '=ngModel'
            },

            link: function (scope, elem, attrs, ctrl) {
                //password validation
                scope.isShowBox = false;
                scope.isPwdValidation = {
                    minLength: false,
                    specialChr: false,
                    digit: false,
                    capitalLetter: false
                };
                scope.$watch('password', function (newVal) {
                    scope.strength = isSatisfied(newVal && newVal.length >= 8) +
                        isSatisfied(newVal && /[A-z]/.test(newVal)) +
                        isSatisfied(newVal && /(?=.*\W)/.test(newVal)) +
                        isSatisfied(newVal && /\d/.test(newVal));

                    function isSatisfied(criteria) {
                        return criteria ? 1 : 0;
                    }
                }, true);
            },
            template: '<div ng-if="strength != ' + 4 + ' " ' +
            'ng-show=strength class="password-progress-wrapper"> <div class="progress password-progress">' +
            '<div class="progress-bar progress-bar-danger" style="width: {{strength >= 1 ? 25 : 0}}%"></div>' +
            '<div class="progress-bar progress-bar-warning" style="width: {{strength >= 2 ? 25 : 0}}%"></div>' +
            '<div class="progress-bar progress-bar-warning" style="width: {{strength >= 3 ? 25 : 0}}%"></div>' +
            '<div class="progress-bar progress-bar-success" style="width: {{strength >= 4 ? 25 : 0}}%"></div>' +
            '</div></div>'
        }
    }
]);

mainApp.directive('passwordStrengthBox', [
    function () {
        return {
            require: 'ngModel',
            restrict: 'E',
            scope: {
                password: '=ngModel'
            },

            link: function (scope, elem, attrs, ctrl) {
                //password validation
                scope.isShowBox = false;
                scope.isPwdValidation = {
                    minLength: false,
                    specialChr: false,
                    digit: false,
                    capitalLetter: false
                };
                scope.$watch('password', function (newVal) {


                    scope.strength = isSatisfied(newVal && newVal.length >= 8) +
                        isSatisfied(newVal && /[A-z]/.test(newVal)) +
                        isSatisfied(newVal && /(?=.*\W)/.test(newVal)) +
                        isSatisfied(newVal && /\d/.test(newVal));

                    //length
                    if (newVal && newVal.length >= 8) {
                        scope.isPwdValidation.minLength = true;
                    } else {
                        scope.isPwdValidation.minLength = false;
                    }

                    // Special Character
                    if (newVal && /(?=.*\W)/.test(newVal)) {
                        scope.isPwdValidation.specialChr = true;
                    } else {
                        scope.isPwdValidation.specialChr = false;
                    }

                    //digit
                    if (newVal && /\d/.test(newVal)) {
                        scope.isPwdValidation.digit = true;
                    } else {
                        scope.isPwdValidation.digit = false;
                    }

                    //capital Letter
                    if (newVal && /[A-z]/.test(newVal)) {
                        scope.isPwdValidation.capitalLetter = true;
                    } else {
                        scope.isPwdValidation.capitalLetter = false;
                    }

                    function isSatisfied(criteria) {
                        return criteria ? 1 : 0;
                    }


                }, true);
            },
            template: '<div ng-if="strength != ' + 4 + ' "' +
            'ng-show=strength' +
            ' class="password-leg-wrapper">' +
            '<ul>' +
            '<li>' +
            '<i ng-show="isPwdValidation.minLength" class="ti-check color-green"></i>' +
            '<i ng-show="!isPwdValidation.minLength" class="ti-close color-red"></i>' +
            ' Min length 8' +
            '</li>' +
            '<li><i ng-show="isPwdValidation.specialChr" class="ti-check color-green "></i>' +
            '<i ng-show="!isPwdValidation.specialChr" class="ti-close color-red"></i>' +
            ' Special Character' +
            '</li>' +
            '<li><i ng-show="isPwdValidation.digit" class="ti-check color-green"></i>' +
            '<i ng-show="!isPwdValidation.digit" class="ti-close color-red"></i>' +
            'Digit' +
            '</li>' +
            '<li><i ng-show="isPwdValidation.capitalLetter" class="ti-check color-green"></i>' +
            '<i ng-show="!isPwdValidation.capitalLetter" class="ti-close color-red"></i>' +
            ' Capital Letter' +
            ' </li>' +
            '</ul>' +
            '</div>'
        }
    }
]);

mainApp.directive('patternValidator', [
    function () {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, elem, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue) {

                    var patt = new RegExp(attrs.patternValidator);

                    var isValid = patt.test(viewValue);

                    ctrl.$setValidity('passwordPattern', isValid);

                    // angular does this with all validators -> return isValid ? viewValue : undefined;
                    // But it means that the ng-model will have a value of undefined
                    // So just return viewValue!
                    return viewValue;

                });
            }
        };
    }
]);




