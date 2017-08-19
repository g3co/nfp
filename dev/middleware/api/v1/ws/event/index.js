module.exports = function(wss, socket, io, req) {

    var input = io.read(req);

    wss.clients.forEach(function(client) {
        io.getSession('connect.sid', client.upgradeReq)
            .then(function(user) {
                console.log('User: ', user);
            })
            .catch(function() {
                console.log('Failed clients checking')
            })

    });

    socket.on('message', function (message) {
        console.log('WS: '+ message);

        var _to = setInterval(function(){

            var data = 'Date: ' +(new Date()).toISOString();

            console.log(data);
            

            io.write(socket, data);
        }, 1000);
    })
};