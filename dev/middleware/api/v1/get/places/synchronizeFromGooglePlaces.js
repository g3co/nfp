var querystring  = require('querystring'),
    Deferred = require('./Deferred'),
    Credentials = require('../../../../Credentials'),
    createPlace = require('../../post/place'),
    mapPlaceGoogle2NFP = require('./mapPlaceGoogle2NFP');

function getPlacesPath(position, distance, type, schoolType, schoolName) {
    return [
        'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
        querystring.stringify({
            location: position.toString(),
            rankby: distance,
            //radius: radius,
            type: type,
            keyword: schoolType,
            name: schoolName,
            //language: lang,
            key: Credentials.google.APIKey
        })
    ].join('?')
}

function getPlacePath(place_id) {
    return [
        'https://maps.googleapis.com/maps/api/place/details/json',
        querystring.stringify({
            placeid: place_id,
            key: Credentials.google.APIKey
        })
    ].join('?')
}

function synchronizeFromGooglePlaces(Places, io, res, schoolTypes, place) {

    var dfr = new Deferred(),
        placesNearby = [],
        placesToSync = [];

    for(var s in schoolTypes) {
        var _schoolType = schoolTypes[s];
        (function(placesNearby, placesToSync, schoolKey, school) {

            var uri = getPlacesPath(
                place,
                'distance',//catch whole City
                'gym',
                school[1],
                school[0]
            );

            console.log('Request to:\r\n\t'+ uri);
            
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

                        console.log('Status: '+ res.status);

                        console.log('Res count: for '+school[0] +' is:'+ res.results.length);

                        if(!!res == false) {
                            return {}
                        }

                        res = !!res.length ? JSON.parse(res) : res;
                        res = !!res.results ? res.results : [];

                        res.forEach(function(o, i) {

                            var place_id = o.place_id,
                                schoolType = [];

                            //console.log('GYM: for'+school +' name:'+ o.name);

                            console.log('ID: '+ place_id);

                            var place = placesToSync.find(function(place) {
                                return place.place_id == place_id
                            });

                            if(!place) {
                                schoolType.push(schoolKey);

                                return placesToSync.push({
                                    place_id: place_id,
                                    schoolType: schoolType
                                })
                            }

                            return place.schoolType.push(schoolKey)
                        });

                        return res
                    })
            )
        })(placesNearby, placesToSync, s, _schoolType);
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

                        console.log('Place: '+ place.name +', for: ['+ place.schoolType +']');

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