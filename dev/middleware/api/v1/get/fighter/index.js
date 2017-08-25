var mapFighter = require('./mapFighter');

module.exports = function(io, req, res, Fighters) {

    var input = io.read(req),
        id = input.params.id;

    Fighters
        .findOne({ _id: id })
        .populate([
            { path: 'trainingAt' },
            { path: 'friends', model: 'Fighters' }
        ])
        .exec(function(err, fighter) {

            console.error('Fighter (GET) Error:', err);

            if(!!err) {
                return io.write(res, null, { result: 0 })
            }

            if(!!fighter == false) {
                return io.write(res, null, { result: 1 })
            }

            if(fighter.banned) {
                return io.write(res, null, { result: 7 })
            }

            return io.write(res, mapFighter(fighter))
        });
};