module.exports = function(Fighters, io, req, res) {

    req.logout();

    io.write(res, null);

};