export default function rtc(self: Window | any) {
    // rip
    
    /*self.RTCPeerConnection = self.__dynamic.wrap(self.RTCPeerConnection,
        function(this: RTCPeerConnection, target: Function, ...args: Array<any>) {
            if (args[0]) {
                if (args[0].iceServers) {
                    for (var i = 0; i < args[0].iceServers.length; i++) {
                        if (args[0].iceServers[i].urls) {
                            for (var j = 0; j < args[0].iceServers[i].urls.length; j++) {
                                if (args[0].iceServers[i].urls[j].startsWith('stun:') || args[0].iceServers[i].urls[j].startsWith('turn:')) {
                                    args[0].iceServers[i].urls[j] = self.__dynamic.rtc.endpoints[0];
                                }
                            }
                        }
                    }
                }
            }

            console.log('rtcpeer', args[0]);

            return args;
        },
        function() {
            arguments[0].onicecandidate = function(this: RTCPeerConnection, ev: RTCPeerConnectionIceEvent) {
                if (ev.candidate) {
                    console.log('ice', ev.candidate);
                }

                console.log(ev);
            };

            console.log(arguments[0]);
        }
    );

    self.RTCPeerConnection.prototype.addIceCandidate = self.__dynamic.wrap(self.RTCPeerConnection.prototype.addIceCandidate, 
        function(this: RTCPeerConnection, target: Function, ...args: Array<any>) {
            console.log('addice', args);

            return Reflect.apply(target, this, args);
        }
    );

    self.RTCIceCandidate = self.__dynamic.wrap(self.RTCIceCandidate, 
        function(this: RTCPeerConnection, target: Function, ...args: Array<any>) {
            console.log('rtcice', args);

            return args;
        }
    );
    
    self.RTCPeerConnection.prototype.setConfiguration = self.__dynamic.wrap(self.RTCPeerConnection.prototype.setConfiguration,
        function(this: RTCPeerConnection, target: Function, ...args: Array<any>) {
            console.log('rtcconfig', args);

            return Reflect.apply(target, this, args);
        }
    );*/
}