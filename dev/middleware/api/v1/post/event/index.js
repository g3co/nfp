module.exports = function(io, req, res) {

    var userId = req.params.id,
        clients = io.getClient(userId);

    if(!!clients && clients.length) {
        clients.forEach(function(o) {
            o.emit('fuck', 'suck!')
        })
    }
};