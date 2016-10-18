/**
 * Created by Damith on 6/19/2016.
 */

mainApp.controller('pricingCtrl', function ($rootScope, $scope, $state,
                                            loginService) {

    //on load get my package
    $scope.packages = [];
    loginService.getAllPackages(function (result) {
        $scope.packages = result;
    });

    //onclick get my package
    $scope.onClickBuyPackages = function (packageName) {
        loginService.buyMyPackage(packageName, function (result) {
            if (result) {
                $state.go('login');
            }
        });
    };

    $scope.config = {
        publishKey: 'pk_test_8FepS5OSLnghnaPfVED8Ixkx',
        title: 'Duoworld',
        description: "for connected business",
        logo: 'img/small-logo.png',
        label: 'New Card',
    };

    $scope.$on('stripe-token-received', function(event, args) {
        console.log(args);
    });

});
