module.exports = function ClientSocket(socket, io, instance) {

    this.addEventListener = addEventListener;

    function addEventListener(event, listener) {

        var eventName = [
            event,
            instance.name
        ].join(' ');

        socket.on(eventName, function(message) {

            try {
                message = JSON.parse(message);
            } catch(e) {
                console.log('Wrong message: ', message);
                message = {};
            }

            return listener.call(socket, io, message, instance.userId)
        });

        return this
    }
};