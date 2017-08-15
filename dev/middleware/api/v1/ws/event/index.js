module.exports = function(socket, io, req) {

    var input = io.read(req);

    io.getSession('connect.sid')
        .then(function() {
            socket.on('message', function (message) {
                console.log('WS: '+ message);

                var _to = setTimeout(function(){

                    var data = 'Date: ' +(new Date()).toISOString();

                    console.log(data);

                    io.write(socket, data);

                    clearTimeout(_to);
                }, 250);
            })
        })
        .catch(function() {
            console.log('Non Authorized');

            return io.write(socket, null, { result: 0 })
        });
};