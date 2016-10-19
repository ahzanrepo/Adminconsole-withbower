mainApp.controller('socialConnectorController', function FormBuilderCtrl($scope, $window, socialConnectorService) {

    $scope.safeApply = function (fn) {
        var phase = this.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

    $window.fbAsyncInit = function () {
        FB.init({
            appId: '825442624259571', // App ID
            channelUrl: '', // Channel File
            status: true, // check login status
            cookie: true, // enable cookies to allow the server to access the session
            xfbml: true,  // parse XFBML
            oAuth: true
        });


        FB.Event.subscribe('auth.authResponseChange', function (response) {
            if (response.status === 'connected') {
                document.getElementById("message").innerHTML = "Connected to Facebook";
                $scope.getUserPageList(response.authResponse);
                //SUCCESS

            }
            else if (response.status === 'not_authorized') {
                document.getElementById("message").innerHTML += "Failed to Connect";

                //FAILED
            } else {
                document.getElementById("message").innerHTML += "Logged Out";

                //UNKNOWN ERROR
            }
        });

    };

    $scope.Login = function () {
        document.getElementById("message").innerHTML = "Connecting.....";
        FB.login(function (response) {
            if (response.authResponse) {
                $scope.getUserPageList(response.authResponse);

            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, {scope: 'email,user_photos,user_videos'});


    };

    $scope.fbPageList = [];

    $scope.getUserPageList = function (auth) {
        FB.api('/me?fields=accounts{access_token,category,name,id,picture},picture,email,name&access_token=', function (response) {//me/accounts?fields=id,picture,category,email,name&access_token=
            $scope.safeApply(function () {
                $scope.fbPageList = response.accounts.data.map(function(item,index){
                    item.auth = auth;
                    item.email = response.email;
                    item.picture = response.picture;
                    return item;
                });
            });


            /*


             var str="<b>Name</b> : "+response.name+"<br>";
             str +="<b>Link: </b>"+response.link+"<br>";
             str +="<b>Username:</b> "+response.username+"<br>";
             str +="<b>id: </b>"+response.id+"<br>";
             str +="<b>Email:</b> "+response.email+"<br>";
             str +="<input type='button' value='Get Photo' ng-click='getPhoto();'/>";
             str +="<input type='button' value='Logout' ng-click='Logout();'/>";
             document.getElementById("status").innerHTML=str;*/

        });
    };

    $scope.getPhoto = function () {
        FB.api('/me/picture?type=normal', function (response) {

            var str = "<br/><b>Pic</b> : <img src='" + response.data.url + "'/>";
            document.getElementById("status").innerHTML += str;

        });

    };

    $scope.Logout = function () {
        FB.logout(function () {
            document.location.reload();
        });
    };

    $scope.showAlert = function (tittle, type, content) {
        new PNotify({
            title: tittle,
            text: content,
            type: type,
            styling: 'bootstrap3'
        });
    };

    $scope.addPageToSystem = function (page) {
        var data = {
            "id": page.id,
            "fb": {
                "access_token": page.auth.accessToken,
                "pageID": page.id,
                "pagePicture":page.picture.data.url,
                "firstName": page.name,
                "lastName": " ",
                "email": page.email,
                "ticketToPost": true,
                "subscribe": true,
                "status": true,
                "auth":page.auth
            }
        };
        socialConnectorService.AddFacebookPageToSystem(data).then(function (response) {
            if(response){
                $scope.showAlert("Add FB Page", 'success',"Successfully Added to System");
                //document.getElementById("status")
                $("#"+page.id+"").addClass("avoid-clicks");
            }
            else{
                $scope.showAlert("Add FB Page", "error", "Fail To Add Selected Page to System.");
            }

        }, function (error) {
            $scope.showAlert("Add FB Page", "error", "Fail To Add Selected Page to System.");
            console.error("AddFacebookPageToSystem err");
        });
    };

    $scope.removePage = function (page) {
        var a = $scope.fbPageList.indexOf(page);
        $scope.fbPageList.splice(a, 1);
    };

// Load the SDK asynchronously
    (function (d) {
        var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement('script');
        js.id = id;
        js.async = true;
        js.src = "//connect.facebook.net/en_US/all.js";
        ref.parentNode.insertBefore(js, ref);
    }(document));
});