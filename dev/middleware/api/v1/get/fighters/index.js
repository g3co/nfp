module.exports = function(Fighters, io, req, res) {
    return io.write(res, { result: 'Fighters from IO' })
};