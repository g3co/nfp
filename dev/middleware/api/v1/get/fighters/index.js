module.exports = function(Fighters, io, req, res) {

    var input = io.read(req),
        session = input.session,
        query = input.query;

    console.log('Query:', query);

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
            .limit(1)
            .exec(function (err, user) {
                if(!!err) {
                    return io.write(res, null, { result: 4 })
                }

                if(!!user == false) {
                    return io.write(res, null, { result: 1 })
                }

                var findByQuery = {
                    lastGeo: {
                        $near: user.lastGeo,
                        $maxDistance: 5
                    }
                };

                Fighters
                    .find(findByQuery)
                    .skip(limit*page)
                    .limit(limit)
                    .sort({
                        firstName: 1
                    })
                    .select({
                        firstName: 1,
                        lastName: 1,
                        avatar: 1
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

    function showFighters(err, result) {

        if(!!err) {
            return io.write(res, null, { result: 4 })
        }

        if(!!result == false) {
            return io.write(res, null, { result: 1 })
        }

        return io.write(res, result)
    }
};