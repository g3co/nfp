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
        page = !!query.page || 0,
        place = query.geo;

    if(!!place == false) {
        return io.write(res, null, { result: 1 })
    }

    var googlePlace = [place[1], place[0]];//reverse Array, google specified

    return syncPlaces(
        lang,
        googlePlace,
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
                        $maxDistance: 0.6
                    }
                })
                .exec(function(err, places) {

                    console.log('Error:', err);

                    if(!!err) {
                        return io.write(res, null, { result: 1 })
                    }

                    if(!!places == false) {
                        return io.write(res, null, { result: 1 })
                    }

                    return io.write(res, places.map(function(p, i) {
                        return {
                            id: p._id,
                            location: p.place
                        }
                    }))

                })
        })
        .catch(function(err) {
            console.log('Sync Error:', err);
            return io.write(res, new Error('Synchronization rejected'))
        });

    function syncPlaces(lang, googlePlace, place) {

        var schoolTypes = {
            ru: {
                armyDogFight: ['армейский', 'рукопашный'],
                brazilianJiuJitsu: ['бразильское', 'джиу-джитсу'],
                combatSambo: ['самбо', 'спортивное'],
                boxing: ['бокс', 'спортивный'],
                wrestling: ['борьба', 'спортивная'],
                grappling: ['грэпплинг', 'спортивная-борьба'],
                kickboxing: ['кик-боксинг', 'школа'],
                mma: ['смешанные', 'единоборства'],
                muayThai: ['тайский', 'тайский-бокс']
            },
            en: {
                armyDogFight: ['army', 'fighting'],
                brazilianJiuJitsu: ['brazilian', 'jiu-jitsu'],
                combatSambo: ['sambo', 'combat'],
                boxing: ['boxing', 'club'],
                wrestling: ['wrestling', 'freestyle'],
                grappling: ['grappling', 'takedown'],
                kickboxing: ['kickboxing', 'martial'],
                mma: ['mma', 'mixed'],
                muayThai: ['thai', 'boxing']
            }
        };

        return new Promise(function(resolve, reject) {

            MapSynchronization
                .findOne({
                    place: {
                        $near: place,
                        $maxDistance: 0.6
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
                        return synchronizeFromGooglePlaces(Places, io, res, schoolTypes[lang], googlePlace)
                            .then(function() {
                                return resolve(true)
                            })
                    }

                    return resolve(false)
                });

        })
    }
};

