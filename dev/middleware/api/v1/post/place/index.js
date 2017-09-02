var crypto = require('crypto');

module.exports = function(io, req, res, Places) {

    if(!!req.env == false) {
        var input = io.read(req),
            session = input.session,
            query = input.query,
            serviceID = crypto.createHash('md5').update(new Date().toISOString()).digest('hex');

        if (!!session == false) {
            return io.write(res, null, { result: 4 })
        }

        if(!!query == false || !!query.jsonRequest == false) {
            return io.write(res, null, { result: 6 })
        }
    }

    query = req.params;

    query = !!query.jsonRequest ? JSON.parse(query.jsonRequest) : query;

    query.serviceID = !!query.serviceID ? query.serviceID : serviceID;

    if(Object.keys(query).length < 9) {
        return io.write(res, null, { result: 6 })
    }

    Places
        .findOneAndUpdate(
            {place: {
                $near: query.place,
                $maxDistance: 0.001
            }},
            query,
            { upsert: true },
            function(err, place) {
                if(!!err) {
                    //prevent Output for the client if requested by env
                    return !!req.env ? err : io.write(res, null, { result: 1 })
                }

                place = !!place == false ? new Places(query) : place;

                place.save(function(err) {
                    if(!!req.env) {
                        return err
                    }

                    if(!!err) {
                        return io.write(res, null, { result: 1 })
                    }

                    return io.write(res, 'Success', { result: 201 })
                });
        });
};