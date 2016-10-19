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

                loginService.clearCookie();
                $state.go('login');
            }
        });
    }


});
