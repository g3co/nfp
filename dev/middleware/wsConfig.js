module.exports = function(io) {

    return {

        clientTracking: true,

        verifyClient: function(info, cb) {

            var req = info.req,
                input = io.read(req);

            io.getSession('connect.sid', req)
                .then(function() {
                    console.log('WebSocket: VERIFIED');
                    cb(true)
                })
                .catch(function() {
                    console.log('WebSocket: FAIL!');
                    cb(false)
                });
        }
    }
};