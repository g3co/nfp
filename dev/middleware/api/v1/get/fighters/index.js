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
        page = !!query.page || 0;

    if(!!Object.keys(query).length == false) {

        return Fighters
            .findOne({ _id: id })
            .exec(function (err, user) {
                if(!!err) {
                    return io.write(res, null, { result: 4 })
                }

                if(!!user == false) {
                    return io.write(res, null, { result: 1 })
                }

                var findByQuery = {
                    $and: [
                        {lastGeo: {
                            $near: user.lastGeo,
                            $maxDistance: 500
                        },
                        _id: {
                            $ne: id
                        }}
                    ]
                };

                Fighters
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
                    .exec(showFighters);
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
        .exec(showFighters);

    function showFighters(err, fighters) {

        console.error('Fighters (GET) Error:', err);

        if(!!err) {
            return io.write(res, null, { result: 1 })
        }

        if(!!fighters == false) {
            return io.write(res, null, { result: 1 })
        }

        return io.write(res, fighters)
    }
};