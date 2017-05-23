/**
 * Created by damith on 5/3/17.
 */


mainApp.factory('subscribeServices', function (baseUrls) {


    //local  variable
    var connectionSubscribers;
    var dashboardSubscriber;

    //********  subscribe event ********//
    var OnConnected = function () {
        console.log("OnConnected..............");
        var token = loginService.getToken();
        SE.authenticate({
            success: function (data) {
                console.log("authenticate..............");

                if (connectionSubscribers) {
                    connectionSubscribers(true);
                }

                SE.subscribe({room: 'QUEUE:QueueDetail'});
                
            },
            error: function (data) {
                console.log("authenticate error..............");
            },
            token: token
        });
    };

    var OnDisconnect = function (o) {
        console.log("OnDisconnect..............");
        if (connectionSubscribers)
            connectionSubscribers(false);
    };

    var OnDashBoardEvent = function (event) {
        console.log("OnDshboardEvent..............");
        if (dashboardSubscriber) {
            dashboardSubscriber(event);

        }
    };

    var callBackEvents = {
        OnConnected: OnConnected,
        OnDisconnect: OnDisconnect,
        OnDashBoardEvent: OnDashBoardEvent
    };


    //********  subscribe function ********//
    var connect = function () {
        SE.init({
            serverUrl: baseUrls.ipMessageURL,
            callBackEvents: callBackEvents
        });
    };
    var subscribeDashboard = function (func) {
        dashboardSubscriber = func;
    };

    return {
        connectSubscribeServer: connect,
        subscribeDashboard: subscribeDashboard
    }


});