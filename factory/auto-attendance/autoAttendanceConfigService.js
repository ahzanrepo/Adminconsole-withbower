
mainApp.factory('autottendanceconfigservice', function ($http, authService,baseUrls) {

    return {

        getAutoAttendances: function () {
            var authToken = authService.GetToken();
            return $http({
                method: 'GET',
                url: baseUrls.autoattendantUrl+ 'AutoAttendants',
                headers: {
                    'authorization': authToken
                }
            }).then(function (response) {
                return response;
            });
        },

        addNewAutoAttendance: function (newAAObj) {
            var authToken = authService.GetToken();

            return $http({
                method: 'POST',
                url: baseUrls.autoattendantUrl+ 'AutoAttendant',
                headers: {
                    'authorization': authToken
                },
                data: newAAObj
            }).then(function (response) {
                return response;
            });
        },

        deleteAutoAttendance: function (name) {
            var authToken = authService.GetToken();
            return $http({
                method: 'DELETE',
                url: baseUrls.autoattendantUrl+ "AutoAttendant/" + name,
                headers: {
                    'authorization': authToken
                }
            }).then(function (response) {

                return response;
            });

        },

        getAutoAttendance: function (name) {
            var authToken = authService.GetToken();
            return $http({
                method: 'GET',
                url: baseUrls.autoattendantUrl+ "AutoAttendant/" + name,
                headers: {
                    'authorization': authToken
                }
            }).then(function (response) {
                return response;
            });


        },

        updateAutoAttendance: function (newAAObj) {
            var authToken = authService.GetToken();
            return $http({
                method: 'PUT',
                url: baseUrls.autoattendantUrl+ 'AutoAttendant/' + newAAObj.Name,
                headers: {
                    'authorization': authToken
                },
                data: newAAObj
            }).then(function (response) {
                return response;
            });


        },

        setAction: function (name, on, action) {
            var authToken = authService.GetToken();
            return $http({
                method: 'PUT',
                url: baseUrls.autoattendantUrl+ 'AutoAttendant/' + name + '/Action/' + on,
                headers: {
                    'authorization': authToken
                },
                data: action
            }).then(function (response) {
                return response;
            });


        },

        deleteAction: function (name, id) {
            var authToken = authService.GetToken();
            return $http({
                method: 'DELETE',
                url: baseUrls.autoattendantUrl+ 'AutoAttendant/' + name + '/Action/' + id,
                headers: {
                    'authorization': authToken
                }
            }).then(function (response) {
                return response;
            });


        }


    }
});




