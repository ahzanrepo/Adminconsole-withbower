/**
 * Created by Pawan on 11/22/2016.
 */

mainApp.factory('billingHistoryService', function ($http, baseUrls) {

    return {

        getBillingHistory: function (stDt,edDt) {
            return $http({
                method: 'GET',
                url: baseUrls.walletService+"PaymentManager/WalletHistory/from/"+stDt+"/to/"+edDt
            }).then(function(response)
            {
                return response;
            });
        }


    }
});