/** * Created by Damith on 2/16/2017. */mainApp.controller('softPhoneCtrl', function ($scope, softPhoneService, loginService) {    //contact OBJ    $scope.contactObj = {};    $scope.addContact = function () {        console.log($scope.contactObj);    };    var getAllContact = function () {        softPhoneService.getContact().then(function (response) {        }, function (err) {            loginService.isCheckResponse(err);            console.log(err);        });    };    getAllContact();});