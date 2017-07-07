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

    if(!!query == false) {
        return io.write(res, null, { result: 2 })
    }

    var lastGeo = query.lastGeo;

    if(!!lastGeo) {
        return Fighters
            .update({ _id: id }, {$set: {
                lastGeo: lastGeo
            }}, function(err, user) {

                if(!!err) {
                    return io.write(res, null, { result: 1 })
                }

                if(!!user == false) {
                    return io.write(res, null, { result: 1 })
                }

                return io.write(res, 'Success', { result: 202 })
            })
    }
    return io.write(res, null, { result: 6 })

};