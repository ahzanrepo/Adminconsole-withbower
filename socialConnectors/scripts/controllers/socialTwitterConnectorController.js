mainApp.controller('socialTwitterConnectorController',  function($scope, $q, twitterService) {

    $scope.tweetProfile = {};
    twitterService.initialize();

    //using the OAuth authorization result get the latest 20 tweetProfile from twitter for the user
    $scope.refreshTimeline = function() {
        twitterService.getLatestTweets().then(function(data) {
            $scope.tweetProfile = data;
        });
    };

    //when the user clicks the connect twitter button, the popup authorization window opens
    $scope.connectButton = function() {
        twitterService.connectTwitter().then(function() {
            if (twitterService.isReady()) {
                //if the authorization is successful, hide the connect button and display the tweetProfile
                $('#connectButton').fadeOut(function(){
                    $('#getTimelineButton, #signOut').fadeIn();
                    $scope.refreshTimeline();
                });
            }
        });
    };

    //sign out clears the OAuth cache, the user will have to reauthenticate when returning
    $scope.signOut = function() {
        twitterService.clearCache();
        $('#getTimelineButton, #signOut').fadeOut(function(){
            $('#connectButton').fadeIn();
        });
    };

    //if the user is a returning user, hide the sign in button and display the tweetProfile
    if (twitterService.isReady()) {
        $('#connectButton').hide();
        $('#getTimelineButton, #signOut').show();
        $scope.signOut();
    }

    $scope.addPageToSystem = function(page){

    }
});