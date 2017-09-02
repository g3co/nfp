var ClientSocket = require('../ClientSocket');

module.exports = function(io, socket, instance) {
    
    var clientSocket = new ClientSocket(socket, io, instance);

    clientSocket
        .addEventListener('ready', eventReady)
        .addEventListener('start', eventStart)
        .addEventListener('abort', eventAbort);
};

function eventReady(io, msg, userId, clients) {
    console.log('Client: ', msg);
    //console.log('Clients: ', clients);

    clients.forEach(function(client) {
        console.log('socket: ', client);
        client.dispatchEvent('ready', {
            data: 'Hello from the server'
        })
    })
}

function eventStart(io, msg, userId) {
    console.log('Clients: ', io.getClient(userId));
    //console.log('Socket: ', this.socket.sessionId);
    console.log('Messsage: ', msg);
}

function eventAbort() {

}
/*
 * Client states:
 * ready(1) -> set (1) is ready
 * ready(2) -> set (2) is ready
 * start -> send is started
 * timestamp
 * abort //with confirmation
 *
 * Client events:
 * onEventComing //receive Event data
 * onEventStart //receive Event 'start' state
 * onRoundStart //receive Event 'timestamp' state
 * onEventFinished //receive Event 'timestamp' endless
 * onEventAborted //receive Event 'timestamp' endless with 'stop'
 *
 * Client emits:
 * ready: (1) & (2)
 * start: (1) || (2)
 * abort: (1) || (2)
 * */

/*
 * Server states:
 * coming -> send to (1) & (2) Event data
 * wait -> wait for (1) & (2)
 * started -> set timestart -> send
 * round(:num) -> send round(:num) to (1) & (2)
 * finished -> set timeend -> send to (1) & (2)
 *
 * Server events:
 * onReady //fires twice, receive (1) and (2)
 * onStart //receive at least one 'start'
 * onAbort //receive at least one 'abort'
 *
 * Server emits:
 * eventComing: $event.data
 * eventStart: $event.timeStart
 * roundStart: $event.currentRound
 * eventFinished: $event.timeEnd
 * eventAborted: $event.red || $event.blue
 * */
