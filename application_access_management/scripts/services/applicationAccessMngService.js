/**
 * Created by Rajinda on 12/31/2015.
 */

mainApp.factory("appAccessManageService", function ($http, $log, authService, baseUrls) {

    var getUserList = function () {

        return $http.get(baseUrls.UserServiceBaseUrl + "Users",
            {
                headers: {authorization: authService.GloableToken}
            }).then(function (response) {
                if (response.data && response.data.IsSuccess) {
                    return response.data.Result;
                } else {
                    return {};
                }
            });
    };

    var addSelectedNavigationToUser = function (userName, consoleName, navigationData) {
///User/:username/Console/:consoleName/Navigation
        return $http({
            method: 'put',
            url: baseUrls.UserServiceBaseUrl + "User/" + userName + "/Console/" + consoleName + "/Navigation",
            headers: {
                'authorization': authService.UserService,
                'Content-Type': 'application/json'
            },
            data: {
                "menuItem": navigationData.menuItem,
                "menuAction": {
                    "Navigatione": navigationData.Navigatione,
                    "read": navigationData.read,
                    "write": navigationData.write,
                    "delete": navigationData.delete
                }
            }
        }).then(function (response) {
            return response.data.IsSuccess;
        });
    };

    var addConsoleToUser = function (consoleName) {
        return $http({
            method: 'put',
            url: baseUrls.UserServiceBaseUrl + "Console/"+consoleName,
            headers: {
                'authorization': authService.UserService,
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.data.IsSuccess;
        });
    };

    var deleteConsoleFrmUser = function (consoleName) {
        return $http({
            method: 'delete',
            url: baseUrls.UserServiceBaseUrl + "Console/"+consoleName,
            headers: {
                'authorization': authService.UserService,
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.data.IsSuccess;
        });
    };

    var DeleteSelectedNavigationFrmUser = function (userName, consoleName, navigation) {
        //User/:username/Console/:consoleName/Navigation/:navigation
        return $http({
            method: 'delete',
            url: baseUrls.UserServiceBaseUrl + "User/"+userName+"/Console/"+consoleName+"/Navigation/"+navigation,
            headers: {
                'authorization': authService.UserService,
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.data.IsSuccess;
        });
    };

    var getNavigationAssignToUser = function (userRole) {
//http://localhost:3636/DVP/API/1.0.0.0/User/John
        return $http({
            method: 'get',
            url: baseUrls.UserServiceBaseUrl + "User/"+userRole,
            headers: {
                'authorization': authService.UserService,
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.data.IsSuccess;
        });
    };

    var getAssignableNavigations = function (userRole) {
//http://localhost:3636/DVP/API/1.0.0.0/Consoles/admin
        return $http({
            method: 'get',
            url: baseUrls.UserServiceBaseUrl + "Consoles/"+userRole,
            headers: {
                'authorization': authService.UserService
            }
        }).then(function (response) {
            return response.data.Result;
        });
    };

    return {
        GetUserList: getUserList,
        AddConsoleToUser:addConsoleToUser,
        DeleteConsoleFrmUser:deleteConsoleFrmUser,
        AddSelectedNavigationToUser: addSelectedNavigationToUser,
        DeleteSelectedNavigationFrmUser: DeleteSelectedNavigationFrmUser,//
        GetNavigationAssignToUser:getNavigationAssignToUser,
        GetAssignableNavigations:getAssignableNavigations
    }

});
