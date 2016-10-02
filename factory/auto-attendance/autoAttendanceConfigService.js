
mainApp.factory('autottendanceconfigservice', function ($http, authService) {

    return {

        getAutoAttendances: function () {
            var authToken = authService.GetToken();
            return $http({
                method: 'GET',
                url: 'http://localhost:4445/DVP/API/1.0.0.0/AutoAttendants',
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
                url: 'http://localhost:4445/DVP/API/1.0.0.0/AutoAttendant',
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
                url: "http://localhost:4445/DVP/API/1.0.0.0/AutoAttendant/" + name,
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
                url: "http://localhost:4445/DVP/API/1.0.0.0/AutoAttendant/" + name,
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
                url: 'http://localhost:4445/DVP/API/1.0.0.0/AutoAttendant/' + newAAObj.Name,
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
                url: 'http://localhost:4445/DVP/API/1.0.0.0/AutoAttendant/' + name + '/Action/' + on,
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
                url: 'http://localhost:4445/DVP/API/1.0.0.0/AutoAttendant/' + name + '/Action/' + id,
                headers: {
                    'authorization': authToken
                }
            }).then(function (response) {
                return response;
            });


        },


    }
});




