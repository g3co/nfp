var synchronizeFromGooglePlaces = require('./synchronizeFromGooglePlaces');

module.exports = function(MapSynchronization, Fighters, Places, io, req, res) {

    var input = io.read(req),
        session = input.session,
        query = input.query;

    if (!!session == false) {
        return io.write(res, null, {result: 4})
    }

    var id = session.user;

    if(!!id == false) {
        return io.write(res, null, { result: 4 })
    }

    var lang = query.lng || 'ru',
        limit = 10,
        page = !!query.page || 0;

    if(!!Object.keys(query).length == false) {
        return Fighters
            .findOne({ _id: id })
            .select({
                lastGeo: 1
            })
            .exec(function (err, user) {

                var place = [user.lastGeo[1], user.lastGeo[0]];//reverse Array, google specified

                console.log('Places (GET) Error:', err);

                if (!!err) {
                    return io.write(res, null, {result: 1})
                }

                if (!!user == false) {
                    return io.write(res, null, {result: 1})
                }

                syncPlaces(
                    lang,
                    place
                )
                    .then(function(sync) {

                        if(sync) {
                            MapSynchronization
                                .create({
                                    place: place,
                                    expiredAt: new Date((new Date()).getTime() + 60*60*24*7*1000).toISOString()
                                })
                        }

                        Places
                            .find({
                                place: {
                                    $near: place,
                                    $maxDistance: 500
                                }
                            })
                            .exec(function(err, places) {

                                if(!!err) {
                                    return io.write(res, null, { result: 1 })
                                }

                                if(!!places == false) {
                                    return io.write(res, null, { result: 1 })
                                }

                                return io.write(res, places.map(function(p, i) {
                                    return {
                                        _id: p._id,
                                        location: p.place
                                    }
                                }))

                            })
                    })
                    .catch(function(err) {
                        console.log('Sync Error:', err);
                        return io.write(res, new Error('Synchronization rejected'))
                    })
            });
    }

    return io.write(res, []);

    function syncPlaces(lang, place) {

        var schoolTypes = {
            ru: {
                armyDogFight: 'арб',
                brazilianJiuJitsu: 'бжж',
                combatSambo: 'самбо',
                boxing: 'бокс',
                wrestling: 'борьба',
                grappling: 'грэпплинг',
                kickboxing: 'кик',
                mma: 'мма',
                muayThai: 'тай'
            },
            en: {
                armyDogFight: 'army',
                brazilianJiuJitsu: 'jiujitsu',
                combatSambo: 'sambo',
                boxing: 'boxing',
                wrestling: 'wrestling',
                grappling: 'grappling',
                kickboxing: 'kickboxing',
                mma: 'mma',
                muayThai: 'thai'
            }
        };

        return new Promise(function(resolve, reject) {

            MapSynchronization
                .findOne({
                    place: {
                        $near: place,
                        $maxDistance: 1000
                    },
                    expiredAt: {
                        $gt: (new Date()).toISOString()
                    }
                })
                .exec(function(err, syncKey) {
                    if(!!err) {
                        reject(new Error(err));
                        return io.write(res, null, { result: 1 })
                    }

                    if(!!syncKey == false) {
                        return synchronizeFromGooglePlaces(Places, io, res, schoolTypes[lang], place)
                            .then(function() {
                                resolve(true)
                            })
                    }

                    return resolve(false)
                });

        })
    }
};

