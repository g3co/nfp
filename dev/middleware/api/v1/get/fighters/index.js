var mapFightersNearby = require('./mapFightersNearby'),
    mapFightersList = require('./mapFightersList');

module.exports = function(Fighters, io, req, res) {

    var input = io.read(req),
        session = input.session,
        query = input.query;

    if(!!session == false) {
        return io.write(res, null, { result: 4 })
    }

    var id = session.user;

    if(!!id == false) {
        return io.write(res, null, { result: 4 })
    }

    var limit = 10,
        page = !!query.page || 0,
        place = query.geo;

    if(!!place) {

        var findByQuery = {
            lastGeo: {
                $near: place,
                $maxDistance: 0.6
            },
            _id: {
                $ne: id
            }
        };

        return Fighters
            .find(findByQuery)
            .skip(limit*page)
            .limit(limit)
            .sort({
                firstName: 1
            })
            .select({
                _id: 1,
                avatar: 1,
                lastGeo: 1
            })
            .exec(function(err, fighters) {
                console.error('Fighters/Nearby (GET) Error:', err);

                if(!!err) {
                    return io.write(res, null, { result: 1 })
                }

                if(!!fighters == false) {
                    return io.write(res, null, { result: 1 })
                }

                return io.write(res, fighters.map(mapFightersNearby))
            });
    }

    return Fighters
        .find({})
        .where('firstName', query.firstName)
        //.where('lastName', query.lastName)
        .skip(limit*page)
        .limit(limit)
        .sort({
            firstName: 1
        })
        .select({
            _id: 1,
            firstName: 1,
            lastName: 1,
            avatar: 1
        })
        .exec(function(err, fighters) {
            console.error('Fighters/List (GET) Error:', err);

            if(!!err) {
                return io.write(res, null, { result: 1 })
            }

            if(!!fighters == false) {
                return io.write(res, null, { result: 1 })
            }

            return io.write(res, fighters.map(mapFightersList))
        });
};