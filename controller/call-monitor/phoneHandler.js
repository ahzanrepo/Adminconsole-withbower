/**
 * Created by Pawan on 5/30/2016.
 */


var sipStack;
var registerSession;


function phoneRegister()
{
    SIPml.init(readyCallback, errorCallback);
}

var readyCallback = function(e){
    createSipStack(); // see next section
};
var errorCallback = function(e){
    console.error('Failed to initialize the engine: ' + e.message);
};



var eventsListener = function(e){
    switch (e.type) {
        case 'started':
        {
            // catch exception for IE (DOM not ready)
            try {
                // LogIn (REGISTER) as soon as the stack finish starting
                alert(e.type);
                login();
            }
            catch (e) {

            }
            break;
        }
        case 'stopping':
        case 'stopped':
        case 'failed_to_start':
        case 'failed_to_stop':
        {
            var bFailure = (e.type == 'failed_to_start') || (e.type == 'failed_to_stop');
            oSipStack = null;
            oSipSessionRegister = null;
            oSipSessionCall = null;

            UserEvent.uiOnConnectionEvent(false, false);

            stopRingbackTone();
            stopRingTone();

            UserEvent.uiVideoDisplayShowHide(false);
            break;
        }

        case 'i_new_call':
        {
            alert("incoming....");
            if (callSt) {
                // do not accept the incoming call if we're already 'in call'
                e.newSession.hangup(); // comment this line for multi-line support
            }
            else {
                acceptCall(e);
            }
            break;
        }

        case 'm_permission_requested':
        {
            //divGlassPanel.style.visibility = 'visible';
            break;
        }
        case 'm_permission_accepted':
        case 'm_permission_refused':
        {
            //divGlassPanel.style.visibility = 'hidden';
            if (e.type == 'm_permission_refused') {
                oSipSessionCall = null;
                if (oNotifICall) {
                    oNotifICall.cancel();
                    oNotifICall = null;
                }
                UserEvent.uiCallTerminated('Media stream permission denied');
            }
            break;
        }

        case 'starting':
        default:
            break;
    }
}



function createSipStack(){
    sipStack = new SIPml.Stack({
            realm: 'Veery.org', // mandatory: domain name
            impi: '2004', // mandatory: authorization name (IMS Private Identity)
            impu: 'sip:2004@159.203.160.47', // mandatory: valid SIP Uri (IMS Public Identity)
            password: 'DuoS123', // optional
            display_name: '2004', // optional
            websocket_proxy_url: 'ws://159.203.160.47:5077', // optional
            enable_rtcweb_breaker: false, // optional
            events_listener: { events: '*', listener: eventsListener }, // optional: '*' means all events
            sip_headers: [ // optional
                { name: 'User-Agent', value: 'IM-client/OMA1.0 sipML5-v1.0.0.0' },
                { name: 'Organization', value: 'Veery.io' }
            ]
        }

    );
    sipStack.start();
}



var login = function(){
    registerSession = sipStack.newSession('register', {
        events_listener: { events: '*', listener: eventsListener } // optional: '*' means all events
    });
    registerSession.register();
}

var acceptCall = function(e){
    e.newSession.accept(); // e.newSession.reject() to reject the call
};

var rejectCall = function (e) {

}
