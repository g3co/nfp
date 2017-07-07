var mapFighter = require('./mapFighter');

module.exports = function(Fighters, io, req, res) {

    var input = io.read(req),
        id = input.query.id;

    Fighters
        .findById(id, function(err, fighter) {

        console.error('Fighter (GET) Error:', err);

        if(!!err) {
            return io.write(0, { result: 0 })
        }

        return fighter.banned ? 
            io.write(res, null, { result: 7 }) :
            io.write(res, mapFighter(fighter));
    });
};