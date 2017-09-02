module.exports = function ClientSocket(socket, io, instance) {

    this.addEventListener = addEventListener;
    this.dispatchEvent = dispatchEvent;

    var userId = instance.userId,
        instanceName = instance.name;

    function addEventListener(event, listener) {
        var eventName = [
            event,
            instanceName
        ].join(' ');

        socket.on(eventName, function(message) {

            try {
                message = JSON.parse(message);
            } catch(e) {
                console.log('Wrong message: ', message);
                message = {};
            }

            var clients = io.getClient(userId);

            clients = clients.map(function(client) {
                if(!!client) {
                    return new ClientSocket(client, io, instance)
                }
            });

            return listener.call(socket, io, message, userId, clients)
        });

        return this
    }

    function dispatchEvent(event, data) {
        var eventName = [
            event,
            instanceName
        ].join(' ');

        data = JSON.stringify(data);

        socket.emit(eventName, data);

        return this
    }
};