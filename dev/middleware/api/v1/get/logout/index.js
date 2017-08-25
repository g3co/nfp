module.exports = function(io, req, res, Fighters) {

    req.logout();

    io.write(res, null);

};