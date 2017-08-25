var ClientSocket = require('../ClientSocket');

module.exports = function(io, socket, instance) {
    
    var clientSocket = new ClientSocket(socket, io, instance);

    clientSocket
        .addEventListener('test', testMethod)
        .addEventListener('client', clientTest);
};

function testMethod(io, msg) {
    console.log('SocketId: ', this.id);
    //console.log('Socket: ', this.socket.sessionId);
    console.log('Messsage: ', msg);
}

function clientTest(io, msg, userId) {
    console.log('Clients: ', io.getClient(userId));
    //console.log('Socket: ', this.socket.sessionId);
    console.log('Messsage: ', msg);
}