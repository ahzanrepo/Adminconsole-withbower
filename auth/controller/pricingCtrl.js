/**
 * Created by Damith on 6/19/2016.
 */

mainApp.controller('pricingCtrl', function ($rootScope, $scope, $state,
                                            loginService, walletService) {

    //on load get my package
    $scope.packages = [];
    loginService.getAllPackages(function (result) {
        $scope.packages = result;
    });

    $scope.showError = function (tittle,content) {

        new PNotify({
            title: tittle,
            text: content,
            type: 'error',
            styling: 'bootstrap3'
        });
    };

    //onclick get my package
    $scope.onClickBuyPackages = function (pak) {
        walletService.CreditBalance().then(function (res) {
            if((parseInt(res.Credit)/100) > parseInt(pak.price)){
                loginService.buyMyPackage(pak.packageName, function (result) {
                    if (!result) {
                        $scope.showError("Package Buy", "Please Contact System Administrator.");
                    }
                    loginService.clearCookie();
                    $state.go('login');
                });
            }
            else{
                $scope.showError("Package Buy", "Insufficient Balance. Please Add Credit To Your Account.");
                $state.go('console.credit');
            }
        }, function (err) {
            $scope.showError("Package Buy", "Fail To Get Credit Balance.");
        });
    };


});
