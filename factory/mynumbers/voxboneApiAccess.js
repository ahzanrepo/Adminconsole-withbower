/**
 * Created by Heshan.i on 10/24/2016.
 */

(function(){
    var voxboneApi = function($http, baseUrls){
       var GetCountryCodes = function(accessToken, pageNumber, pageSize){
            return $http({
                method: 'GET',
                url: baseUrls.voxboneApiUrl +'inventory/listcountries/'+pageNumber+'/'+pageSize,
                headers: {
                    'api_key': accessToken
                }})
                .then(function(response){
                    return response.data;
                });
        };
        var GetStates = function(accessToken, countryCode){
            return $http({
                method: 'GET',
                url: baseUrls.voxboneApiUrl +'inventory/liststate/'+countryCode,
                headers: {
                    'api_key': accessToken
                }})
                .then(function(response){
                    return response.data;
                });
        };
        var GetDidsForCountryCode = function(accessToken, countryCode, pageNumber, pageSize){
            return $http({
                method: 'GET',
                url: baseUrls.voxboneApiUrl +'inventory/listdidgroup/'+countryCode+'/'+pageNumber+'/'+pageSize,
                headers: {
                    'api_key': accessToken
                }})
                .then(function(response){
                    return response.data;
                });
        };
        var FilterDidsFormType = function(accessToken, didType, countryCode, pageNumber, pageSize){
            return $http({
                method: 'GET',
                url: baseUrls.voxboneApiUrl +'inventory/listdidgroup/type/'+didType+'/'+countryCode+'/'+pageNumber+'/'+pageSize,
                headers: {
                    'api_key': accessToken
                }})
                .then(function(response){
                    return response.data;
                });
        };
        var FilterDidsFormState = function(accessToken, didType, stateId, countryCode, pageNumber, pageSize){
            return $http({
                method: 'GET',
                url: baseUrls.voxboneApiUrl +'inventory/listdidgroup/state/'+stateId+'/'+didType+'/'+countryCode+'/'+pageNumber+'/'+pageSize,
                headers: {
                    'api_key': accessToken
                }})
                .then(function(response){
                    return response.data;
                });
        };
        var OrderDid = function(accessToken, orderInfo){
            return $http({
                method: 'POST',
                url: baseUrls.voxboneApiUrl +'order/OrderDids',
                headers: {
                    'api_key': accessToken
                },
                data: orderInfo
            })
                .then(function(response){
                    return response.data;
                });
        };

        return{
            GetCountryCodes: GetCountryCodes,
            GetStates: GetStates,
            GetDidsForCountryCode: GetDidsForCountryCode,
            FilterDidsFormType: FilterDidsFormType,
            FilterDidsFormState: FilterDidsFormState,
            OrderDid: OrderDid
        };
    };
    var module = angular.module("veeryConsoleApp");
    module.factory('voxboneApi', voxboneApi);
}());