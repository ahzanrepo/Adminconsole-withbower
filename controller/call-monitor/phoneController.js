/**
 * Created by Pawan on 5/29/2016.
 */

'use strict';

mainApp.controller('phonecontroller', function ($scope,callMonitorSrv,notificationService) {

    // Update the dataset at 25FPS for a smoothly-animating chart
    var sipStack;
    var callSession;
    var registerSession;

    var readyCallback = function(e) {
        // function called when sipml is successfully initialised.
        createSipStack(); // calling this function to create sip stack(see below)
    };

    var errorCallback = function(e) {
        // function called when error occured during sipml initialisation.
        console.log("Initiation error "+e);
    };

    SIPml.init(readyCallback, errorCallback);

    function EventListener(e) {

        /*
         * e.type ;type of event listener
         * e.session ; current event session
         * e.getSipResponseCode() ; event response code
         * e.description ; event description
         */

        if(e.type == 'started'){
            // successfully started the stack.
            login

            //alert(e.type);
        } else if(e.type == 'i_new_call'){
            // when new incoming call comes.
            // incoming call Id ; e.newSession.getRemoteFriendlyName()

            if(callSession || incomingCallSession) {


                e.newSession.hangup(); // hanging up new call when caller is in another outgoing call.

            } else {

                e.newSession.getRemoteFriendlyName();
                incomingCallSession = e.newSession;
                incomingCallSession.setConfiguration({
                    audio_remote: document.getElementById('audio_remote'),
                    video_remote:document.getElementById('video-remote'),
                    video_local:document.getElementById('audio-remote'),
                    events_listener: { events: '*', listener: EventListener }
                });
                acceptCall(); // accepts call

            }
        } else if(e.type == 'connecting') {

            /*if(e.session == registerSession) {
             // registering session.
             } else*/ if(e.session == callSession) {
                // connecting outgoing call.
                document.getElementById('veeryImg').src="img/veery_ringing.svg";
            } else if(e.session == incomingCallSession) {
                // connecting incoming call.
            }

        } else if(e.type == 'connected') {

            /*if(e.session == registerSession) {
             // successfully registed.
             } else*/ if(e.session == callSession) {
                // successfully connected call
                document.getElementById('veeryImg').src="img/veery_connected.svg";

            }

        } else if(e.type == 'terminated') {

            /*
             * e.getSipResponseCode()=603 ; call declined without any answer
             * e.getSipResponseCode()=487 ; caller terminated the call
             * e.getSipResponseCode()=-1 ; call answered and hanguped by caller/callee
             * e.getSipResponseCode()=200 ; user unregistered
             */

            /*if(e.session == registerSession) {
             // client unregistered
             } else*/ if(e.session == callSession) {

                document.getElementById('veeryImg').src="img/veery_callus.svg";
                callSession = null;

                //outgoing call terminated.
            }

        }
    }

    function createSipStack() {
        sipStack = new SIPml.Stack({
            realm: 'DuoSoftware.com', // mandatory domain name
            impi: 'test', // mandatory authorisation name
            impu: 'sip:2004@159.203.160.47', // mandatory sip uri
            password: 'DuoS123', //optional
            display_name: ' Veery.io', // optional
            websocket_proxy_url: 'ws://159.203.160.47:5077', // optional
            outbound_proxy_url: '', // optional
            enable_rtcweb_breaker: true, // optional
            events_listener: { events: '*', listener: EventListener } /* optional , '*' means all events */
        });

        sipStack.start(); // starting sip stack
    }

    var login = function(){
        registerSession = sipStack.newSession('register', {
            events_listener: { events: '*', listener: eventsListener } // optional: '*' means all events
        });
        registerSession.register();
    }




});
