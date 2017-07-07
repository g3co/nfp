var Deferred = require('./Deferred'),
    Credentials = require('../../../../Credentials'),
    createPlace = require('../../post/place'),
    mapPlaceGoogle2NFP = require('./mapPlaceGoogle2NFP');

function getPlacesPath(position, radius, type, schoolType) {
    return [
        'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
        '?location='+ position,
        '&radius='+radius,
        '&type='+ type,
        '&keyword='+ schoolType,
        '&key='+ Credentials.google.APIKey
    ].join('')
}

function getPlacePath(place_id) {
    return [
        'https://maps.googleapis.com/maps/api/place/details/json',
        '?placeid='+ place_id,
        '&key='+ Credentials.google.APIKey
    ].join('')
}

function synchronizeFromGooglePlaces(Places, io, res, schoolTypes, place) {

    var dfr = new Deferred(),
        placesNearby = [],
        placesToSync = [];

    for(var s in schoolTypes) {
        var _schoolType = schoolTypes[s];
        (function(placesNearby, placesToSync, schoolKey, uri) {

            console.log('school:', schoolKey);

            placesNearby.push(
                dfr.req({
                    uri: uri,
                    method: 'GET',
                    timeout: 10000,
                    followRedirect: true,
                    maxRedirects: 10,
                    json: true
                })
                    .then(function(res) {

                        if(!!res == false) {
                            return {}
                        }

                        res = !!res.length ? JSON.parse(res) : res;
                        res = !!res.results ? res.results : [];

                        res.forEach(function(o, i) {

                            var place_id = o.place_id;

                            placesToSync.push({
                                place_id: place_id,
                                schoolType: schoolKey
                            })
                        });

                        return res
                    })
            )
        })(placesNearby, placesToSync, s, getPlacesPath(
            place,
            5000,//catch whole City
            'gym',
            _schoolType
        ));
    }

    return dfr.when.apply(null, placesNearby)
        .then(function() {
            return dfr.when.apply(null, placesToSync.map(function(o, i) {

                var $place_id = o.place_id,
                    $schoolType = o.schoolType;

                return dfr.req({
                    uri: getPlacePath(o.place_id),
                    method: 'GET',
                    timeout: 10000,
                    followRedirect: true,
                    maxRedirects: 10,
                    json: true
                })
                    .then(function(place) {
                        if(!!place == false) {
                            return {}
                        }

                        place = !!place.length ? JSON.parse(place) : place;
                        place = !!place.result ? place.result : {};

                        place = mapPlaceGoogle2NFP(place, $place_id, $schoolType);

                        if(!!place) {
                            createPlace(Places, io, { env: 1, params: place }, res)
                        }

                        return place
                    })

            }))
                .then(function (res) {
                    return res
                })
                .catch(function(err) {
                    console.log('Error sync:', err);
                })
        })
}

module.exports = synchronizeFromGooglePlaces;