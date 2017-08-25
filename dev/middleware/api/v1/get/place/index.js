var mapPlace = require('./mapPlace');

module.exports = function(io, req, res, Places) {

    var input = io.read(req),
        id = input.params.id;

    Places
        .findById(id, function(err, place) {

        console.error('Place (GET) Error:', err);

        if(!!err) {
            return io.write(0, { result: 0 })
        }

        return place.unavailable ?
            io.write(res, null, { result: 7 }) :
            io.write(res, mapPlace(place));
    });
};