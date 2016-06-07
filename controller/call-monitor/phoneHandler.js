var readyCallback = function(e) {
    // function called when sipml is successfully initialised.
    createSipStack(); // calling this function to create sip stack(see below)
};

var errorCallback = function(e) {
    // function called when error occured during sipml initialisation.
    console.log(e);
};



var sipStack;
var registerSession;
var callSession;
var incomingCallSession;
var onRegCompleted;
var onDisconnection;
var onCallConnect;

function EventListener(e) {

    /*
     * e.type ;type of event listener
     * e.session ; current event session
     * e.getSipResponseCode() ; event response code
     * e.description ; event description
     */

    if(e.type == 'started'){
        // successfully started the stack.
        //alert("Connected");
        console.log("YES");
        register();

    }else if(e.type == 'stopped'){
        // successfully started the stack.
        onDisconnection();
        //alert(JSON.stringify(e));

    } else if(e.type == 'i_new_call'){
        // when new incoming call comes.
        // incoming call Id ; e.newSession.getRemoteFriendlyName()

        //alert("incoming call........");
        if(incomingCallSession)
        {
            console.log("In call, cannot answer");
            e.newSession.hangup();
            onDisconnection();
        }
        else
        {
            incomingCallSession = e.newSession;
            incomingCallSession.setConfiguration({
                audio_remote: document.getElementById('audio_remote'),
                events_listener: { events: '*', listener: EventListener }
            });
            acceptCall();
        }



        /*
         if(callSession || incomingCallSession) {

         e.newSession.hangup(); // hanging up new call when caller is in another outgoing call.

         } else {

         e.newSession.getRemoteFriendlyName();
         /!*incomingCallSession = e.newSession;
         incomingCallSession.setConfiguration({
         audio_remote: document.getElementById('audio_remote'),
         events_listener: { events: '*', listener: EventListener }
         });
         acceptCall(e); *!/// accepts call

         }*/


    } else if(e.type == 'connecting') {

        if(e.session == registerSession) {
            // registering session.
        } else if(e.session == callSession) {
            // connecting outgoing call.
        } else if(e.session == incomingCallSession) {
            // connecting incoming call.
        }

    } else if(e.type == 'connected') {

        if(e.session == registerSession) {
            // successfully registed.
            console.log("Successfully registered");
            onRegCompleted("Done");
        } else if(e.session == callSession) {
            // successfully connected call
        } else if(e.session == incomingCallSession) {
            // incoming call connected
            console.log("Successfully onCallConnected");
            onCallConnect();
        }

    } else if(e.type == 'terminated') {

        onDisconnection();
        if(e.session == registerSession) {
            // client unregistered
            console.log("Registration terminated");

        } else if(e.session == callSession) {
            callSession = null;
            //outgoing call terminated.
        } else if(e.session == incomingCallSession) {
            incomingCallSession = null;


            // incoming call terminated
        }

    }
}

function createSipStack() {
    console.log("hooorai");
    sipStack = new SIPml.Stack({
        realm: '159.203.160.47', // mandatory domain name
        impi: 'charlie', // mandatory authorisation name
        impu: 'sip:charlie@159.203.160.47', // mandatory sip uri
        password: 'DuoS123', //optional
        display_name: 'charlie', // optional
        websocket_proxy_url: 'wss://159.203.160.47:7443', // optiona
        enable_rtcweb_breaker: true, // optional
        events_listener: { events: '*', listener: EventListener } /* optional , '*' means all events */
    });

    sipStack.start(); // starting sip stack
}


function register() { // register function
   // alert("Registering....");
    registerSession = sipStack.newSession('register', {
        expires: 300, // expire time, optional
        events_listener: { events: '*', listener: EventListener } /* optional, '*' means all events. */
    });
    registerSession.register(); // registering session.
}
function hangupCall() { // call this function to hangup /reject a call.
    if(callSession) {
        callSession.hangup(); // hangups outgoing call.
    } else if(incomingCallSession) {
        incomingCallSession.reject(); // rejects incoming call.
    }
}

function acceptCall() {
    // accept incoming call.

    if(incomingCallSession)
    {
        incomingCallSession.accept();
    }



    //incomingCallSession.accept();
}
function makeCall(ext) {
    callSession = sipStack.newSession('call-audio', {
        /* audio and video will not be played if you didnt give values to audio_remote,video_remote and for video_local. */
        audio_remote: document.getElementById('audio_remote'),
        events_listener: { events: '*', listener: EventListener }
    });
    //callSession.call("clicktocall_1_3_9999");
    callSession.call(ext);
}


function Initiate(onRegistrationCompleted,onCallDisconnected,onCallConnected)
{
    SIPml.init(readyCallback, errorCallback);
    onRegCompleted=onRegistrationCompleted;
    onDisconnection=onCallDisconnected;
    onCallConnect=onCallConnected;
}


function sendDTMF(digit)
{
    if(incomingCallSession)
    {

        incomingCallSession.dtmf(digit);
    }
}