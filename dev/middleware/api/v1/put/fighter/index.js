module.exports = function(Places, Fighters, io, req, res) {

    var input = io.read(req),
        id = input.params.id,
        body = input.query,
        allowedFields = [ 'conditions', 'gym', 'skills', 'subscribeTo' ],
        mapFields = {
            conditions: 'conditions',
            gym: 'trainingAt',
            skills: 'skills',
            subscribeTo: 'friends'
        };

    if(!!id == false) {
        return io.write(res, null, { result: 4 })
    }

    if(!!body == false) {
        return io.write(res, null, { result: 2 })
    }

    if(!!body.gym) {
        var placeId = body.gym;

        return Places
            .findById(placeId, function(err, place) {

                if(!!err) {
                    return io.write(res, null, { result: 6 })
                }

                if(!!place == false) {
                    return io.write(res, null, { result: 1 })
                }

                body.gym = place._id;

                return update(body, id)

            })
    }

    if(!!body.subscribeTo) {
        var friendId = body.subscribeTo;

        return Fighters
            .findById(friendId, function(err, friend) {

                if(!!err) {
                    return io.write(res, null, { result: 6 })
                }

                if(!!friend == false) {
                    return io.write(res, null, { result: 1 })
                }

                body.subscribeTo = [friend._id];

                return update(body, id)

            })
    }

    return update(body, id);

    function update(body, id) {
        if(!!body && !!Object.keys(body).length) {

            var $set = {
                    updatedAt: (new Date()).toISOString()
                },
                $push = {},
                writable = function(key) {
                    return !!allowedFields.find(function(item) {
                        return item.match(new RegExp('^'+ key +'$', 'i'))
                    })
                };

            for(var key in body) {
                if(!!key && body.hasOwnProperty(key) && writable(key)) {
                    var mappedKey = mapFields[key],
                        value = body[key];

                    if(!!value && !!value.length) {
                        $push[mappedKey] = value.shift();
                    } else {
                        $set[mappedKey] = value;
                    }
                }
            }

            return Fighters
                .findOneAndUpdate(
                    { _id: id },
                    { $set: $set },
                    { upsert: true },
                    function(err, fighter) {

                        if(!!err) {
                            return io.write(res, null, { result: 1 })
                        }

                        fighter = !!fighter == false ? new Fighters({ $set: $set }) : fighter;

                        return Fighters
                            .populate(
                                fighter,
                                [
                                    { path: 'friends', model: 'Fighters' }
                                ],
                                function(err, fighter) {

                                    if(!!err) {
                                        return io.write(res, null, { result: 1 })
                                    }

                                    if(!subscribeTo.call(fighter.friends, $push.friends)) {
                                        fighter.friends.push($push.friends)
                                    }

                                    fighter.save(function(err) {

                                        if(!!err) {
                                            return io.write(res, null, { result: 1 })
                                        }

                                        return io.write(res, 'Success', { result: 201 })
                                    });
                                })
                })
        }

        return io.write(res, null, { result: 6 })
    }

};

function subscribeTo(friend) {

    var friends = this || [];

    return friends.find(function(f) {
        return !!JSON.stringify(f).match(new RegExp(friend, 'i'))
    })
}