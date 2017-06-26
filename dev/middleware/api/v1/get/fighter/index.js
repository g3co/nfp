module.exports = function(Fighters, io, req, res) {

    var input = io.read(req),
        id = input.query.id;

    Fighters.findById(id, function(err, fighter) {
        if(!!err) {
            return io.write(0, { result: 0 })
        }

        return io.write(res, fighter);
    });
};